'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'DEEPSEEK-AI',
    description: 'Real-time AI that detects AI-generated images, deepfake audio, and verifies news authenticity. Features floating screenshot button for instant verification.',
    tech: ['Python', 'Flask', 'PyTorch', 'Chrome Extension'],
    githubUrl: 'https://github.com/Exwhyzed-del/DEEPSEEK-AI-',
    readmeUrl: 'https://github.com/Exwhyzed-del/DEEPSEEK-AI-/blob/main/README.md',
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=DEEPSEEK-AI%20cyberpunk%20security%20shield%20AI%20detection%20interface%20neon%20green%20and%20blue%20dark%20theme%20sleek%20modern%20UI&image_size=square'
  },
  {
    id: 2,
    title: 'EXWHYZED-TyperPro',
    description: 'Smart auto-typer that types anything you paste. Works across multiple devices via desktop sharing apps like AnyDesk, TeamViewer, etc.',
    tech: ['Python', 'PyAutoGUI', 'Tkinter'],
    githubUrl: 'https://github.com/Exwhyzed-del/EXWHYZED_TYPER',
    readmeUrl: 'https://github.com/Exwhyzed-del/EXWHYZED_TYPER/blob/main/Typer/README.md',
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=EXWHYZED-TyperPro%20auto%20typer%20software%20cyberpunk%20dark%20theme%20professional%20banner%20with%20keyboard%20and%20code%20elements&image_size=square'
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
