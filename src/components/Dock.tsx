'use client';

import { useOSStore } from '@/store/useOSStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Settings,
  Terminal,
  Folder,
  User,
  Rocket,
  FileText,
  Trophy,
  Gamepad2,
  Globe,
} from 'lucide-react';

const dockItems = [
  { id: 'settings', icon: Settings, title: 'Settings' },
  { id: 'terminal', icon: Terminal, title: 'Terminal' },
  { id: 'file-explorer', icon: Folder, title: 'File Explorer' },
  { id: 'about', icon: User, title: 'About' },
  { id: 'projects', icon: Rocket, title: 'Projects' },
  { id: 'resume', icon: FileText, title: 'Resume' },
  { id: 'achievements', icon: Trophy, title: 'Achievements' },
  { id: 'snake-game', icon: Gamepad2, title: 'Snake Game' },
  { id: 'social', icon: Globe, title: 'Social Hub' },
];

const Dock = () => {
  const openWindow = useOSStore(state => state.openWindow);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-40">
      {dockItems.map((item, index) => (
        <div key={item.id} className="relative">
          <motion.div
            whileHover={{ scale: 1.1, x: 8 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openWindow({
              id: item.id,
              title: item.title,
              icon: '',
              isOpen: true,
              x: 200 + index * 20,
              y: 100 + index * 20,
              width: 700,
              height: 500
            })}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className="glass p-3 rounded-xl cursor-pointer hover:border-primary/50 transition-all"
          >
            <item.icon className="w-6 h-6 text-primary" />
          </motion.div>
          <AnimatePresence>
            {hoveredItem === item.id && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 glass px-3 py-1.5 rounded-md whitespace-nowrap border border-primary/30"
              >
                <span className="text-primary font-bold text-sm">{item.title}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Dock;
