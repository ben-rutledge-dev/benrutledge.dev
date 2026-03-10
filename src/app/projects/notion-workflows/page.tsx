import { Button } from '@/app/components/Button';
import { TechBadge } from '@/app/components/TechBadge';
import { CodeBlock } from '@/app/components/CodeBlock';
import { Gallery, GalleryImage } from '@/app/components/Gallery';
import { WorkflowCard } from './components/WorkflowCard';

const images: GalleryImage[] = [
  {
    src: '/notion-workflows/img/recipes.png',
    alt: 'Recipes Workflow',
    width: 800,
    height: 600,
  },
  {
    src: '/notion-workflows/img/shopping-planner.png',
    alt: 'Shopping Planner Workflow',
    width: 800,
    height: 600,
  },
  {
    src: '/notion-workflows/img/films.png',
    alt: 'Films & TV Database',
    width: 800,
    height: 600,
  },
  {
    src: '/notion-workflows/img/grocery-shopping.png',
    alt: 'Grocery List Workflow',
    width: 800,
    height: 600,
  },
  {
    src: '/notion-workflows/img/activities.png',
    alt: 'Activities Database',
    width: 800,
    height: 600,
  },
  {
    src: '/notion-workflows/img/travel-list.png',
    alt: 'Travel Database',
    width: 800,
    height: 600,
  },
  {
    src: '/notion-workflows/img/walks.png',
    alt: 'Walks Database',
    width: 800,
    height: 600,
  },
];

export default function NotionWorkflowsPage() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Dim and blur overlay over the background noise lines */}
      <div className="fixed inset-0 z-5 bg-black/30 backdrop-blur-[2px]" />

      {/* Content overlay */}
      <div className="relative z-10 animate-slide-in-up">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-8 pt-28 pb-12">
          <h1 className="text-4xl font-bold mb-4">Notion Workflows</h1>
          <p className="text-xl text-gray-300">
            Automated workflows for managing and enriching Notion databases with AI-powered content generation.
          </p>
        </div>

        {/* Project Images - Full Width */}
        <Gallery images={images} />

        {/* Project Details */}
        <div className="max-w-4xl mx-auto px-8 pb-8">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
              <p>
                A collection of automated workflows that manage and enrich Notion databases —
                from meal planning and shopping lists to travel guides and pub crawl routes. 
                The system runs nightly via GitHub Actions, using TypeScript, the Notion API, 
                and Google Gemini AI to automate repetitive tasks and generate intelligent content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Key Workflows</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WorkflowCard
                  title="Manage Shopping"
                  description="End-to-end shopping list manager that extracts ingredients from meal plans and uses Gemini AI to categorize items automatically."
                />
                <WorkflowCard
                  title="Populate Films & TV"
                  description="Enriches a films/TV database with metadata from TMDB and OMDb APIs — posters, overview, runtime, genres, directors, and ratings."
                />
                <WorkflowCard
                  title="Populate Meals"
                  description="Uses Gemini AI to auto-complete meal recipes with ingredients and cooking instructions following British English conventions."
                />
                <WorkflowCard
                  title="Populate Pubs"
                  description="Calculates optimal pub crawl routes using geolocation, Haversine formula, and nearest-neighbour optimization."
                />
                <WorkflowCard
                  title="Manage Meal Planner"
                  description="Maintains a rolling 28-day meal planner by archiving past days and creating future day pages automatically."
                />
                <WorkflowCard
                  title="Events Calendar"
                  description="Generates recurring calendar events from templates, creating events for the next 12 months based on weekday and week ordinal rules."
                />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                <TechBadge>TypeScript</TechBadge>
                <TechBadge>Node.js</TechBadge>
                <TechBadge>Notion API</TechBadge>
                <TechBadge>Google Gemini AI</TechBadge>
                <TechBadge>GitHub Actions</TechBadge>
                <TechBadge>TMDB API</TechBadge>
                <TechBadge>OMDb API</TechBadge>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Project Structure</h2>
              <CodeBlock>{`utils/
  ai.ts          # Gemini AI client and batch annotation helper
  logger.ts      # Structured logger with log levels
  notion.ts      # Notion client, page/block CRUD helpers
  parsing.ts     # Property builders for Notion API requests

workflows/
  cleanup-shopping/          # Remove checked items from shopping lists
  events-calendar/           # Generate recurring calendar events
  manage-meal-planner/       # Rolling 28-day meal planner
  manage-shopping/           # AI-powered shopping list management
  populate-films-and-tv/     # TMDB/OMDb metadata enrichment
  populate-meals/            # AI-generated recipes
  populate-pubs/             # Optimal pub crawl routing
  populate-travel-database/  # AI travel destination annotations
  populate-walks-database/   # AI walking location annotations`}</CodeBlock>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Technical Highlights</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Automated CI/CD:</strong> All workflows run on nightly cron schedules 
                  via GitHub Actions with manual trigger support
                </li>
                <li>
                  <strong>AI Integration:</strong> Leverages Gemini 2.5 Flash with JSON response 
                  mode for structured content generation
                </li>
                <li>
                  <strong>Geospatial Algorithms:</strong> Implements Haversine formula and 
                  nearest-neighbour optimization for route planning
                </li>
                <li>
                  <strong>API Orchestration:</strong> Integrates multiple external APIs 
                  (Notion, TMDB, OMDb, Gemini) with robust error handling
                </li>
                <li>
                  <strong>Modular Architecture:</strong> Shared utilities for logging, parsing, 
                  and API clients enable rapid workflow development
                </li>
              </ul>
            </section>

            {/* Navigation and Links */}
            <div className="mt-12 pt-8 border-t border-gray-800 flex gap-4">
              <Button href="/projects">
                ← Back to Projects
              </Button>
              <Button href="https://github.com/ben-rutledge-dev/notion-workflows" external>
                View on GitHub →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
