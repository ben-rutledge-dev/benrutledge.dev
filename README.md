# Portfolio Site

A modern, performant portfolio website showcasing technical projects. Built with Next.js 16, React 19, and TypeScript, featuring custom components and interactive experiences.

## 🎯 Key Features

### Semantic Heading Management System
One of the standout technical features of this project is the **context-based heading hierarchy system** that ensures proper semantic HTML structure:

- **`<H />` Component**: A context-aware heading component that automatically determines its level (h2-h6) based on nesting depth
- **`<Section />` Component**: Wraps content and increments the heading context level for nested sections
- **Benefits**:
  - ✅ Maintains proper document outline for accessibility (WCAG compliance)
  - ✅ Improves SEO through semantic HTML structure
  - ✅ Enables component reusability without hardcoded heading levels
  - ✅ Prevents heading hierarchy violations automatically

```tsx
// Example: Headings automatically adjust based on nesting
<Section>
  <H>Main Title</H> {/* Renders as h2 */}
  <Section>
    <H>Subsection</H> {/* Renders as h3 */}
  </Section>
</Section>
```

### Interactive Canvas Animation
- **NoisyLines Component**: Custom canvas-based generative art using Simplex noise algorithm
  - Real-time mouse interaction with physics-based influence
  - Welcome animation with text masking
  - Optimized rendering with RAF (requestAnimationFrame)
  - Color interpolation and smooth transitions

### Custom Audio Player
- **CtrlLoop Player**: Full-featured audio player built with Web Audio API
  - Multi-track synchronization (16 independent tracks)
  - Individual track muting with keyboard shortcuts
  - Biquad filter with adjustable frequency
  - Seamless looping with precise timing control

### Component Architecture
- Modular, reusable component library with consistent patterns
- TypeScript for type safety across the codebase
- Component co-location (component files alongside tests and styles)
- Barrel exports (`index.ts`) for clean import paths

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint (Next.js config)
- **Audio**: Web Audio API
- **Graphics**: Canvas API + Simplex Noise
- **Image Optimization**: next/image

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Shared UI components
│   │   ├── H/              # Context-aware heading component
│   │   ├── Section/        # Heading level provider
│   │   ├── NoisyLines/     # Canvas animation
│   │   └── ...             # Button, CodeBlock, Gallery, etc.
│   ├── context/            # React Context providers
│   ├── projects/           # Project showcase pages
│   │   ├── ctrl-loop/      # Audio player project
│   │   ├── notion-workflows/
│   │   └── commit-sentinel/
│   ├── about/
│   ├── contact/
│   └── page.tsx            # Home page
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Run ESLint
npm test         # Run Jest test suite
```

## 🧪 Testing

The project includes comprehensive test coverage with:
- Unit tests for components
- Snapshot testing for UI consistency
- React Testing Library for user-centric tests
- Test configuration optimized for Next.js

```bash
npm test               # Run all tests
npm test -- --watch   # Run tests in watch mode
```

## 📦 Key Dependencies

- `next` - React framework with SSR and Static Generation
- `react` / `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `simplex-noise` - Procedural noise generation
- `html-to-image` - HTML element to image conversion

## 🏗 Technical Highlights

1. **Type Safety**: Strict TypeScript configuration with comprehensive type coverage
2. **Performance**: Next.js image optimization, code splitting, and SSR
3. **Accessibility**: Semantic HTML, proper heading hierarchy, keyboard navigation
4. **Code Quality**: ESLint configuration, consistent code style, comprehensive tests
5. **Modern React**: Hooks, Context API, React 19 features
6. **CSS Architecture**: Tailwind utility classes with custom CSS modules where needed

## 📝 Code Patterns

### Component Testing Pattern
```typescript
// Each component includes type-safe tests
describe('H', () => {
  it('renders correct heading level based on context', () => {
    const { container } = render(<Level2 />)
    expect(screen.getByText('heading').tagName).toEqual('H2')
  })
})
```

### Context-Based Architecture
```typescript
// HeadingLevel context for semantic HTML
const HeadingLevel = React.createContext<number>(1)

// Section component increments context for children
export const Section = ({ children }) => {
  const level = useContext(HeadingLevel)
  return (
    <HeadingLevel.Provider value={level + 1}>
      {children}
    </HeadingLevel.Provider>
  )
}
```

## 🎨 Design Features

- Dark theme with carefully chosen color palette
- Responsive design across all device sizes
- Custom animations and transitions
- Interactive visual elements

## 📄 License

MIT

---

**Built with attention to code quality, accessibility, and user experience.**
