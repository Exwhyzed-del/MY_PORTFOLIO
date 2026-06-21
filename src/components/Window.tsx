'use client';

import { useOSStore, WindowState } from '@/store/useOSStore';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Settings, Terminal, Folder, User, Rocket, FileText, Trophy, Gamepad2, Globe } from 'lucide-react';
import TerminalApp from './apps/TerminalApp';
import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import SettingsApp from './apps/SettingsApp';
import FileExplorerApp from './apps/FileExplorerApp';
import ResumeApp from './apps/ResumeApp';
import AchievementsApp from './apps/AchievementsApp';
import SnakeGameApp from './apps/SnakeGameApp';
import SocialHubApp from './apps/SocialHubApp';

interface WindowProps {
  window: WindowState;
}

const iconMap: Record<string, any> = {
  'settings': Settings,
  'terminal': Terminal,
  'file-explorer': Folder,
  'about': User,
  'projects': Rocket,
  'resume': FileText,
  'achievements': Trophy,
  'snake-game': Gamepad2,
  'social': Globe
};

const Window = ({ window }: WindowProps) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, activeWindowId } = useOSStore(state => state);
  const IconComponent = iconMap[window.id];

  const renderApp = () => {
    switch (window.id) {
      case 'terminal':
        return <TerminalApp />;
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'settings':
        return <SettingsApp />;
      case 'file-explorer':
        return <FileExplorerApp />;
      case 'resume':
        return <ResumeApp />;
      case 'achievements':
        return <AchievementsApp />;
      case 'snake-game':
        return <SnakeGameApp />;
      case 'social':
        return <SocialHubApp />;
      default:
        return <div className="p-4">App not found</div>;
    }
  };

  if (window.isMinimized) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{ zIndex: window.zIndex }}
      >
        <Rnd
          bounds="parent"
          enableResizing={!window.isMaximized}
          dragAxis={window.isMaximized ? 'x' : 'both'}
          size={{
            width: window.isMaximized ? '100vw' : window.width,
            height: window.isMaximized ? '100vh' : window.height
          }}
          position={{
            x: window.isMaximized ? 0 : window.x,
            y: window.isMaximized ? 0 : window.y
          }}
          minWidth={400}
          minHeight={300}
          onDragStop={(_, d) => updateWindowPosition(window.id, d.x, d.y, window.width, window.height)}
          onResizeStop={(_, __, ref, ___, delta) => {
            updateWindowPosition(
              window.id,
              window.x,
              window.y,
              parseInt(ref.style.width),
              parseInt(ref.style.height)
            );
          }}
          onMouseDown={() => focusWindow(window.id)}
          className="glass rounded-xl overflow-hidden shadow-2xl"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 bg-[#111] border-b border-primary/20 cursor-grab"
            style={{ boxShadow: activeWindowId === window.id ? '0 0 20px rgba(0, 255, 136, 0.3)' : 'none' }}
          >
            <div className="flex gap-2">
              <button
                onClick={() => closeWindow(window.id)}
                className="w-5 h-5 rounded-full bg-danger hover:brightness-125 transition-all flex items-center justify-center"
              >
                <X className="w-3 h-3 text-[#050505]" />
              </button>
              <button
                onClick={() => minimizeWindow(window.id)}
                className="w-5 h-5 rounded-full bg-yellow-400 hover:brightness-125 transition-all flex items-center justify-center"
              >
                <Minus className="w-3 h-3 text-[#050505]" />
              </button>
              <button
                onClick={() => maximizeWindow(window.id)}
                className="w-5 h-5 rounded-full bg-primary hover:brightness-125 transition-all flex items-center justify-center"
              >
                <Square className="w-3 h-3 text-[#050505]" />
              </button>
            </div>
            <div className="flex-1 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
              {IconComponent && <IconComponent className="w-4 h-4 text-primary" />}
              {window.title}
            </div>
          </div>
          <div className="h-[calc(100%-44px)] overflow-auto">
            {renderApp()}
          </div>
        </Rnd>
      </motion.div>
    </AnimatePresence>
  );
};

export default Window;
