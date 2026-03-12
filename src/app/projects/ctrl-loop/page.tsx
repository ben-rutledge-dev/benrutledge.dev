import { Button } from '@/app/components/Button';
import { TechBadge } from '@/app/components/TechBadge';
import { PageWrapper } from '@/app/components/PageWrapper';
import CtrlLoopPlayer from './ctrlLoopPlayer';

export default function CtrlLoopPage() {
  return (
    <PageWrapper>
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">ctrl_loop</h1>
        <p className="text-xl text-gray-300">
          An interactive browser-based loop player built with the Web Audio API.
        </p>
      </div>

      <div className="flex items-center justify-center overflow-hidden">
        <CtrlLoopPlayer />
      </div>

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
            <TechBadge>Web Audio API</TechBadge>
            <TechBadge>JavaScript</TechBadge>
            <TechBadge>React</TechBadge>
            <TechBadge>Next.js</TechBadge>
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

        <div className="mt-12 pt-8 border-t border-gray-800 flex gap-4">
          <Button href="/projects">← Back to Projects</Button>
        </div>
      </div>
    </PageWrapper>
  );
}