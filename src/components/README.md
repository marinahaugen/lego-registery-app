# BRICKSTORE Component Library

This directory contains the LEGO-themed UI components for the BRICKSTORE application.

## Structure

```
src/components/
├── ui/                    # Base UI components
│   ├── LegoButton.tsx     # LEGO-themed button component
│   ├── LegoCard.tsx       # LEGO-themed card component
│   └── LegoHeader.tsx     # LEGO-themed header component
├── __fixtures__/          # Cosmos fixtures for component development
│   ├── LegoButton.fixture.tsx
│   ├── LegoCard.fixture.tsx
│   └── LegoHeader.fixture.tsx
└── README.md             # This file
```

## Components

### LegoButton
A LEGO-themed button component with multiple variants and sizes.

**Variants:**
- `primary` - Red background (default)
- `secondary` - Blue background
- `success` - Green background
- `warning` - Yellow background

**Sizes:**
- `small` - 36px height
- `medium` - 44px height (default)
- `large` - 56px height

**Features:**
- 3D hover effects with shadows
- Icon support (left/right positioning)
- Shimmer animation on hover
- LEGO-style borders and typography

### LegoCard
A LEGO-themed card component for displaying content.

**Variants:**
- `collection` - Blue accent, yellow background
- `set` - Red accent, yellow background
- `part` - Blue accent, beige background
- `default` - Red accent, yellow background

**Features:**
- LEGO studs pattern decoration
- Progress bars
- Stats display
- Tags support
- Action buttons
- Interactive hover effects

### LegoHeader
A LEGO-themed header component with BRICKSTORE branding.

**Features:**
- LEGO head icon
- BRICKSTORE branding
- User authentication states
- Collection statistics
- Responsive design

## Development

### Running Cosmos
To view and interact with components in isolation:

```bash
deno task cosmos
```

This will start the Cosmos development server at `http://localhost:5000`.

### Adding New Components
1. Create the component in `src/components/ui/`
2. Create fixtures in `src/components/__fixtures__/`
3. Follow the LEGO theme guidelines
4. Add proper TypeScript types
5. Include accessibility features

### LEGO Theme Guidelines
- Use strong borders (2-3px black)
- Implement 3D effects with shadows
- Use the LEGO color palette
- Include hover animations
- Follow the typography system (Fredoka One for headings, Roboto for body)

## Color Palette
- **Yellow** (#FFCA3A) - Backgrounds, highlights
- **Red** (#D62828) - Primary actions, warnings
- **Blue** (#1982C4) - Secondary actions, links
- **Black** (#000000) - Text, outlines
- **Beige** (#FAF3E0) - Input backgrounds, cards

## Accessibility
All components include:
- Proper ARIA attributes
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- WCAG AA color contrast compliance 