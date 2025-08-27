# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"코깎노바나나" is a React/TypeScript web application that uses Google's Gemini AI to generate and modify images based on user prompts and input images. The app allows users to upload images, provide text prompts, and generate new images using the Gemini 2.5 Flash Image Preview model.

## Common Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Install dependencies**: `npm install`

## Environment Setup

The application requires a Gemini API key to function:
- Set `GEMINI_API_KEY` in `.env.local` file
- Users can obtain API keys from: https://aistudio.google.com/apikey
- The API key is also configurable through the UI and stored in localStorage

## Architecture

### Core Structure

- **React 19 + TypeScript**: Modern React with latest features
- **Vite**: Build tool with HMR and optimized bundling
- **Component-based architecture**: Modular UI components in `/components/`
- **Service layer**: Business logic separated into `/services/`
- **Custom hooks**: Reusable logic in `/hooks/`

### Key Components

- `App.tsx` - Main application component with state management
- `ImageUploader.tsx` - Handles multiple image upload (1-10 images)
- `PromptInput.tsx` - Text input for generation prompts
- `ResultDisplay.tsx` - Shows generated images
- `GalleryModal.tsx` - Displays saved images from IndexedDB
- `ApiKeyInput.tsx` - Secure API key input component

### Services

- **geminiService.ts**: Integrates with Google Gemini AI API for image generation
- **dbService.ts**: IndexedDB wrapper for storing generated images locally
- **imageUtils.ts**: Image processing utilities (base64 conversion, etc.)

### State Management

- React hooks for local state
- localStorage for API key persistence  
- IndexedDB for generated image persistence
- No external state management library used

### API Integration

- Uses `@google/genai` library for Gemini API calls
- Model: `gemini-2.5-flash-image-preview`
- Supports multimodal input (text + images)
- Error handling with Korean user messages

### Image Constraints

- Accepts JPEG, PNG, WebP formats
- 1-10 images per generation request
- Base64 encoding for API transmission
- Automatic memory management for blob URLs

### Build Configuration

- Vite config includes environment variable injection
- Build output: `build/` directory
- Asset optimization with hashed filenames
- Path aliases: `@/*` maps to project root

### Database Schema

IndexedDB store `generated_images`:
- `id` (auto-increment primary key)
- `base64` (image data)
- `mimeType` (image format)
- `prompt` (generation prompt)
- `createdAt` (timestamp)

## UI/UX Notes

- Dark theme with gray color scheme
- Responsive design (mobile-friendly)
- Korean language interface
- Loading states with spinners
- Error handling with user-friendly messages
- Image gallery for viewing/reloading previous generations