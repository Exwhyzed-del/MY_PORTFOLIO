'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'CodeArena',
    description: 'Live coding battle platform where users can create rooms and battle with friends! Features practice questions and a room leaderboard that shows points in real-time.',
    tech: ['React', 'Node.js', 'WebSockets', 'Express'],
    githubUrl: null,
    readmeUrl: null,
    liveUrl: 'https://codearena-uc8l.onrender.com/',
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20CodeArena%20coding%20battle%20platform%20with%20split%20screen%20code%20editors%20fighting%20avatars%20neon%20cyan%20and%20magenta%20glow%20leaderboard%20with%20scores%20dark%20tech%20background&image_size=square'
  },
  {
    id: 2,
    title: 'DEEPSEEK-AI',
    description: 'Real-time AI that detects AI-generated images, deepfake audio, and verifies news authenticity. Features floating screenshot button for instant verification.',
    tech: ['Python', 'Flask', 'PyTorch', 'Chrome Extension'],
    githubUrl: 'https://github.com/Exwhyzed-del/DEEPSEEK-AI-',
    readmeUrl: 'https://github.com/Exwhyzed-del/DEEPSEEK-AI-/blob/main/README.md',
    liveUrl: null,
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=DEEPSEEK-AI%20cyberpunk%20security%20shield%20AI%20detection%20interface%20neon%20green%20and%20blue%20dark%20theme%20sleek%20modern%20UI&image_size=square'
  },
  {
    id: 3,
    title: 'EXWHYZED-TyperPro',
    description: 'Smart auto-typer that types anything you paste. Works across multiple devices via desktop sharing apps like AnyDesk, TeamViewer, etc.',
    tech: ['Python', 'PyAutoGUI', 'Tkinter'],
    githubUrl: 'https://github.com/Exwhyzed-del/EXWHYZED_TYPER',
    readmeUrl: 'https://github.com/Exwhyzed-del/EXWHYZED_TYPER/blob/main/Typer/README.md',
    liveUrl: null,
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=EXWHYZED-TyperPro%20cyberpunk%20auto%20typer%20tool%20with%20glowing%20keyboard%20keys%20typing%20animation%20dark%20tech%20background&image_size=square'
  }
];

const ProjectsApp = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl overflow-hidden hover:border-primary/50 transition-all"
          >
            <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-secondary mb-2">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.map((t, j) => (
                  <span key={j} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-secondary/20 hover:bg-secondary/30 text-secondary px-4 py-2 rounded transition-all inline-block"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded transition-all inline-block"
                  >
                    GitHub
                  </a>
                )}
                {project.readmeUrl && (
                  <a
                    href={project.readmeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-accent/20 hover:bg-accent/30 text-accent px-4 py-2 rounded transition-all inline-block"
                  >
                    About (README)
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
