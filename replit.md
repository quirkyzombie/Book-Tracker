# Reading Tracker Application

## Overview

This is a full-stack reading tracker application built with React, Express, and PostgreSQL. The application allows users to manage their book collection and track reading progress through chapters with different completion statuses.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful endpoints with JSON responses
- **Session Management**: Express sessions with PostgreSQL store

### Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Centralized schema definitions in `shared/schema.ts`
- **Migration System**: Drizzle Kit for database migrations
- **Validation**: Zod schemas for runtime type validation

## Key Components

### Database Schema
Two main entities with a one-to-many relationship:

**Books Table**:
- `id` (serial, primary key)
- `title` (text, not null)
- `color` (text, default: "blue")

**Chapters Table**:
- `id` (serial, primary key)
- `title` (text, not null)
- `bookId` (integer, foreign key)
- `status` (text, default: "normal") - Values: normal, completed, difficult, reread
- `orderIndex` (integer, default: 0)

### API Endpoints
- `GET /api/books` - List all books
- `GET /api/books/:id` - Get book with chapters
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `POST /api/books/:id/chapters` - Create chapter
- `PUT /api/chapters/:id` - Update chapter status
- `DELETE /api/chapters/:id` - Delete chapter

### Storage Layer
Implements an interface-based storage system with in-memory implementation for development. The `IStorage` interface defines methods for CRUD operations on books and chapters, allowing for easy switching between storage backends.

### UI Components
- **Bookshelf View**: Grid layout displaying books as colored cards with hover effects and chapter counts
- **Chapter View**: List of chapters with status indicators, action buttons, and progress bar
- **Modals**: Enhanced add book and add chapter functionality with improved styling
- **Status Management**: Visual indicators for chapter completion states with color-coded backgrounds
- **Enhanced Animations**: Smooth transitions, hover effects, and loading states

## Progressive Web App Features

### PWA Capabilities
- **Offline Support**: Service worker caches app resources for offline functionality
- **Mobile Installation**: Can be installed on mobile devices like a native app
- **App-like Experience**: Runs in standalone mode without browser chrome
- **Cross-platform**: Works on Android, iOS, and desktop devices

### PWA Components
- **Web App Manifest**: Defines app metadata, icons, and display settings
- **Service Worker**: Handles caching and offline functionality
- **Install Prompt**: Smart installation banner for supported devices
- **App Icons**: 192x192 and 512x512 icons for various device sizes

## Data Flow

1. **Client Requests**: React components use TanStack Query hooks to fetch data
2. **API Layer**: Express routes handle HTTP requests and validate input with Zod
3. **Business Logic**: Storage layer implements business rules and data access
4. **Database**: Drizzle ORM executes type-safe SQL queries against PostgreSQL
5. **Response**: Data flows back through the same layers with proper error handling

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Type-safe CSS class variants

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast bundler for production builds

## Deployment Strategy

### Development Mode
- Frontend: Vite dev server with HMR
- Backend: tsx with auto-restart on file changes
- Database: Connected to Neon Database via DATABASE_URL

### Production Build
1. Frontend build: `vite build` creates optimized static assets
2. Backend build: `esbuild` bundles server code for Node.js
3. Static serving: Express serves frontend assets in production
4. Database: Same PostgreSQL connection via environment variables

### Environment Configuration
- `NODE_ENV`: Controls development vs production behavior
- `DATABASE_URL`: PostgreSQL connection string (required)
- Build outputs to `dist/` directory for deployment

## Changelog
- July 08, 2025. Initial setup
- July 08, 2025. Enhanced UI with improved spacing, animations, and visual polish
- July 08, 2025. Converted to Progressive Web App (PWA) with offline support and mobile installation

## User Preferences
Preferred communication style: Simple, everyday language.