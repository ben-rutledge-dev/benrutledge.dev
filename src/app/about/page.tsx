import Link from 'next/link';

export default function About() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Dim and blur overlay over the background noise lines */}
      <div className="fixed inset-0 z-5 bg-black/30 backdrop-blur-[2px]" />
      
      {/* Content overlay */}
      <div className="relative z-10 p-8 animate-slide-in-up">
        <div className="max-w-3xl mx-auto pt-20">
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>I've been writing code professionally for 5 years, across the full spectrum — scrappy agency projects where you ship something new every other week, all the way through to enterprise SaaS products where the decisions you make on a Tuesday are still haunting someone three years later. I know what it looks like when tech debt compounds quietly in the background, and I know the particular joy of inheriting a codebase with no tests and a README last updated in 2019.</p>
            <p>I'm a product-focused developer. The code is a means to an end, and that end is something people actually want to use. I care deeply about what gets built and why — less so about whether we're using Tailwind (though I have thoughts). The instinct goes back further than the job title — anyone who spent their early years wrestling with MySpace's layout editor for their band's page knows that the itch to make things look and work a certain way doesn't really go away.</p>
            <p>Five years is enough time to develop some opinions, and I have. But I've learned to pick my battles. I'm opinionated where it matters — architecture, user experience, test coverage, not shipping broken things — and deliberately un-opinionated where it doesn't. Life's too short to die on the hill of tabs vs. spaces.</p>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <Link 
                href="/"
                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
