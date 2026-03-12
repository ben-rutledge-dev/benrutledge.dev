import Image from 'next/image';
// Components
import { Button } from '@/app/components/Button';
import { CodeBlock } from '@/app/components/CodeBlock';
import { PageWrapper } from '@/app/components/PageWrapper';
import { TechBadge } from '@/app/components/TechBadge';

export default function CommitSentinelPage() {
  return (
    <PageWrapper>
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4">Commit Sentinel</h1>
      <p className="text-xl text-gray-300">
        Git hook that enforces commit message and branch naming conventions with intelligent suggestions.
      </p>
      {/* Project Details */}
      <div className="px-8 pb-8">
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
            <p>
              Commit Sentinel is a configurable git commit-msg hook that validates commit messages,
              branch names, and file scopes before allowing commits to proceed. When validation fails,
              it provides clear feedback and intelligent suggestions for fixes. The tool helps teams
              maintain consistent git conventions and catch common mistakes early — from verb tense
              and casing to conventional commit types and branch naming patterns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Key Features</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Commit Message Validation</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Enforce verb tense (imperative, past, or present)</li>
                  <li>Validate casing (sentence, lower, upper, title, camel)</li>
                  <li>Check length constraints with customizable min/max</li>
                  <li>Support for Conventional Commits (feat:, fix:, docs:, etc.)</li>
                  <li>Block forbidden words and generic single-word messages</li>
                  <li>Custom regex patterns for specialized requirements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">Branch Name Validation</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Enforce allowed prefixes (feature, bugfix, hotfix, etc.)</li>
                  <li>Require ticket numbers with customizable patterns</li>
                  <li>Validate naming conventions (kebab-case, snake_case)</li>
                  <li>Check verb tense in branch descriptions</li>
                  <li>Support exempt branches with glob patterns</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">Scope Isolation</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Prevent mixing changes from different scoped paths</li>
                  <li>Ensure shared code or migrations are committed separately</li>
                  <li>Configurable glob patterns with custom error messages</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              <TechBadge>TypeScript</TechBadge>
              <TechBadge>Node.js</TechBadge>
              <TechBadge>Git Hooks</TechBadge>
              <TechBadge>CLI Tools</TechBadge>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Installation</h2>
            <CodeBlock>{`npm install --save-dev commit-sentinel
npx commit-sentinel install`}</CodeBlock>
            <p className="mt-2 text-sm">
              The install command adds a commit-msg hook to .git/hooks. If a hook already exists,
              commit-sentinel is chained to preserve existing functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Configuration Example</h2>
            <p className="mb-3">
              Create <code className="px-1.5 py-0.5 bg-gray-800 rounded text-sm">.commit-sentinel.json</code> in
              your project root or run <code className="px-1.5 py-0.5 bg-gray-800 rounded text-sm">npx commit-sentinel init</code>:
            </p>
            <CodeBlock>{`{
  "commits": {
    "enabled": true,
    "enforce": true,
    "tense": "imperative",
    "case": "sentence",
    "minLength": 10,
    "maxLength": 72,
    "noTrailingPeriod": true,
    "noGenericMessages": true,
    "requireType": false,
    "allowedTypes": ["feat", "fix", "docs", "chore", "refactor"],
    "forbiddenWords": ["WIP", "wip", "fixup"]
  },
  "branches": {
    "enabled": true,
    "enforce": true,
    "allowedPrefixes": ["feature", "bugfix", "hotfix"],
    "requireTicketNumber": true,
    "ticketPattern": "[0-9]{4,}",
    "namingPattern": "kebab-case",
    "exempt": ["main", "develop", "release-*"]
  },
  "scope": {
    "enabled": false,
    "rules": []
  }
}`}</CodeBlock>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Usage Example</h2>
            <p className="mb-3">
              When a commit fails validation, Commit Sentinel provides clear error messages and suggestions:
            </p>
            <CodeBlock>{`❌  Commit blocked by commit-sentinel

Commit: "added login screen"

- Verb tense is wrong. Required: imperative mood (e.g. "Add feature")
- Subject case is wrong. Required: Sentence case (first letter capitalised)

💡 Suggestions:
   Try: "Add login screen"`}</CodeBlock>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Technical Highlights</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Composable Hooks:</strong> Intelligently chains with existing git hooks instead of
                overwriting them, preserving your workflow
              </li>
              <li>
                <strong>Flexible Enforcement:</strong> Every check supports warn-only mode
                (enforce: false) for gradual adoption in existing projects
              </li>
              <li>
                <strong>CLI Commands:</strong> Includes validate, validate-branch, install, uninstall,
                and init commands for manual testing and CI integration
              </li>
              <li>
                <strong>Programmatic API:</strong> Export CommitSentinel class for custom integrations
                and automated workflows
              </li>
              <li>
                <strong>Smart Suggestions:</strong> Context-aware auto-corrections for common mistakes
                (case conversion, verb conjugation, trailing periods)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">CLI Commands</h2>
            <CodeBlock>{`# Install the git hook
npx commit-sentinel install

# Remove the hook
npx commit-sentinel uninstall

# Manually validate a commit message (useful in CI)
npx commit-sentinel validate "feat: add login screen"

# Manually validate a branch name
npx commit-sentinel validate-branch "feature/1234-add-login"

# Generate a default config file
npx commit-sentinel init`}</CodeBlock>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Preset Examples</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-medium text-white mb-2">Strict Conventional Commits</h3>
                <CodeBlock>{`{
  "commits": {
    "requireType": true,
    "allowedTypes": ["feat", "fix", "docs", "chore", "refactor", "test"],
    "tense": "imperative",
    "case": "lower",
    "maxLength": 72
  }
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-base font-medium text-white mb-2">Isolate Shared Code Changes</h3>
                <CodeBlock>{`{
  "scope": {
    "enabled": true,
    "enforce": true,
    "rules": [
      { "path": "src/shared/**", "name": "shared code" },
      { 
        "path": "db/migrations/**", 
        "message": "Database migrations should be committed separately" 
      }
    ]
  }
}`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-base font-medium text-white mb-2">Relaxed Mode (Just Length and No WIP)</h3>
                <CodeBlock>{`{
  "commits": {
    "tense": null,
    "case": null,
    "minLength": 8,
    "maxLength": 100,
    "forbiddenWords": ["WIP", "wip", "TODO", "FIXME"]
  },
  "branches": {
    "enabled": false
  }
}`}</CodeBlock>
              </div>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-800 flex gap-4">
            <Button href="/projects">← Back to Projects</Button>
            <Button href="https://github.com/ben-rutledge-dev/commit-sentinel" external>
              <Image src="/icons/github-logo.svg" alt="GitHub" width={20} height={20} className="inline-block mr-2" />
              View on GitHub →
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}