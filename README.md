# Travel Copilot

**Live Demo:** [https://sderosiaux.github.io/travel-copilot/](https://sderosiaux.github.io/travel-copilot/)

Your AI-powered travel companion that helps you manage every aspect of your trips with ease.

## Overview

Travel Copilot is a comprehensive travel management application designed to be your personal assistant for all travel-related needs. It consolidates flight tracking, document management, trip planning, and real-time travel assistance into a single, intuitive interface.

## Key Features

- **Flight Management** - Track flights, view alternatives during disruptions, and get real-time status updates
- **Trip Planning** - Organize multi-destination trips with detailed timelines and itineraries
- **Document Wallet** - Store and manage passports, visas, loyalty programs, and travel insurance
- **Family Travel** - Manage travel profiles for family members with preferences and special needs
- **Airport Guide** - Detailed airport information including terminals, facilities, lounges, and navigation
- **Trip Briefings** - AI-generated pre-trip briefings with destination info, weather, and reminders
- **Packing Lists** - Smart packing suggestions based on destination and trip type
- **Currency Converter** - Real-time exchange rates for travel budgeting
- **Timezone Helper** - Track time differences across destinations
- **Emergency Info** - Quick access to embassy contacts and emergency services

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS v4 with custom design tokens
- **State Management:** Zustand
- **Language:** TypeScript
- **Deployment:** GitHub Pages (static export)

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to view the application locally.

## Project Structure

```
app/
  (main)/           # Main application routes
    flights/        # Flight tracking and alternatives
    trips/          # Trip management and timelines
    documents/      # Document wallet
    family/         # Family member profiles
    airports/       # Airport guides
    briefing/       # Trip briefings
    packing/        # Packing lists
components/
  ui/               # Reusable UI components
  features/         # Feature-specific components
lib/
  store/            # Zustand stores
  hooks/            # Custom React hooks
  services/         # Business logic
data/               # Mock data for demo
types/              # TypeScript type definitions
```

## Deployment

The application is automatically deployed to GitHub Pages on every push to the `main` branch via GitHub Actions.

## License

MIT
