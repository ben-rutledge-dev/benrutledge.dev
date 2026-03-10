import Link from 'next/link';
import styles from '../projects.module.css';

export default function ProjectOne() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Dim and blur overlay over the background noise lines */}
      <div className="fixed inset-0 z-5 bg-black/30 backdrop-blur-[2px]" />
      
      {/* Content overlay */}
      <div className="relative z-10 p-8 animate-slide-in-up">
        <div className="max-w-4xl mx-auto pt-20">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Project One</h1>
            <p className="text-xl text-gray-300">
              An innovative web application showcasing interactive design patterns.
            </p>
          </div>
          
          {/* Hero Image Placeholder */}
          <div 
            className={`${styles.squircleHero} flex items-center justify-center text-white/20 text-8xl font-bold`}
            style={{ 
              backgroundColor: '#4F46E5'
            }}
          >
            1
          </div>
          
          {/* Project Details */}
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
              <p>
                This project demonstrates cutting-edge web technologies and interactive design 
                principles. Built with modern frameworks and a focus on user experience.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-white/10 rounded-md">React</span>
                <span className="px-4 py-2 bg-white/10 rounded-md">Next.js</span>
                <span className="px-4 py-2 bg-white/10 rounded-md">TypeScript</span>
                <span className="px-4 py-2 bg-white/10 rounded-md">Tailwind CSS</span>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Key Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Interactive user interface with smooth animations</li>
                <li>Responsive design optimized for all devices</li>
                <li>Performance-optimized with best practices</li>
                <li>Accessibility-first approach</li>
              </ul>
            </section>
            
            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-800 flex gap-4">
              <Link 
                href="/projects"
                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              >
                ← Back to Projects
              </Link>
              <a 
                href="#"
                className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
              >
                View Live Demo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
