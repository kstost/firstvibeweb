# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Environment Setup
- Create `.env.local` file with `GEMINI_API_KEY` for API integration
- The Gemini API key is exposed to the client via Vite's environment variable system

## Architecture Overview

This is a React + TypeScript landing page for the "firstvibe" CLI tool, built with Vite and styled with Tailwind CSS (utility classes).

### Project Structure
- `App.tsx` - Main application component that renders all landing page sections
- `index.tsx` - React application entry point
- `components/landing/` - Landing page sections (Hero, Features, How It Works, Target Audience, Final CTA, Footer)
- `components/ui/` - Reusable UI components (CliCopy, ParticleCanvas)
- `lib/utils.ts` - Utility functions including `cn()` for className merging using clsx and tailwind-merge
- `types.ts` - Global TypeScript type declarations (currently defines window.gtag)

### Key Components
- **HeroSection**: Main hero with animated particle background, features Korean text and CLI copy functionality
- **ParticleCanvas**: Canvas-based particle animation system for visual effects
- **CliCopy**: Component for copying CLI commands (`npx firstvibe`) to clipboard

### Styling Approach
- Uses Tailwind CSS utility classes extensively
- Dark theme with gray-900 background and gradient overlays
- Responsive design with mobile-first breakpoints (md:)
- Custom gradients and particle effects for visual appeal

### Build Configuration
- Vite for bundling and development
- TypeScript with React JSX support
- Path alias `@/*` maps to project root
- Environment variables are injected at build time through Vite's define option

### Dependencies
- React 19.1.1 with TypeScript
- clsx and tailwind-merge for className utilities
- Vite for build tooling