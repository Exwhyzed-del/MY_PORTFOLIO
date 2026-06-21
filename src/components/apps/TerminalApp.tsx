'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HistoryItem {
  type: 'command' | 'output' | 'welcome';
  content: string;
}

const fileSystem: any = {
  'home/aryan': {
    type: 'dir',
    contents: {
      'about.txt': 'Name: Aryan Kumar Sharma\nRole: Software Developer',
      'skills.json': JSON.stringify({
        frontend: ['React', 'Next.js', 'Tailwind CSS'],
        backend: ['Node.js', 'Python'],
        dsa: ['Arrays', 'Strings', 'Hashing'],
        cybersecurity: ['Penetration Testing', 'Network Security']
      }, null, 2),
      'resume.txt': 'Aryan Kumar Sharma - Resume...',
      'projects': {
        type: 'dir',
        contents: {
          'project1.txt': 'Anonymous College Doubt Forum'
        }
      }
    }
  }
};

const TerminalApp = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'welcome', content: 'Welcome to AryanOS Terminal' },
    { type: 'welcome', content: 'Type "help" for available commands' }
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('/home/aryan');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const commands: any = {
    help: () => [
      'Available commands:',
      'help - Show this help message',
      'clear - Clear the terminal',
      'pwd - Print working directory',
      'ls - List directory contents',
      'whoami - Display current user',
      'date - Show current date',
      'time - Show current time',
      'about - About me',
      'skills - List skills',
      'projects - List projects',
      'resume - Show resume',
      'contact - Contact info',
      'social - Social links',
      'achievements - Achievements',
      'cd [dir] - Change directory',
      'cat [file] - Display file contents',
      'matrix - Enter matrix mode',
      'hack - Initiate hack sequence',
      'joke - Tell a programming joke',
      'coffee - Get a motivational quote'
    ],
    clear: () => {
      setHistory([]);
      return [];
    },
    pwd: () => [currentPath],
    whoami: () => ['aryan'],
    date: () => [new Date().toLocaleDateString()],
    time: () => [new Date().toLocaleTimeString()],
    about: () => [
      'Name: Aryan Kumar Sharma',
      'Role: Software Developer, DSA Enthusiast, Tech Explorer',
      'Developer focused on building scalable applications and solving complex problems.',
      'Strong foundation in Data Structures, Algorithms, software development, and emerging technologies.',
      'Always learning, building, and improving.'
    ],
    skills: () => [
      'Languages: C++, Java, Python, JavaScript',
      'Frontend: React, Next.js, TypeScript, Tailwind CSS',
      'Backend: Node.js, APIs, Databases',
      'Tools: Git, GitHub, Linux, Docker, Jenkins'
    ],
    projects: () => [
      '1. CodeArena - Live coding battle platform',
      '   Create rooms and battle with friends!',
      '   Features practice questions and real-time leaderboards',
      '   Live: https://codearena-uc8l.onrender.com/',
      '',
      '2. DEEPSEEK-AI - Real-time AI media & news verification',
      '   Detects AI-generated images, deepfake audio, fake news',
      '   Features floating screenshot button for instant verification',
      '   GitHub: https://github.com/Exwhyzed-del/DEEPSEEK-AI-',
      '',
      '3. EXWHYZED-TyperPro - Smart auto-typer that types anything you paste',
      '   Works across multiple devices via AnyDesk, TeamViewer, etc.',
      '   GitHub: https://github.com/Exwhyzed-del/EXWHYZED_TYPER'
    ],
    resume: () => ['Opening Resume... (PDF viewer integration coming soon)'],
    contact: () => ['Email: sharmaaryankumar7@gmail.com', 'Phone: +91 7903721185'],
    social: () => ['GitHub: https://github.com/Exwhyzed-del', 'LinkedIn: https://www.linkedin.com/in/aryan-kumar-sharma-791a31397/', 'LeetCode: https://leetcode.com/u/XxDTkpGrnk/'],
    achievements: () => [
      '🏆 Hackathon Winner - Tech Ninjas (IntrusionX Hackathon)',
      '💻 Solved 300+ DSA problems on LeetCode',
      '🔥 114-day coding streak on LeetCode',
      '🔥 Two 50-day coding streaks on LeetCode',
      '🔥 100-day coding streak on LeetCode'
    ],
    ls: () => {
      const path = currentPath.slice(1);
      let dir: any = fileSystem;
      for (const part of path.split('/')) {
        if (part && dir[part]) {
          dir = dir[part].contents || dir[part];
        }
      }
      return Object.keys(dir);
    },
    matrix: () => ['Matrix mode activated! Press ESC to exit'],
    hack: () => ['Accessing mainframe...', 'Bypassing firewall...', 'Decrypting portfolio...', 'ACCESS GRANTED'],
    joke: () => ['Why do programmers prefer dark mode? Because light attracts bugs!'],
    coffee: () => ['Keep coding, coffee is on the way! ☕']
  };

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(' ');
    let output: HistoryItem[] = [];

    if (commands[command]) {
      output = commands[command](args).map((content: string) => ({ type: 'output', content }));
    } else if (command === 'cd') {
      output = [{ type: 'output', content: 'cd command not fully implemented yet' }];
    } else if (command === 'cat') {
      output = [{ type: 'output', content: 'cat command not fully implemented yet' }];
    } else {
      output = [{ type: 'output', content: `Command not found: ${command}. Type "help" for available commands.` }];
    }

    setHistory(prev => [
      ...prev,
      { type: 'command', content: `aryan@portfolio:${currentPath}$ ${cmd}` },
      ...output
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        handleCommand(input);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
    inputRef.current?.focus();
  }, [history]);

  return (
    <div className="h-full bg-[#050505] text-primary p-4 font-mono text-sm flex flex-col">
      <div ref={historyRef} className="flex-1 overflow-auto">
        {history.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-1 ${
              item.type === 'command' ? 'text-accent font-bold' :
              item.type === 'welcome' ? 'text-secondary' :
              'text-primary'
            }`}
          >
            {item.content}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-secondary">aryan@portfolio:{currentPath}$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none text-accent font-bold"
          autoFocus
        />
      </div>
    </div>
  );
};

export default TerminalApp;
