import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';

const easingCurves = {
  slow: [0.16, 1, 0.3, 1],
  normal: [0.16, 1, 0.3, 1],
  fast: [0.16, 1, 0.3, 1],
};

const speedDurations = {
  slow: 1.4,
  normal: 1,
  fast: 0.7,
};

const delayMap = {
  slow: 0.5,
  normal: 0.35,
  fast: 0.25,
};

const themes = [
  ['#7f5af0', '#2cb67d', '#ff8906'],
  ['#f38ba0', '#c1fba4', '#80ed99'],
  ['#cba6f7', '#f5c2e7', '#f38ba8'],
  ['#00f5d4', '#00bbf9', '#fee440'],
];

function createWordConfig(word, index, type, randomTheme) {
  const randomOffset = () => (Math.random() - 0.5) * 160;
  const theme = randomTheme ? themes[Math.floor(Math.random() * themes.length)] : null;

  return {
    id: `${word}-${index}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    word,
    offsetX: randomOffset(),
    offsetY: randomOffset(),
    rotation: (Math.random() - 0.5) * 90,
    scale: 0.6 + Math.random() * 0.9,
    color: theme ? theme[Math.floor(Math.random() * theme.length)] : 'white',
    type,
  };
}

function getAnimation(wordConfig) {
  const { offsetX, offsetY, rotation, scale, type } = wordConfig;

  switch (type) {
    case 'slide':
      return {
        initial: { opacity: 0, x: offsetX, y: offsetY },
        animate: { opacity: [0, 1, 0], x: [offsetX, 0, 0], y: [offsetY, 0, 0], scale: [1, 1.05, 0.95] },
      };
    case 'rotate':
      return {
        initial: { opacity: 0, rotate: rotation, scale: 0.5 },
        animate: { opacity: [0, 1, 0], rotate: [rotation, 0, 15], scale: [0.5, 1, 1.2] },
      };
    case 'zoom':
      return {
        initial: { opacity: 0, scale: 0.2 },
        animate: { opacity: [0, 1, 0], scale: [0.2, scale, 0.6] },
      };
    default:
      return {
        initial: { opacity: 0, x: offsetX * 0.2, y: offsetY * 0.2 },
        animate: { opacity: [0, 1, 0], x: [offsetX * 0.2, 0, 0], y: [offsetY * 0.2, 0, 0], scale: [0.9, 1.1, 0.8] },
      };
  }
}

export default function TextAnimator({
  text,
  settings,
  trigger,
}) {
  const words = useMemo(() =>
    text
      .trim()
      .split(/\s+/)
      .filter(Boolean),
  [text]);

  const [wordConfigs, setWordConfigs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!words.length) {
      setWordConfigs([]);
      setActiveIndex(-1);
      return;
    }

    const configs = words.map((word, index) => createWordConfig(word, index, settings.type, settings.randomTheme));
    setWordConfigs(configs);
    setActiveIndex(0);
  }, [trigger, words, settings.type, settings.randomTheme]);

  useEffect(() => {
    if (!settings.playMusic) {
      audioRef.current?.pause();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2023/09/04/audio_bed972b4d7.mp3?filename=ambient-piano-170136.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }

    audioRef.current.play().catch(() => {
      // Ignore autoplay rejection
    });

    return () => {
      audioRef.current?.pause();
    };
  }, [settings.playMusic, trigger]);

  useEffect(() => {
    if (activeIndex === -1 || activeIndex >= wordConfigs.length) {
      return;
    }

    const delay = delayMap[settings.speed] * 1000;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => {
        if (prev >= wordConfigs.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [activeIndex, wordConfigs.length, settings.speed, trigger]);

  const totalDuration = speedDurations[settings.speed];
  const ease = easingCurves[settings.speed];

  return (
    <div className="relative flex-1 h-[55vh] md:h-[60vh] lg:h-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-lg shadow-inner shadow-black/50">
      <div className="absolute inset-0 bg-grid-pattern bg-[length:20px_20px] opacity-20 pointer-events-none" aria-hidden />
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {wordConfigs.slice(0, activeIndex + 1).map((config, index) => {
            if (index > activeIndex) return null;
            const { initial, animate } = getAnimation(config);
            return (
              <motion.span
                key={`${config.id}-${trigger}-${index}`}
                initial={initial}
                animate={animate}
                exit={{ opacity: 0 }}
                transition={{
                  duration: totalDuration,
                  ease,
                  delay: index * delayMap[settings.speed],
                }}
                className="absolute text-4xl md:text-5xl font-semibold tracking-wide"
                style={{ color: config.color }}
              >
                {config.word}
              </motion.span>
            );
          })}
        </AnimatePresence>
        {!words.length && (
          <p className="text-white/40 text-center max-w-md leading-relaxed">
            Enter a sentence above and tap <span className="text-white">Generate Animation</span> to bring your words to life.
          </p>
        )}
      </div>
    </div>
  );
}

TextAnimator.propTypes = {
  text: PropTypes.string.isRequired,
  settings: PropTypes.shape({
    speed: PropTypes.oneOf(['slow', 'normal', 'fast']).isRequired,
    type: PropTypes.oneOf(['fade', 'slide', 'rotate', 'zoom']).isRequired,
    playMusic: PropTypes.bool.isRequired,
    randomTheme: PropTypes.bool.isRequired,
  }).isRequired,
  trigger: PropTypes.number.isRequired,
};
