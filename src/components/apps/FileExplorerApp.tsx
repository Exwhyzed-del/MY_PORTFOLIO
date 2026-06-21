'use client';

import { useState } from 'react';
import { FileText, Folder, Award, ChevronLeft } from 'lucide-react';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: any;
  path?: string;
  content?: string;
  children?: FileItem[];
}

const rootFiles: FileItem[] = [
  { 
    name: 'about', 
    type: 'folder', 
    icon: Folder, 
    children: [
      { 
        name: 'info.txt', 
        type: 'file', 
        icon: FileText, 
        content: `Name: Aryan Kumar Sharma
Role: Software Developer, DSA Enthusiast, Tech Explorer
Developer focused on building scalable applications and solving complex problems.
Strong foundation in Data Structures, Algorithms, software development, and emerging technologies.
Always learning, building, and improving.` 
      },
    ] 
  },
  { 
    name: 'projects', 
    type: 'folder', 
    icon: Folder, 
    children: [
      { 
        name: 'codearena.txt', 
        type: 'file', 
        icon: FileText, 
        content: `Project: CodeArena
Description: Live coding battle platform where users can create rooms and battle with friends! Features practice questions and a room leaderboard that shows points in real-time.
Tech Stack: React, Node.js, WebSockets, Express
Live: https://codearena-uc8l.onrender.com/` 
      },
      { 
        name: 'deepseek-ai.txt', 
        type: 'file', 
        icon: FileText, 
        content: `Project: DEEPSEEK-AI
Description: Real-time AI that detects AI-generated images, deepfake audio, and verifies news authenticity. Features floating screenshot button for instant verification.
Tech Stack: Python, Flask, PyTorch, Chrome Extension
GitHub: https://github.com/Exwhyzed-del/DEEPSEEK-AI-` 
      },
      { 
        name: 'exwhyzed-typer.txt', 
        type: 'file', 
        icon: FileText, 
        content: `Project: EXWHYZED-TyperPro
Description: Smart auto-typer that types anything you paste. Works across multiple devices via desktop sharing apps like AnyDesk, TeamViewer, etc.
Tech Stack: Python, PyAutoGUI, Tkinter
GitHub: https://github.com/Exwhyzed-del/EXWHYZED_TYPER` 
      },
    ] 
  },
  { 
    name: 'skills', 
    type: 'folder', 
    icon: Folder, 
    children: [
      { 
        name: 'languages.txt', 
        type: 'file', 
        icon: FileText, 
        content: `Programming Languages:
- C++
- Java
- Python
- JavaScript
- TypeScript` 
      },
      { 
        name: 'frontend.txt', 
        type: 'file', 
        icon: FileText, 
        content: `Frontend Technologies:
- React
- Next.js
- Tailwind CSS
- HTML5 / CSS3` 
      },
      { 
        name: 'backend.txt', 
        type: 'file', 
        icon: FileText, 
        content: `Backend Technologies:
- Node.js
- Python (Flask, FastAPI)
- APIs (REST)
- Databases (SQL, MongoDB)` 
      },
      { 
        name: 'tools.txt', 
        type: 'file', 
        icon: FileText, 
        content: `Tools & Technologies:
- Git & GitHub
- Linux
- Docker
- CI/CD (Jenkins, GitHub Actions)` 
      },
    ] 
  },
  {
    name: 'certificates',
    type: 'folder',
    icon: Award,
    children: [
      { name: 'HACKATHON_WINNER.pdf', type: 'file', icon: FileText, path: '/certificates/HACKATHON_WINNER.pdf' },
      { name: 'DevOps.pdf', type: 'file', icon: FileText, path: '/certificates/DevOps.pdf' },
      { name: 'Agile.pdf', type: 'file', icon: FileText, path: '/certificates/Agile.pdf' },
    ],
  },
  { name: 'resume.pdf', type: 'file', icon: FileText, path: '/resume.pdf' },
];

const FileExplorerApp = () => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const getCurrentFiles = (): FileItem[] => {
    let files = rootFiles;
    for (const part of currentPath) {
      const folder = files.find((f) => f.name === part && f.type === 'folder');
      if (folder?.children) {
        files = folder.children;
      }
    }
    return files;
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentPath([...currentPath, file.name]);
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
      if (file.path) {
        window.open(file.path, '_blank');
      }
    }
  };

  const goBack = () => {
    setCurrentPath(currentPath.slice(0, -1));
    setSelectedFile(null);
  };

  const currentFiles = getCurrentFiles();
  const fullPath = '/home/aryan/' + currentPath.join('/');

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {currentPath.length > 0 && (
            <button
              onClick={goBack}
              className="glass p-2 rounded-lg hover:bg-primary/10 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
          )}
          <h1 className="text-3xl font-bold text-primary">File Explorer</h1>
        </div>
        {selectedFile?.type === 'file' && selectedFile?.path && (
          <a
            href={selectedFile.path}
            download
            className="bg-primary hover:bg-primary/80 text-[#050505] font-bold px-4 py-2 rounded-lg transition-all"
          >
            Download
          </a>
        )}
      </div>
      <div className="glass p-4 rounded-xl flex-1 overflow-auto">
        <div className="text-secondary mb-4 font-mono text-sm">{fullPath}</div>
        
        {selectedFile && selectedFile.type === 'file' && selectedFile.content && (
          <div className="mb-6 p-4 bg-[#111] rounded-lg border border-primary/30">
            <div className="text-sm font-bold text-secondary mb-2">{selectedFile.name}</div>
            <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">{selectedFile.content}</pre>
          </div>
        )}
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currentFiles.map((file, i) => (
            <div
              key={i}
              onClick={() => handleFileClick(file)}
              className={`p-4 rounded-xl text-center cursor-pointer transition-all border-2 ${
                selectedFile?.name === file.name
                  ? 'border-primary bg-primary/10'
                  : 'border-transparent hover:border-primary/50 hover:bg-[#111]'
              }`}
            >
              <file.icon className="w-10 h-10 mx-auto mb-2 text-primary" />
              <div className="text-xs text-gray-300 break-all">{file.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileExplorerApp;
