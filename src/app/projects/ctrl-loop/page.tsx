import Link from 'next/link';
import styles from '../projects.module.css';
import CtrlLoopPlayer from './CtrlLoopPlayer';

export default function CtrlLoopPage() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Dim and blur overlay over the background noise lines */}
      <div className="fixed inset-0 z-5 bg-black/30 backdrop-blur-[2px]" />

      {/* Content overlay */}
      <div className="relative z-10 p-8 animate-slide-in-up">
        <div className="max-w-4xl mx-auto pt-20">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">ctrl_loop</h1>
            <p className="text-xl text-gray-300">
              An interactive browser-based loop player built with the Web Audio API.
            </p>
          </div>

          {/* Player */}
          <div
            className={`${styles.squircleHero} flex items-center justify-center overflow-hidden`}
            style={{ backgroundColor: '#111' }}
          >
            <CtrlLoopPlayer />
          </div>

          {/* Project Details */}
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
              <p>
                ctrl_loop loads 16 audio stems — drums, bass, keys, and vocals — and plays them
                in sync as looping buffers. Each pad toggles a stem on or off in real time,
                letting you remix the track on the fly. A high-pass filter with adjustable
                frequency can be applied across the mix, and every pad is bound to a keyboard key.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-white/10 rounded-md">Web Audio API</span>
                <span className="px-4 py-2 bg-white/10 rounded-md">JavaScript</span>
                <span className="px-4 py-2 bg-white/10 rounded-md">React</span>
                <span className="px-4 py-2 bg-white/10 rounded-md">Next.js</span>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">How to use</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Click <strong>Start</strong> to load the audio stems</li>
                <li>Press the play button to start the loop</li>
                <li>Click any pad (or its keyboard shortcut) to toggle that stem</li>
                <li>White pad = playing · Black pad = muted</li>
                <li>Enable the filter and drag the frequency slider to shape the mix</li>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
