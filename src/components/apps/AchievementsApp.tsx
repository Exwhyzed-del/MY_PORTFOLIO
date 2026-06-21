'use client';

import { motion } from 'framer-motion';
import { Trophy, Code, Flame, Award } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'Hackathon Winner',
    description: 'Tech Ninjas - IntrusionX Hackathon',
    rarity: 'Legendary',
    icon: Trophy,
    color: 'text-yellow-400',
  },
  {
    id: 2,
    title: 'Agile Certified',
    description: 'Completed Agile Methodology Certification',
    rarity: 'Epic',
    icon: Award,
    color: 'text-accent',
  },
  {
    id: 3,
    title: 'DSA Pro',
    description: 'Solved 300+ problems on LeetCode',
    rarity: 'Epic',
    icon: Code,
    color: 'text-accent',
  },
  {
    id: 4,
    title: 'Coding Streak',
    description: '114-day coding streak on LeetCode',
    rarity: 'Rare',
    icon: Flame,
    color: 'text-secondary',
  },
  {
    id: 5,
    title: '50-Day Streak x2',
    description: 'Two 50-day coding streaks on LeetCode',
    rarity: 'Epic',
    icon: Flame,
    color: 'text-accent',
  },
  {
    id: 6,
    title: '100-Day Streak',
    description: '100-day coding streak on LeetCode',
    rarity: 'Legendary',
    icon: Flame,
    color: 'text-yellow-400',
  },
];

const AchievementsApp = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achievements.map((ach, i) => (
          <motion.div
            key={ach.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-xl text-center"
          >
            <ach.icon className={`w-16 h-16 mx-auto mb-3 ${ach.color}`} />
            <h3 className="font-bold text-lg mb-1">{ach.title}</h3>
            <p className="text-xs text-gray-300 mb-3">{ach.description}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${
              ach.rarity === 'Legendary' ? 'bg-yellow-400/20 text-yellow-400' :
              ach.rarity === 'Epic' ? 'bg-purple-500/20 text-accent' :
              ach.rarity === 'Rare' ? 'bg-blue-400/20 text-secondary' :
              'bg-green-400/20 text-primary'
            }`}>
              {ach.rarity}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsApp;
