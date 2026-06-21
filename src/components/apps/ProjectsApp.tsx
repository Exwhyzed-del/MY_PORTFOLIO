'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'EXWHYZED-TyperPro',
    description: 'Smart auto-typer that types anything you paste. Works across multiple devices via desktop sharing apps like AnyDesk, TeamViewer, etc.',
    tech: ['Python', 'PyAutoGUI', 'Tkinter'],
    githubUrl: 'https://github.com/Exwhyzed-del/EXWHYZED_TYPER',
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=auto%20typer%20software%20dark%20theme%20cyberpunk%20interface&image_size=square'
  },
  {
    id: 2,
    title: 'Anonymous College Doubt Forum',
    description: 'A platform for students to ask and answer doubts anonymously',
    tech: ['React', 'Node.js', 'MongoDB'],
    githubUrl: '',
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20forum%20website%20dark%20theme%20cyberpunk&image_size=square'
  },
  {
    id: 3,
    title: 'Resume Gap Explainer',
    description: 'AI tool to help explain resume gaps professionally',
    tech: ['Next.js', 'OpenAI', 'Tailwind'],
    githubUrl: '',
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=resume%20builder%20ai%20interface%20dark%20theme&image_size=square'
  },
  {
    id: 4,
    title: 'Court Case Simplifier',
    description: 'Simplify legal jargon for common people',
    tech: ['Python', 'NLP', 'Flask'],
    githubUrl: '',
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=law%20and%20justice%20dashboard%20dark%20theme&image_size=square'
  },
  {
    id: 5,
    title: 'Medicine Label Reader',
    description: 'OCR tool to read and explain medicine labels',
    tech: ['React Native', 'TensorFlow', 'Firebase'],
    githubUrl: '',
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=medicine%20pill%20bottle%20scanner%20app%20interface&image_size=square'
  },
  {
    id: 6,
    title: 'Group Project Manager',
    description: 'Collaboration tool for team projects',
    tech: ['Next.js', 'Socket.io', 'PostgreSQL'],
    githubUrl: '',
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=project%20management%20dashboard%20dark%20theme&image_size=square'
  },
  {
    id: 7,
    title: 'Exam Pattern Analyzer',
    description: 'Analyze past exam patterns to predict future questions',
    tech: ['Python', 'Machine Learning', 'Streamlit'],
    githubUrl: '',
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=exam%20analysis%20charts%20and%20graphs%20dark%20theme&image_size=square'
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
                <button className="text-sm bg-secondary/20 hover:bg-secondary/30 text-secondary px-4 py-2 rounded transition-all">
                  Live Demo
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
