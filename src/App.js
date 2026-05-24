import { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

// Personality messages pool
const PERSONALITY_MESSAGES = [
  { text: 'You are lucky', emoji: '🍀', color: '#22c55e' },
  { text: 'You are smart', emoji: '😎', color: '#3b82f6' },
  { text: 'You are brave', emoji: '💪', color: '#ef4444' },
  { text: 'You are funny', emoji: '😂', color: '#f59e0b' },
  { text: 'You are greedy', emoji: '💰', color: '#eab308' },
  { text: 'You are intelligent', emoji: '🧠', color: '#8b5cf6' },
  { text: 'You are kind', emoji: '❤️', color: '#ec4899' },
  { text: 'You are creative', emoji: '🎨', color: '#06b6d4' },
  { text: 'You are adventurous', emoji: '🚀', color: '#f97316' },
  { text: 'You are peaceful', emoji: '☮️', color: '#14b8a6' },
  { text: 'You are a born leader', emoji: '👑', color: '#a855f7' },
  { text: 'You are mysteriously charming', emoji: '🕵️', color: '#6366f1' },
  { text: 'You are a pizza lover at heart', emoji: '🍕', color: '#dc2626' },
  { text: 'You are secretly a superhero', emoji: '🦸', color: '#2563eb' },
  { text: 'You are a dancing machine', emoji: '💃', color: '#db2777' },
  { text: 'You are full of positive vibes', emoji: '✨', color: '#fbbf24' },
  { text: 'You are a night owl genius', emoji: '🦉', color: '#4f46e5' },
  { text: 'You are unstoppable', emoji: '🔥', color: '#ea580c' },
  { text: 'You are a dream chaser', emoji: '🌙', color: '#7c3aed' },
  { text: 'You are a snack — everyone loves you', emoji: '🧁', color: '#f472b6' },
  { text: 'You are wildly imaginative', emoji: '🦄', color: '#c026d3' },
  { text: 'You are a chill legend', emoji: '😌', color: '#0d9488' },
  { text: 'You are a problem solver', emoji: '🧩', color: '#0891b2' },
  { text: 'You are a social butterfly', emoji: '🦋', color: '#e879f9' },
  { text: 'You are a hidden gem', emoji: '💎', color: '#06b6d4' },
  { text: 'You are a meme lord', emoji: '🤣', color: '#84cc16' },
  { text: 'You are a coffee-powered wizard', emoji: '☕', color: '#92400e' },
  { text: 'You are a future millionaire', emoji: '🤑', color: '#16a34a' },
  { text: 'You are a heart stealer', emoji: '💘', color: '#f43f5e' },
  { text: 'You are a chaos coordinator (in a good way)', emoji: '🎪', color: '#d946ef' },
  // Funny "negative" results (playful roasts)
  { text: 'You are lazy… but efficiently lazy', emoji: '😴', color: '#64748b' },
  { text: 'You are a professional procrastinator', emoji: '⏰', color: '#78716c' },
  { text: 'You are forgetful — where did I put that thought?', emoji: '🤔', color: '#94a3b8' },
  { text: 'You are dramatic… Oscar-worthy levels', emoji: '🎭', color: '#be185d' },
  { text: 'You are stubborn like a cute mule', emoji: '🫏', color: '#a16207' },
  { text: 'You are a certified overthinker', emoji: '🌀', color: '#475569' },
  { text: 'You are clumsy — gravity is your best friend', emoji: '🤕', color: '#ef4444' },
  { text: 'You are a snack thief (guilty!)', emoji: '🍿', color: '#b45309' },
  { text: 'You are addicted to your phone', emoji: '📱', color: '#1e293b' },
  { text: 'You are a serial snoozer', emoji: '😪', color: '#6366f1' },
  { text: 'You are too honest — filters not included', emoji: '🙊', color: '#f97316' },
  { text: 'You are a moody weather forecast', emoji: '🌧️', color: '#0284c7' },
  { text: 'You are impatient — even microwaves are slow', emoji: '⚡', color: '#eab308' },
  { text: 'You are a drama magnet (it finds you)', emoji: '🧲', color: '#7e22ce' },
  { text: 'You are a picky eater — pizza still wins', emoji: '🙅', color: '#dc2626' },
  { text: 'You are a chronic over-sharer', emoji: '📢', color: '#0ea5e9' },
  { text: 'You are jealous… but only of people with snacks', emoji: '👀', color: '#ca8a04' },
  { text: 'You are a messy genius (emphasis on messy)', emoji: '🧹', color: '#57534e' },
  { text: 'You are sarcastic — it\'s a lifestyle', emoji: '😏', color: '#334155' },
  { text: 'You are a control freak… of the TV remote', emoji: '📺', color: '#1d4ed8' },
];

const GENDERS = [
  { id: 'boy', label: 'Boy', emoji: '👦' },
  { id: 'girl', label: 'Girl', emoji: '👧' },
  { id: 'other', label: 'Other', emoji: '🌈' },
];

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Screens: welcome -> form -> loading -> result
const SCREEN = {
  WELCOME: 'welcome',
  FORM: 'form',
  LOADING: 'loading',
  RESULT: 'result',
};

// Dice pip positions on a 3×3 grid (cells 1–9)
const PIP_MAP = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

function DiceFace({ value, faceClass }) {
  const activePips = PIP_MAP[value];
  return (
    <div className={`dice-face ${faceClass}`}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell) => (
        <span
          key={cell}
          className={`pip ${activePips.includes(cell) ? 'pip-on' : ''}`}
        />
      ))}
    </div>
  );
}

function RevolvingDice() {
  const [rollingNum, setRollingNum] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setRollingNum(Math.floor(Math.random() * 6) + 1);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dice-roller">
      <div className="dice-scene">
        <div className="dice-cube">
          <DiceFace value={1} faceClass="face-front" />
          <DiceFace value={6} faceClass="face-back" />
          <DiceFace value={3} faceClass="face-right" />
          <DiceFace value={4} faceClass="face-left" />
          <DiceFace value={2} faceClass="face-top" />
          <DiceFace value={5} faceClass="face-bottom" />
        </div>
      </div>
      <p className="dice-counter">🎲 {rollingNum}</p>
    </div>
  );
}

function playResultSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const start = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.15, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + 0.25);
      osc.start(start);
      osc.stop(start + 0.25);
    });
  } catch {
    // Audio not supported — silently ignore
  }
}

function fireConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#8b5cf6'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#8b5cf6'],
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#8b5cf6'],
  });
}

function App() {
  const [screen, setScreen] = useState(SCREEN.WELCOME);
  const [gender, setGender] = useState('');
  const [luckyNumber, setLuckyNumber] = useState(null);
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleStart = () => setScreen(SCREEN.FORM);

  const handleShowResult = useCallback(() => {
    if (!gender || luckyNumber === null) return;

    setScreen(SCREEN.LOADING);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * PERSONALITY_MESSAGES.length);
      const picked = PERSONALITY_MESSAGES[randomIndex];
      setResult(picked);
      setScreen(SCREEN.RESULT);
      playResultSound();
      fireConfetti();
    }, 2200);
  }, [gender, luckyNumber]);

  const handleReset = () => {
    setScreen(SCREEN.WELCOME);
    setGender('');
    setLuckyNumber(null);
    setResult(null);
  };

  const canShowResult = gender && luckyNumber !== null;

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setDarkMode((d) => !d)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className="background-shapes">
        <span className="shape shape-1" />
        <span className="shape shape-2" />
        <span className="shape shape-3" />
      </div>

      <main className="container">
        {/* Welcome Screen */}
        {screen === SCREEN.WELCOME && (
          <section className="screen welcome-screen fade-in">
            <div className="logo">🎲</div>
            <h1 className="title">Lucky Personality</h1>
            <p className="subtitle">
              Discover what your lucky number says about you!
            </p>
            <button type="button" className="btn btn-primary btn-glow" onClick={handleStart}>
              Start ✨
            </button>
          </section>
        )}

        {/* Form Screen */}
        {screen === SCREEN.FORM && (
          <section className="screen form-screen fade-in">
            <h2 className="section-title">Tell us about you 🌟</h2>

            <div className="form-group">
              <label className="label">Select Gender</label>
              <div className="gender-options">
                {GENDERS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className={`option-card ${gender === g.id ? 'selected' : ''}`}
                    onClick={() => setGender(g.id)}
                  >
                    <span className="option-emoji">{g.emoji}</span>
                    <span className="option-label">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="label">Pick your lucky number (1–10)</label>
              <div className="number-grid">
                {NUMBERS.map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`number-btn ${luckyNumber === num ? 'selected' : ''}`}
                    onClick={() => setLuckyNumber(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShowResult}
              disabled={!canShowResult}
            >
              Show Result 🎯
            </button>
          </section>
        )}

        {/* Loading Screen — revolving dice */}
        {screen === SCREEN.LOADING && (
          <section className="screen loading-screen fade-in">
            <RevolvingDice />
            <p className="loading-text">Rolling the dice...</p>
            <p className="loading-hint">✨ Your personality is on its way ✨</p>
          </section>
        )}

        {/* Result Screen */}
        {screen === SCREEN.RESULT && result && (
          <section className="screen result-screen fade-in">
            <div
              className="result-card pop-in"
              style={{ '--accent': result.color }}
            >
              <div className="result-emoji bounce">{result.emoji}</div>
              <h2 className="result-text">{result.text}</h2>
              <p className="result-meta">
                {GENDERS.find((g) => g.id === gender)?.emoji}{' '}
                Number <strong>{luckyNumber}</strong> was your choice!
              </p>
            </div>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Play Again 🔄
            </button>
          </section>
        )}
      </main>

      <footer className="footer">Made with ❤️ — Lucky Personality Game</footer>
    </div>
  );
}

export default App;
