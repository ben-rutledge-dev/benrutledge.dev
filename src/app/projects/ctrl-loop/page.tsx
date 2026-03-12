import { Button } from '@/app/components/Button';
import { TechBadge } from '@/app/components/TechBadge';
import { PageWrapper } from '@/app/components/PageWrapper';
import CtrlLoopPlayer from './ctrlLoopPlayer';
import { Section } from '@/app/components/Section';
import { H } from '@/app/components/H';

export default function CtrlLoopPage() {
  return (
    <PageWrapper title="ctrl_loop">
      <div className="mb-12">
        <p className="text-xl text-gray-300">
          An interactive browser-based loop player built with the Web Audio API.
        </p>
      </div>

      <div className="flex items-center justify-center overflow-hidden">
        <CtrlLoopPlayer />
      </div>

      <div className="space-y-6 text-gray-300 leading-relaxed">
        <Section>
          <H>Overview</H>
          <p>
            ctrl_loop loads 16 audio stems — drums, bass, keys, and vocals — and plays them
            in sync as looping buffers. Each pad toggles a stem on or off in real time,
            letting you remix the track on the fly. A high-pass filter with adjustable
            frequency can be applied across the mix, and every pad is bound to a keyboard key.
          </p>
        </Section>

        <Section>
          <H>Technologies</H>
          <div className="flex flex-wrap gap-2">
            <TechBadge>Web Audio API</TechBadge>
            <TechBadge>JavaScript</TechBadge>
            <TechBadge>React</TechBadge>
            <TechBadge>Next.js</TechBadge>
          </div>
        </Section>

        <Section>
          <H>How to use</H>
          <ul className="list-disc list-inside space-y-2">
            <li>Click <strong>Start</strong> to load the audio stems</li>
            <li>Press the play button to start the loop</li>
            <li>Click any pad (or its keyboard shortcut) to toggle that stem</li>
            <li>White pad = playing · Black pad = muted</li>
            <li>Enable the filter and drag the frequency slider to shape the mix</li>
          </ul>
        </Section>

        <div className="mt-12 pt-8 border-t border-gray-800 flex gap-4">
          <Button href="/projects">← Back to Projects</Button>
        </div>
      </div>
    </PageWrapper>
  );
}