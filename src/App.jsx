import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ControlsPanel from './components/ControlsPanel.jsx';
import TextAnimator from './components/TextAnimator.jsx';

const titleAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const subtitleAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

const glowPulse = {
  animate: {
    textShadow: [
      '0 0 20px rgba(127, 90, 240, 0.7)',
      '0 0 40px rgba(127, 90, 240, 1)',
      '0 0 20px rgba(127, 90, 240, 0.7)',
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

const speedMultipliers = {
  slow: 1,
  normal: 0.75,
  fast: 0.55,
};

export default function App() {
  const [text, setText] = useState('');
  const [settings, setSettings] = useState({
    speed: 'normal',
    type: 'fade',
    playMusic: false,
    randomTheme: true,
  });
  const [trigger, setTrigger] = useState(0);

  const placeholder = useMemo(
    () =>
      [
        'Dream big, work hard, stay humble.',
        'Bold moves ignite brighter stories.',
        'Design. Animate. Inspire.',
        'Type your mantra, watch it move.',
      ][Math.floor(Math.random() * 4)],
    []
  );

  const handleGenerate = () => {
    if (!text.trim()) {
      return;
    }
    setTrigger((prev) => prev + 1);
  };

  const handlePreview = () => {
    setTrigger((prev) => prev + 1);
  };

  const handleDownload = () => {
    window.alert('Video export coming soon! This button is a placeholder for future MP4 downloads.');
  };

  const animationSpeedLabel = settings.speed.charAt(0).toUpperCase() + settings.speed.slice(1);

  return (
    <div className="min-h-screen w-full text-white flex flex-col items-center py-10 px-4 md:px-8">
      <div className="w-full max-w-6xl flex flex-col gap-10">
        <header className="flex flex-col items-center text-center gap-3">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold glow-text"
            variants={titleAnimation}
            initial="initial"
            animate="animate"
          >
            <motion.span variants={glowPulse} animate="animate">
              TextMotion Studio
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-white/70 max-w-2xl"
            variants={subtitleAnimation}
            initial="initial"
            animate="animate"
          >
            Craft motion typography in seconds. Animate each word with cinematic flair, experiment with styles, and bring your
            message to life.
          </motion.p>
        </header>

        <main className="flex flex-col lg:flex-row gap-8">
          <section className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-lg shadow-black/30 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label htmlFor="script" className="text-white/70 text-sm uppercase tracking-[0.2em]">
                Your Script
              </label>
              <textarea
                id="script"
                rows="5"
                value={text}
                placeholder={placeholder}
                onChange={(event) => setText(event.target.value)}
                className="w-full resize-none bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-base text-white focus:outline-none focus:border-tm-accent focus:ring-2 focus:ring-tm-accent/40"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/70">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="uppercase tracking-[0.2em] text-xs text-white/50">Words</p>
                <p className="text-2xl font-semibold text-white">{text.trim() ? text.trim().split(/\s+/).length : 0}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="uppercase tracking-[0.2em] text-xs text-white/50">Speed</p>
                <p className="text-2xl font-semibold text-white">{animationSpeedLabel}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="uppercase tracking-[0.2em] text-xs text-white/50">Stagger</p>
                <p className="text-2xl font-semibold text-white">{(speedMultipliers[settings.speed] * 0.8).toFixed(2)}s</p>
              </div>
            </div>
          </section>

          <ControlsPanel
            settings={settings}
            onChange={setSettings}
            onGenerate={handleGenerate}
            onPreview={handlePreview}
            onDownload={handleDownload}
          />
        </main>

        <TextAnimator text={text} settings={settings} trigger={trigger} />
      </div>

      <footer className="mt-12 text-center text-xs text-white/40">
        Built with React, Framer Motion, and Tailwind CSS.
      </footer>
    </div>
  );
}
