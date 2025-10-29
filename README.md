# TextMotion Studio

A web-based motion typography playground inspired by Typemonkey. Type a sentence, choose how it should move, and TextMotion Studio will animate every word with cinematic timing using React, Framer Motion, and Tailwind CSS.

## Features

- Animate each word with fade, slide, rotate, or zoom effects and randomized motion paths.
- Adjustable animation speed with staggered timing for sequential reveals.
- Optional background music and randomized color themes for extra flair.
- Minimal, responsive UI with a glowing hero title and control panel.
- Placeholder "Download as MP4" button ready for future exporting integrations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (bundled with npm).
- A terminal with internet access to install npm packages.

### Installation & Development Server

1. Install dependencies. If you encounter registry issues, point npm to a reachable mirror (for example `npm config set registry https://registry.npmmirror.com`).

   ```bash
   npm install
   ```

2. Start the Vite development server:

   ```bash
   npm run dev
   ```

3. Open the printed local URL (typically `http://localhost:5173`) in your browser to interact with TextMotion Studio.

## Build

```bash
npm run build
```

## License

MIT
