import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useState, useEffect } from "react";

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  prevX?: number;
  prevY?: number;
  prevWidth?: number;
  prevHeight?: number;
}

interface OSState {
  bootSequenceComplete: boolean;
  setBootSequenceComplete: (complete: boolean) => void;
  windows: WindowState[];
  openWindow: (window: Omit<WindowState, "isMinimized" | "isMaximized" | "zIndex">) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number, width: number, height: number) => void;
  activeWindowId: string | null;
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
}

const initialWindows: WindowState[] = [
  { id: "settings", title: "Settings", icon: "⚙", isOpen: false, isMinimized: false, isMaximized: false, x: 100, y: 100, width: 700, height: 500, zIndex: 10 },
  { id: "terminal", title: "Terminal", icon: "💻", isOpen: false, isMinimized: false, isMaximized: false, x: 150, y: 150, width: 800, height: 500, zIndex: 11 },
  { id: "file-explorer", title: "File Explorer", icon: "📁", isOpen: false, isMinimized: false, isMaximized: false, x: 200, y: 100, width: 700, height: 500, zIndex: 12 },
  { id: "about", title: "About", icon: "👨", isOpen: false, isMinimized: false, isMaximized: false, x: 250, y: 150, width: 600, height: 500, zIndex: 13 },
  { id: "projects", title: "Projects", icon: "🚀", isOpen: false, isMinimized: false, isMaximized: false, x: 300, y: 100, width: 800, height: 600, zIndex: 14 },
  { id: "resume", title: "Resume", icon: "📄", isOpen: false, isMinimized: false, isMaximized: false, x: 350, y: 150, width: 700, height: 600, zIndex: 15 },
  { id: "achievements", title: "Achievements", icon: "🏆", isOpen: false, isMinimized: false, isMaximized: false, x: 400, y: 100, width: 700, height: 600, zIndex: 16 },
  { id: "snake-game", title: "Snake Game", icon: "🐍", isOpen: false, isMinimized: false, isMaximized: false, x: 450, y: 150, width: 600, height: 680, zIndex: 17 },
  { id: "tic-tac-toe", title: "Tic Tac Toe", icon: "⭕", isOpen: false, isMinimized: false, isMaximized: false, x: 500, y: 100, width: 600, height: 600, zIndex: 18 },
  { id: "social", title: "Social Hub", icon: "🌐", isOpen: false, isMinimized: false, isMaximized: false, x: 550, y: 150, width: 700, height: 500, zIndex: 19 },
];

let zIndexCounter = 20;
const defaultWallpaper = "/wallpapers/car.jpg";

export const useOSStore = create<OSState>()(
  persist(
    (set, get) => ({
      bootSequenceComplete: false,
      setBootSequenceComplete: (complete) => set({ bootSequenceComplete: complete }),
      windows: initialWindows,
      activeWindowId: null,
      wallpaper: defaultWallpaper,
      setWallpaper: (wallpaper) => set({ wallpaper }),
      openWindow: (window) => set((state) => {
        const existingWindow = state.windows.find(w => w.id === window.id);
        if (existingWindow) {
          return {
            windows: state.windows.map(w => 
              w.id === window.id 
                ? { ...w, isOpen: true, isMinimized: false, zIndex: ++zIndexCounter } 
                : w
            ),
            activeWindowId: window.id
          };
        }
        return {
          windows: [...state.windows, { ...window, isOpen: true, isMinimized: false, isMaximized: false, zIndex: ++zIndexCounter }],
          activeWindowId: window.id
        };
      }),
      closeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isOpen: false } : w),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
      })),
      minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w)
      })),
      maximizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => {
          if (w.id === id) {
            if (!w.isMaximized) {
              return {
                ...w,
                isMaximized: true,
                prevX: w.x,
                prevY: w.y,
                prevWidth: w.width,
                prevHeight: w.height
              };
            } else {
              return {
                ...w,
                isMaximized: false,
                x: w.prevX || 100,
                y: w.prevY || 100,
                width: w.prevWidth || 800,
                height: w.prevHeight || 600
              };
            }
          }
          return w;
        })
      })),
      focusWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, zIndex: ++zIndexCounter } : w),
        activeWindowId: id
      })),
      restoreWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: ++zIndexCounter } : w),
        activeWindowId: id
      })),
      updateWindowPosition: (id, x, y, width, height) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, x, y, width, height } : w)
      })),
    }),
    {
      name: 'aryan-os-storage',
      partialize: (state) => ({ wallpaper: state.wallpaper }),
      migrate: (persistedState: unknown, version: number) => {
        // List of valid wallpapers
        const validWallpapers = [
          '/wallpapers/blackhole.jpg',
          '/wallpapers/car.jpg',
          '/wallpapers/ghost.jpg',
          '/wallpapers/miles-swinging-through-queen-lights-ka-1920x1080.jpg',
          '/wallpapers/shrine.png',
          '/wallpapers/scenery.png',
        ];
        
        const state = persistedState as { wallpaper?: string };
        if (
          state && 
          (!state.wallpaper || !validWallpapers.includes(state.wallpaper))
        ) {
          return { ...state, wallpaper: defaultWallpaper };
        }
        return state;
      },
    }
  )
);

export const useHasHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useOSStore.persist.onFinishHydration(() => setHydrated(true));
    if (useOSStore.persist.hasHydrated()) setHydrated(true);
    return unsubscribe;
  }, []);

  return hydrated;
};
