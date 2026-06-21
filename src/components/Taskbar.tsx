'use client';

import { useOSStore } from '@/store/useOSStore';
import { motion } from 'framer-motion';
import { Settings, Terminal, Folder, User, Rocket, FileText, Trophy, Gamepad2, Globe } from 'lucide-react';

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

const Taskbar = () => {
  const { windows, restoreWindow } = useOSStore(state => state);
  const minimizedWindows = windows.filter(w => w.isOpen && w.isMinimized);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-2 py-2 z-40">
      {minimizedWindows.map((window, i) => {
        const IconComponent = iconMap[window.id];
        return (
          <motion.button
            key={window.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => restoreWindow(window.id)}
            className="w-12 h-12 rounded-xl glass border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-all"
          >
            {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Taskbar;
