# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based landing page for "firstvibe" (바이브코딩의 첫 시작), a tool that helps expand single-sentence ideas into MVP foundations. The project is built with Vite, TypeScript, and uses Tailwind CSS for styling.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build` 
- **Preview production build**: `npm run preview`
- **Install dependencies**: `npm install`

## Environment Setup

The app requires a `GEMINI_API_KEY` environment variable set in `.env.local` for the Gemini API integration. The Vite config exposes this as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY`.

## Architecture

### Component Structure
- **App.tsx**: Main application component that renders all landing page sections sequentially
- **components/landing/**: Contains all main landing page sections (Hero, HowItWorks, Features, TargetAudience, FinalCta, Footer)
- **components/ui/**: Reusable UI components (CliCopy for command copying, ParticleCanvas for visual effects)
- **lib/utils.ts**: Utility functions including `cn()` for className merging using clsx and tailwind-merge

### Styling
- Uses Tailwind CSS with custom gradient backgrounds and particle effects
- Dark theme with gray-900 base and gradient overlays
- Korean text content for the target audience
- Custom particle canvas background effect

### Key Features
- CLI command copy functionality (`npx firstvibe`)
- Particle background animations
- Gradient-based visual design
- Responsive layout with mobile-first approach

## Technical Notes

- Uses React 19 and TypeScript 5.8
- Vite bundler with path alias `@` pointing to project root
- Global type declarations for `window.gtag` (Google Analytics)
- No testing framework currently configured
- No linting or formatting tools configured