import PropTypes from 'prop-types';

const speedOptions = [
  { label: 'Slow', value: 'slow' },
  { label: 'Normal', value: 'normal' },
  { label: 'Fast', value: 'fast' },
];

const animationTypes = [
  { label: 'Fade', value: 'fade' },
  { label: 'Slide', value: 'slide' },
  { label: 'Rotate', value: 'rotate' },
  { label: 'Zoom', value: 'zoom' },
];

export default function ControlsPanel({
  settings,
  onChange,
  onGenerate,
  onPreview,
  onDownload,
}) {
  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    onChange({ ...settings, [field]: value });
  };

  return (
    <aside className="w-full lg:w-72 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-lg shadow-black/30">
      <h2 className="text-lg font-semibold text-white tracking-wide mb-4">Controls</h2>

      <div className="space-y-4 text-sm text-white/80">
        <div className="flex flex-col gap-2">
          <label className="uppercase tracking-[0.2em] text-xs text-white/60">Animation Speed</label>
          <select
            value={settings.speed}
            onChange={handleChange('speed')}
            className="bg-white/10 border border-white/20 rounded-full px-4 py-2 focus:outline-none focus:border-tm-accent focus:ring-2 focus:ring-tm-accent/40"
          >
            {speedOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="uppercase tracking-[0.2em] text-xs text-white/60">Animation Type</label>
          <select
            value={settings.type}
            onChange={handleChange('type')}
            className="bg-white/10 border border-white/20 rounded-full px-4 py-2 focus:outline-none focus:border-tm-accent focus:ring-2 focus:ring-tm-accent/40"
          >
            {animationTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center justify-between gap-3 text-white/70">
          <span className="uppercase tracking-[0.2em] text-xs">Background Music</span>
          <input
            type="checkbox"
            checked={settings.playMusic}
            onChange={handleChange('playMusic')}
            className="accent-tm-accent h-4 w-4"
          />
        </label>

        <label className="flex items-center justify-between gap-3 text-white/70">
          <span className="uppercase tracking-[0.2em] text-xs">Random Color Theme</span>
          <input
            type="checkbox"
            checked={settings.randomTheme}
            onChange={handleChange('randomTheme')}
            className="accent-tm-accent h-4 w-4"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={onGenerate}
          className="bg-gradient-to-r from-tm-accent to-indigo-500 text-white font-semibold rounded-full py-3 px-4 shadow-glow hover:opacity-90 transition"
        >
          Generate Animation
        </button>
        <button
          onClick={onPreview}
          className="border border-white/20 text-white font-semibold rounded-full py-3 px-4 hover:border-tm-accent/80 hover:text-tm-accent transition"
        >
          Preview
        </button>
        <button
          onClick={onDownload}
          className="border border-dashed border-white/30 text-white/70 font-semibold rounded-full py-3 px-4 hover:text-white transition"
        >
          Download as MP4
        </button>
      </div>
    </aside>
  );
}

ControlsPanel.propTypes = {
  settings: PropTypes.shape({
    speed: PropTypes.oneOf(['slow', 'normal', 'fast']).isRequired,
    type: PropTypes.oneOf(['fade', 'slide', 'rotate', 'zoom']).isRequired,
    playMusic: PropTypes.bool.isRequired,
    randomTheme: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onGenerate: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};
