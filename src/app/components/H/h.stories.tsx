import { H } from './h'
import { Section } from '@/app/components/Section'


const StoryMeta = {
  title: 'Design System/Atoms/Headings/H',
  component: Section,
  subcomponents: { H }
}

export const Level2 = () => <H>I&apos;m a H2</H>

export const Level3 = () => (
  <Section>
    <H>I&apos;m a H3</H>
  </Section>
)

export const Level4 = () => (
  <Section>
    <Section>
      <H>I&apos;m a H4</H>
    </Section>
  </Section>
)

export const Level5 = () => (
  <Section>
    <Section>
      <Section>
        <H>I&apos;m a H5</H>
      </Section>
    </Section>
  </Section>
)

export const Level6 = () => (
  <Section>
    <Section>
      <Section>
        <Section>
          <H>I&apos;m a H6</H>
        </Section>
      </Section>
    </Section>
  </Section>
)

export const Level7 = () => (
  <Section>
    <Section>
      <Section>
        <Section>
          <Section>
            <H>I&apos;m still a H6</H>
          </Section>
        </Section>
      </Section>
    </Section>
  </Section>
)

export default StoryMeta