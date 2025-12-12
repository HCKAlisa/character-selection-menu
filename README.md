# Character Selection Menu

## Live Demo

**[View Live Demo](https://hckalisa.github.io/character-selection-menu/)**

## Project Structure

```
character-selection-menu/
├── public/
│   └── assets/
│       ├── Buttons/
│       ├── CharacterCards/
│       ├── Fonts/
│       ├── Icons/
│       └── Static/
├── src/
│   ├── components/
│   │   ├── CharacterCard.ts       # Individual character card component
│   │   ├── CharacterGrid.ts       # Grid container for character cards
│   │   ├── FilterButton.ts        # Category filter buttons
│   │   └── ToggleLock.ts          # Show/hide locked toggle
│   ├── shared/
│   │   ├── characters.ts          # Character data
│   │   ├── data.ts                # Filter options data
│   │   └── types.ts               # TypeScript interfaces & enums
│   ├── state/
│   │   └── AppState.ts            # Singleton state management
│   ├── styles/
│   │   ├── main.css               # Global styles & layout
│   │   ├── card.css               # Character card styles
│   │   ├── sidebar.css            # Sidebar & filter styles
│   │   └── fonts.css              # Custom font definitions
│   └── main.ts                    # Application entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HCKAlisa/character-selection-menu.git
cd character-selection-menu
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Responsive Breakpoints

- Small: `max-width: 599px`
- Medium: `600px - 904px`
- Large: `905px - 1239px`
- XLarge: `1240px - 1439px`
- Deflaut: `1440px - 2549px`
- XXLarge: `2550px+`

