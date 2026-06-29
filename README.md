# TextMotion Studio

A browser-based motion typography playground built with React, Framer Motion,
and Tailwind CSS. Enter a sentence, choose a movement style, and preview a
staggered word-by-word animation.

## Features

- Fade, slide, rotate, and zoom presets
- Adjustable speed and staggered timing
- Randomized motion paths and colour themes
- Optional background audio
- Responsive editing and preview layout

The current MP4 control is a UI placeholder; video encoding and export are not
implemented.

## Local development

```bash
npm install
npm run dev
```

Vite prints the local development URL. To verify a production build:

```bash
npm run build
npm run preview
```

## Structure

```text
src/
├── components/ControlsPanel.jsx
├── components/TextAnimator.jsx
├── App.jsx
├── index.css
└── main.jsx
```

GitHub Actions installs the locked dependency set and verifies the Vite build
on every push and pull request.
