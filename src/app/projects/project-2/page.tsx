import Link from 'next/link';
import styles from '../projects.module.css';

export default function ProjectTwo() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Dim and blur overlay over the background noise lines */}
      <div className="fixed inset-0 z-5 bg-black/30 backdrop-blur-[2px]" />
      
      {/* Content overlay */}
      <div className="relative z-10 p-8 animate-slide-in-up">
        <div className="max-w-4xl mx-auto pt-20">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Project Two</h1>
            <p className="text-xl text-gray-300">
              A creative coding experiment exploring generative art and animation.
            </p>
          </div>
          
          {/* Hero Image Placeholder */}
          <div 
            className={`${styles.squircleHero} flex items-center justify-center text-white/20 text-8xl font-bold`}
            style={{ 
              backgroundColor: '#EC4899'
            }}
          >
            2
          </div>
          
          {/* Project Details */}
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
              <p>
                An exploration of generative art using code. This project combines algorithmic 
                design with creative expression to produce unique visual experiences.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-white/10 rounded-md">Canvas API</span>
                <span className="px-4 py-2 bg-white/10 rounded-md">WebGL</span>
                <span className="px-4 py-2 bg-white/10 rounded-md">TypeScript</span>
                <span className="px-4 py-2 bg-white/10 rounded-md">GLSL</span>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Key Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Real-time generative animations</li>
                <li>Interactive parameters and controls</li>
                <li>Optimized rendering performance</li>
                <li>Exportable artwork and animations</li>
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
                className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-md transition-colors"
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
