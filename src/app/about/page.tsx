import { H } from '@/app/components/H';
import { Section } from '@/app/components/Section';
import { Skill } from './components/Skill';
import { PageWrapper } from '@/app/components/PageWrapper';

export default function About() {
  const yearsExperience = getYearsOfExperience(CAREER_START);

  return (
    <PageWrapper title="About Me">
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>I've been writing code professionally for {yearsExperience} years, across the full spectrum - scrappy agency projects where you ship something new every other week, all the way through to enterprise SaaS products where the decisions you make on a Tuesday are still haunting someone three years later. I know what it looks like when tech debt compounds quietly in the background, and I know the particular joy of inheriting a site with no tests and no documentation, built in a dead obscure framework nobody has heard of.</p>
        <p>I'm a product-focused developer. The code is a means to an end, and that end is something people actually want to use. I care deeply about what gets built and why - less so about whether we're using Tailwind (though I have thoughts). The instinct goes back further than the job title - anyone who spent their early years wrestling with MySpace's layout editor for their band's page knows that the itch to make things look and work a certain way doesn't really go away.</p>
        <p>Five years is enough time to develop some opinions, and I have. But I've learned to pick my battles. I'm opinionated where it matters: architecture, user experience, test coverage, not shipping broken things - and deliberately un-opinionated where it doesn't. Life's too short to die on the hill of tabs vs. spaces.</p>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <Section>
            <H>Core Skills</H>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="flex flex-wrap gap-2">
                  {['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'HTML/CSS', 'Git', 'REST APIs'].map(skill => (
                    <Skill key={skill}>{skill}</Skill>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <Section>
                  <H>Specialties</H>
                  <div className="flex flex-wrap gap-2">
                    {['UI/UX Implementation and Planning/Design', 'Test-Driven Development', 'API Integration', 'Design System Management', 'Atomic Design and Development'].map(skill => (
                      <Skill key={skill}>{skill}</Skill>
                    ))}
                  </div>
                </Section>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </PageWrapper>
  );
}

const getYearsOfExperience = (startDate: Date): number => {
  const now = new Date();
  const years = now.getFullYear() - startDate.getFullYear();
  const monthDiff = now.getMonth() - startDate.getMonth();
  return monthDiff < 0 || (monthDiff === 0 && now.getDate() < startDate.getDate())
    ? years - 1
    : years;
}

const CAREER_START = new Date(2020, 1, 1); // February 2019