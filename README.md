# Web_MidTerm_Cinema

cinex/
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── package.json
└── src/
    ├── main.jsx             # React root mount
    ├── App.jsx              # Shamsiddin (PM) - shared state + all handlers
    ├── data/
    │   └── cinema.js        # Shamsiddin + mix - all data constants + buildGrid()
    ├── styles/
    │   └── global.css       # Shamsiddin - tokens & shared styles
    └── components/
        ├── Header.jsx            # Davronbek nav + hero + progress
        ├── Header.module.css
        ├── MoviePicker.jsx       # Og'abek — movies + showtimes (UI only)
        ├── MoviePicker.module.css
        ├── SeatMap.jsx           # Ismoil 3 — seat grid + modal (UI only)
        └── SeatMap.module.css
```
## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
http://localhost:5173

## Features

- Browse 3 currently showing films with real poster images
- Choose from 3 daily showtimes per film
- Interactive seat map with 96 seats across 8 rows
- Seat state is independent per movie + showtime slot
- Booking confirmation modal with full order summary
- Validation: max 6 seats per booking, clear error messages

## Team & Branch Structure

| `feature/header` | Davronbek | `Header.jsx`, `Header.module.css` |
| `feature/movie-picker` | Og'abek | `MoviePicker.jsx`, `MoviePicker.module.css` |
| `feature/seat-map` | Ismoil | `SeatMap.jsx`, `SeatMap.module.css` |
| `main` | PM | `App.jsx`, `cinema.js`, `global.css`, merging all branches |

## How State Works

All state lives in `App.jsx` (PM). Components receive data and callbacks as props — they do not manage state themselves. This means:

- Person 1's `Header` receives `currentStep` as a prop
- Person 2's `MoviePicker` receives selection state + handlers as props
- Person 3's `SeatMap` receives the computed seat grid + all handlers as props

The PM's `App.jsx` is the only file that imports from `cinema.js` and manages `useState`.
