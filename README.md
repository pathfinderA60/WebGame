# WebGame — Challenge the Computer

A browser-based game platform built with React, TypeScript, Tailwind CSS, and React Native Web. Play classic board games against an AI opponent or a friend locally — no server required.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)

---

## Features

- **Landing Page** — Animated gradient background with a cursive "Challenge the Computer" title and a Get Started call-to-action.
- **Game Selection** — Choose from available games (Tic Tac Toe) with a Coming Soon section for future additions.
- **Game Mode** — Play **vs Computer** (AI) or **2 Players** (local, same device).
- **Grid Size Selector** — Pick the 3×3 classic board.
- **Tic Tac Toe**
  - Smart AI using **Minimax** algorithm (perfect play on 3×3).
  - Local 2-player mode — take turns on the same screen.
  - Win detection with highlighted winning cells.
  - Persistent scoreboard across rounds (Player X / Draw / Player O or You / Draw / AI).
  - Play Again and Change Grid options after each round.

---

## Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| **Framework**  | React 19                                         |
| **Language**   | TypeScript + JavaScript (mixed `.tsx` / `.jsx`)   |
| **Styling**    | Tailwind CSS v4 (via `@tailwindcss/vite` plugin)  |
| **Components** | React Native Web (cross-platform primitives)      |
| **Bundler**    | Vite 7                                           |
| **Linting**    | ESLint 9 with React Hooks & Refresh plugins       |
| **Deployment** | Vercel                                           |

---

## Project Structure

```
WebGame/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx  # Hero / landing screen
│   │   ├── GameSelection.tsx# Game picker + Coming Soon
│   │   ├── ModeSelector.tsx # vs Computer / 2 Players
│   │   ├── GridSelector.tsx # Board size picker
│   │   ├── TicTacToe.tsx    # Game board, AI, and logic
│   │   └── Greeting.jsx     # Sample JS component (React Native Web)
│   ├── App.tsx              # Page routing / state machine
│   ├── main.tsx             # Entry point
│   ├── index.css            # Tailwind import + global styles
│   └── App.css              # (legacy, can be removed)
├── index.html               # HTML shell (includes Google Fonts)
├── vercel.json              # Vercel deployment config
├── vite.config.ts           # Vite + Tailwind + RN Web alias
├── tsconfig.json            # TypeScript project references
├── tsconfig.app.json        # App-level TS config (allowJs)
├── tsconfig.node.json       # Node/tooling TS config
├── eslint.config.js         # ESLint flat config
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
git clone <repo-url> WebGame
cd WebGame
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` by default.

### Build

```bash
npm run build
```

Outputs production-ready files to `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Deployment (Vercel)

The project includes a `vercel.json` with SPA rewrite rules.

```bash
# First time — log in
npx vercel login

# Deploy to production
npm run deploy
```

Or connect the repo to [Vercel](https://vercel.com) for automatic deployments on push.

---

## App Flow

```
Landing Page
    │
    ▼ Get Started
Game Selection
    │
    ├──▶ Tic Tac Toe
    │       │
    │       ▼
    │   Mode Select
    │       ├──▶ vs Computer
    │       └──▶ 2 Players (local)
    │               │
    │               ▼
    │          Grid Select (3×3)
    │               │
    │               ▼
    │           Game Board
    │               ├── Play Again
    │               └── Change Grid
    │
    └──▶ Coming Soon...
```

---

## AI Details

- **3×3 board**: Full **Minimax** search — the AI plays perfectly and will never lose.
- **Larger boards** (if re-enabled): Heuristic scoring with line evaluation, center bias, and offensive weighting.

---

## Scripts Reference

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start Vite dev server             |
| `npm run build`   | Type-check + production build     |
| `npm run preview` | Serve the `dist/` build locally   |
| `npm run lint`    | Run ESLint                        |
| `npm run deploy`  | Deploy to Vercel (production)     |

---

## License

This project is private. All rights reserved.
