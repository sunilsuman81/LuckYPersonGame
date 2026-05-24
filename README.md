# Lucky Personality 🎲

**Author:** Sunil Suman

A fun, colorful React game that reveals your lucky personality based on your gender and lucky number. Built with functional components, smooth animations, and a playful UI.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=flat&logo=css3&logoColor=white)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm

### Installation & Run

```bash
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

## How to Play

1. Click **Start** on the welcome screen
2. Select your **Gender** — Boy, Girl, or Other
3. Pick a **lucky number** from 1 to 10
4. Click **Show Result** — watch the **3D dice roll** while your fate is decided
5. Read your random personality result on an animated card
6. Click **Play Again** to start over

## Game Flow

```
Welcome → Gender + Number → Dice Rolling → Personality Result → Play Again
```

## Personality Results

The game picks a **random message** from **50+ personalities**, including:

| Type | Examples |
|------|----------|
| Positive | You are lucky 🍀 · You are brave 💪 · You are a hidden gem 💎 |
| Fun & quirky | You are a pizza lover at heart 🍕 · You are a meme lord 🤣 |
| Playful roasts | You are lazy… but efficiently lazy 😴 · You are a professional procrastinator ⏰ |

Every result has its own emoji and accent color on the result card.

## Features

### Core
- Beautiful **responsive UI** with gradients, shadows, and rounded corners
- **Gender selection** (Boy / Girl / Other)
- **Lucky number** picker (1–10)
- **Random personality** from a large message pool
- **Animated result card** with bounce effects
- **Reset** button to play again

### Animations & Effects
- **3D revolving dice** spins before the result appears (~2 seconds)
- Rolling dice counter (1–6) while the cube spins
- Smooth **fade-in**, **hover**, and **button** animations
- **Confetti** celebration when the result is revealed
- **Sound effect** (Web Audio API chime) on result
- Pulsing **Start** button glow

### Bonus
- **Dark mode toggle** (🌙 / ☀️) — top-right corner
- Gradient background with floating shapes
- Colorful emojis throughout the UI

## Project Structure

```
LuckYPersonGame/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Game logic & components
│   ├── App.css         # Styles, animations, dark mode
│   ├── index.js        # React entry point
│   └── index.css       # Global reset styles
├── package.json
└── README.md
```

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI with functional components & `useState` / `useEffect` |
| **CSS3** | Gradients, 3D dice, animations, responsive design, dark mode |
| **canvas-confetti** | Confetti burst on result |
| **Web Audio API** | Result reveal sound (no extra audio files) |
| **Create React App** | Dev server & build tooling |

## Key Components (App.js)

| Component | Role |
|-----------|------|
| `App` | Main game state & screen flow |
| `RevolvingDice` | 3D spinning dice during loading |
| `DiceFace` | Single face of the dice with dot pips |

## Screens

| Screen | Description |
|--------|-------------|
| Welcome | Title, subtitle, Start button |
| Form | Gender cards + number grid + Show Result |
| Loading | 3D dice roll + “Rolling the dice...” |
| Result | Personality card + Play Again |

## Customization

To add more personality results, edit the `PERSONALITY_MESSAGES` array in `src/App.js`:

```javascript
{ text: 'You are awesome', emoji: '⭐', color: '#f59e0b' },
```

To change how long the dice rolls before showing the result, adjust the timeout in `handleShowResult` (default: `2200` ms).

## License

This project is open source and free to use for learning and fun.

---

Made with ❤️ — **Lucky Personality Game**
