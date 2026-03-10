import Link from 'next/link';
import styles from './projects.module.css';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'An innovative web application showcasing interactive design patterns.',
    thumbnail: '#4F46E5' // Indigo placeholder
  },
  {
    id: 'project-2',
    title: 'Project Two',
    description: 'A creative coding experiment exploring generative art and animation.',
    thumbnail: '#EC4899' // Pink placeholder
  },
  {
    id: 'project-3',
    title: 'Project Three',
    description: 'A data visualization dashboard with real-time analytics.',
    thumbnail: '#10B981' // Green placeholder
  },
  {
    id: 'ctrl-loop',
    title: 'ctrl_loop',
    description: 'An interactive browser-based loop player built with the Web Audio API.',
    thumbnail: '#111111'
  },
];

export default function Projects() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Dim and blur overlay over the background noise lines */}
      <div className="fixed inset-0 z-5 bg-black/30 backdrop-blur-[2px]" />
      
      {/* Content overlay */}
      <div className="relative z-10 p-8 animate-slide-in-up">
        <div className="max-w-6xl mx-auto pt-20">
          <h1 className="text-4xl font-bold mb-8">Projects</h1>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className={`group ${styles.projectCard}`}
              >
                <div className="relative">
                  {/* Squircle thumbnail container */}
                  <div 
                    className={styles.squircleThumbnail}
                    style={{ 
                      backgroundColor: project.thumbnail
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-6xl font-bold">
                      {project.id === 'ctrl-loop' ? (
                        <img src="/ctrl-loop/img/ctrl_loop.png" alt="ctrl_loop" className="w-1/2 invert opacity-30" />
                      ) : (
                        project.id.split('-')[1]
                      )}
                    </div>
                  </div>
                  
                  {/* Project info */}
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
