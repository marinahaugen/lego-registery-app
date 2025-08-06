# LEGO Collection Registry

A modern web application for tracking and managing your LEGO sets. Built with React, TypeScript, Material-UI, and Supabase.

## Features

- **Dynamic Form**: Add LEGO sets with type-specific details (Plants, Vehicles, Buildings)
- **Real-time Database**: Store data in Supabase with proper validation
- **Modern UI**: Material-UI interface with responsive design
- **Type Safety**: Full TypeScript support with Zod validation
- **Testing**: Comprehensive test suite with React Testing Library

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Framework**: Material-UI (MUI) v6
- **Database**: Supabase (PostgreSQL)
- **Validation**: Zod
- **Testing**: Vitest, React Testing Library
- **Runtime**: Deno

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) installed
- Supabase account and project

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LEGO-registery-app
   ```

2. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration: `20250804092236_create_lego_sets_table.sql`
   - Get your project URL and anon key from the Supabase dashboard

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Install dependencies and start development server**
   ```bash
   deno task dev
   ```

5. **Run tests**
   ```bash
   deno task test
   ```

## Database Schema

The application uses a flexible schema with a base table and JSONB details:

```sql
CREATE TABLE lego_sets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  set_number VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  piece_count INTEGER NOT NULL CHECK (piece_count > 0),
  age_group VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  has_built BOOLEAN DEFAULT true,
  type lego_set_type NOT NULL,
  details JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### LEGO Set Types

#### Plants
- `plantType`: rose, sunflower, orchid, cactus
- `height`: positive number (cm)
- `vaseIncluded`: boolean

#### Vehicles
- `vehicleType`: car, boat, plane, train
- `brand`: optional string
- `model`: optional string

#### Buildings
- `buildingType`: residential, historical, fantasy
- `floors`: positive number
- `furnished`: boolean

## Project Structure

```
src/
├── features/
│   └── collection/
│       ├── components/
│       │   ├── LegoSetForm.tsx
│       │   └── LegoSetForm.test.tsx
│       ├── services/
│       │   └── legoSetService.ts
│       └── types.ts
├── lib/
│   └── supabaseClient.ts
├── App.tsx
└── main.tsx

supabase/
└── migrations/
    └── 001_create_lego_sets_table.sql
```

## Development

### Available Scripts

- `deno task dev` - Start development server
- `deno task build` - Build for production
- `deno task preview` - Preview production build
- `deno task test` - Run tests
- `deno task test:ui` - Run tests with UI

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write comprehensive tests
- Use Material-UI components consistently

## Testing

The application includes comprehensive tests for:

- Form rendering and validation
- Dynamic field changes based on type selection
- Form submission and error handling
- Loading states and user interactions

Run tests with:
```bash
deno task test
```
