'use client';

import { useOSStore, useHasHydrated } from '@/store/useOSStore';
import Dock from './Dock';
import Window from './Window';
import Widgets from './Widgets';
import Taskbar from './Taskbar';

const Desktop = () => {
  const { windows, wallpaper } = useOSStore(state => state);
  const hasHydrated = useHasHydrated();
  const isAnyWindowMaximized = windows.some(w => w.isOpen && w.isMaximized && !w.isMinimized);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={
        hasHydrated
          ? {
              backgroundImage: `url(${wallpaper || '/wallpapers/car.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }
          : { backgroundColor: '#050505' }
      }
    >
      <div className="absolute inset-0 bg-black/40" />
      {!isAnyWindowMaximized && <Widgets />}
      {!isAnyWindowMaximized && <Dock />}
      {windows
        .filter(w => w.isOpen)
        .map(window => (
          <Window key={window.id} window={window} />
        ))}
      {!isAnyWindowMaximized && <Taskbar />}
    </div>
  );
};

export default Desktop;
