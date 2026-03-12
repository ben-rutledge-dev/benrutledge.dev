import Image from 'next/image';
// Components
import { Button } from '@/app/components/Button';
import { CodeBlock } from '@/app/components/CodeBlock';
import { TechBadge } from '@/app/components/TechBadge';
import { Gallery, GalleryImage } from '@/app/components/Gallery';
import { H } from '@/app/components/H';
import { PageWrapper } from '@/app/components/PageWrapper';
import { Section } from '@/app/components/Section';
import { WorkflowCard } from './components/WorkflowCard';

const images: GalleryImage[] = [
  { src: '/notion-workflows/img/recipes.png', alt: 'Recipes Workflow', width: 800, height: 600 },
  { src: '/notion-workflows/img/shopping-planner.png', alt: 'Shopping Planner Workflow', width: 800, height: 600 },
  { src: '/notion-workflows/img/films.png', alt: 'Films & TV Database', width: 800, height: 600 },
  { src: '/notion-workflows/img/grocery-shopping.png', alt: 'Grocery List Workflow', width: 800, height: 600 },
  { src: '/notion-workflows/img/activities.png', alt: 'Activities Database', width: 800, height: 600 },
  { src: '/notion-workflows/img/travel-list.png', alt: 'Travel Database', width: 800, height: 600 },
  { src: '/notion-workflows/img/walks.png', alt: 'Walks Database', width: 800, height: 600 },
];

export default function NotionWorkflowsPage() {
  return (
    <PageWrapper maxWidth="max-w-full" padding="p-0">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-8 pb-12">
        <h1 className="text-3xl font-bold mb-4">Notion Workflows</h1>
        <p className="text-xl text-gray-300">
          Automated workflows for managing and enriching Notion databases with AI-powered content generation.
        </p>
      </div>

      {/* Gallery - full width */}
      <Gallery images={images} />

      {/* Project Details */}
      <div className="max-w-3xl mx-auto px-8 pb-8">
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <Section>
            <H>Overview</H>
            <p>
              A collection of automated workflows that manage and enrich Notion databases —
              from meal planning and shopping lists to travel guides and pub crawl routes.
              The system runs nightly via GitHub Actions, using TypeScript, the Notion API,
              and Google Gemini AI to automate repetitive tasks and generate intelligent content.
            </p>
          </Section>

          <Section>
            <H>Key Workflows</H>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <WorkflowCard title="Manage Shopping" description="End-to-end shopping list manager that extracts ingredients from meal plans and uses Gemini AI to categorize items automatically." />
              <WorkflowCard title="Populate Films & TV" description="Enriches a films/TV database with metadata from TMDB and OMDb APIs — posters, overview, runtime, genres, directors, and ratings." />
              <WorkflowCard title="Populate Meals" description="Uses Gemini AI to auto-complete meal recipes with ingredients and cooking instructions following British English conventions." />
              <WorkflowCard title="Populate Pubs" description="Calculates optimal pub crawl routes using geolocation, Haversine formula, and nearest-neighbour optimization." />
              <WorkflowCard title="Manage Meal Planner" description="Maintains a rolling 28-day meal planner by archiving past days and creating future day pages automatically." />
              <WorkflowCard title="Events Calendar" description="Generates recurring calendar events from templates, creating events for the next 12 months based on weekday and week ordinal rules." />
            </div>
          </Section>

          <Section>
            <H>Technologies</H>
            <div className="flex flex-wrap gap-2">
              <TechBadge>TypeScript</TechBadge>
              <TechBadge>Node.js</TechBadge>
              <TechBadge>Notion API</TechBadge>
              <TechBadge>Google Gemini AI</TechBadge>
              <TechBadge>GitHub Actions</TechBadge>
              <TechBadge>TMDB API</TechBadge>
              <TechBadge>OMDb API</TechBadge>
            </div>
          </Section>

          <Section>
            <H>Project Structure</H>
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
          </Section>

          <Section>
            <H>Technical Highlights</H>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Automated CI/CD:</strong> All workflows run on nightly cron schedules via GitHub Actions with manual trigger support</li>
              <li><strong>AI Integration:</strong> Leverages Gemini 2.5 Flash with JSON response mode for structured content generation</li>
              <li><strong>Geospatial Algorithms:</strong> Implements Haversine formula and nearest-neighbour optimization for route planning</li>
              <li><strong>API Orchestration:</strong> Integrates multiple external APIs (Notion, TMDB, OMDb, Gemini) with robust error handling</li>
              <li><strong>Modular Architecture:</strong> Shared utilities for logging, parsing, and API clients enable rapid workflow development</li>
            </ul>
          </Section>

          <div className="mt-12 pt-8 border-t border-gray-800 flex gap-4">
            <Button href="/projects">← Back to Projects</Button>
            <Button href="https://github.com/ben-rutledge-dev/notion-workflows" external>
              <Image src="/icons/github-logo.svg" alt="GitHub" width={20} height={20} className="inline-block mr-2" />
              View on GitHub →
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}