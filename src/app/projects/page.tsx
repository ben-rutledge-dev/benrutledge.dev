import Link from 'next/link';
import Image from 'next/image';
import styles from './projects.module.css';
import fs from 'node:fs';
import path from 'node:path';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  image?: string;
}

async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(process.cwd(), 'src/app/projects');
  const entries = fs.readdirSync(projectsDir, { withFileTypes: true });
  
  const projects: Project[] = [];
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const projectPath = path.join(projectsDir, entry.name);
      const pagePath = path.join(projectPath, 'page.tsx');
      const metadataPath = path.join(projectPath, 'metadata.json');
      
      // Only include if page.tsx exists
      if (fs.existsSync(pagePath)) {
        // Try to read metadata.json
        if (fs.existsSync(metadataPath)) {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
          projects.push(metadata);
        } else {
          // Fallback if no metadata file
          projects.push({
            id: entry.name,
            title: entry.name.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' '),
            description: 'A project by Ben Rutledge',
            thumbnail: '#4F46E5'
          });
        }
      }
    }
  }
  
  return projects;
}

export default async function Projects() {
  const projects = await getProjects();
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
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                      {project.image ? (
                        <Image src={project.image} alt={project.title} width={200} height={200} className="w-1/2" />
                      ) : (
                        project.title.charAt(0)
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
