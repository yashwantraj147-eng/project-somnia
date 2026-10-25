import React from 'react';
import { SystemSettings, OSTheme } from '../types/os';
import { sound } from '../services/sound';
import { Settings, Volume2, Monitor, Compass, Clock, Check } from 'lucide-react';

interface SettingsAppProps {
  settings: SystemSettings;
  onUpdateSettings: (updates: Partial<SystemSettings>) => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const themes: { id: OSTheme; label: string; desc: string }[] = [
    { id: 'retro-98', label: 'Retro-98 (Enterprise)', desc: 'Classic 1998 corporate desktop with teal backdrop and beveled chrome.' },
    { id: 'amber-terminal', label: 'Amber Phosphor Terminal', desc: 'Monochrome 1980s research lab phosphor amber and dark carbon.' },
    { id: 'obsidian-cobalt', label: 'Obsidian Cobalt Telemetry', desc: 'Deep-space maritime telemetry with neon cyan accents.' },
    { id: 'polar-teal', label: 'Polar Teal (Svalbard)', desc: 'Clean daylight theme inspired by arctic polar observatories.' },
    { id: 'anomaly-breach', label: 'Anomaly Breach (Glitch)', desc: 'Experimental reality decoherence with magenta/cyan pulse.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-main)', padding: '16px', overflowY: 'auto' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <div style={{ borderBottom: '1px solid var(--window-border-dark)', paddingBottom: '10px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={20} /> System Preferences & Interface Controls
          </h2>
        </div>

        {/* Themes Section */}
        <div className="bevel-box" style={{ padding: '14px', background: 'var(--card-bg)', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Monitor size={14} /> Desktop Visual Theme
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {themes.map(t => (
              <label
                key={t.id}
                onClick={() => onUpdateSettings({ theme: t.id })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px',
                  cursor: 'pointer',
                  background: settings.theme === t.id ? 'var(--selection-bg)' : 'var(--window-bg)',
                  color: settings.theme === t.id ? 'var(--selection-text)' : 'var(--text-main)',
                  borderRadius: '3px',
                }}
                className="bevel-box"
              >
                <input
                  type="radio"
                  name="theme"
                  checked={settings.theme === t.id}
                  onChange={() => onUpdateSettings({ theme: t.id })}
                />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{t.label}</div>
                  <div style={{ fontSize: '11px', opacity: 0.85 }}>{t.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Audio Section */}
        <div className="bevel-box" style={{ padding: '14px', background: 'var(--card-bg)', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Volume2 size={14} /> Audio & Sound Synthesis
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => {
                  onUpdateSettings({ soundEnabled: e.target.checked });
                  sound.setMuted(!e.target.checked);
                }}
              />
              <span>Enable Web Audio synthesized interface sounds & mechanical clicks</span>
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>Master Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onUpdateSettings({ volume: val });
                  sound.setVolume(val);
                }}
                style={{ flex: 1 }}
              />
              <span>{Math.round(settings.volume * 100)}%</span>
            </div>

            <div>
              <button 
                className="bevel-button" 
                onClick={() => sound.playBootChime()}
                style={{ fontSize: '11px', fontWeight: 600 }}
              >
                Test Retro Soundscape Chime
              </button>
            </div>
          </div>
        </div>

        {/* Display FX Section */}
        <div className="bevel-box" style={{ padding: '14px', background: 'var(--card-bg)', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Monitor size={14} /> CRT & Visual Filter Overlays
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.scanlines}
                onChange={(e) => onUpdateSettings({ scanlines: e.target.checked })}
              />
              <span>Enable retro CRT scanline texture and phosphor glow</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.crtCurvature}
                onChange={(e) => onUpdateSettings({ crtCurvature: e.target.checked })}
              />
              <span>Simulate CRT screen curvature and vignette</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => onUpdateSettings({ reducedMotion: e.target.checked })}
              />
              <span>Reduced motion (disable glitch flicker animations)</span>
            </label>
          </div>
        </div>

        {/* Investigation Mode */}
        <div className="bevel-box" style={{ padding: '14px', background: 'var(--card-bg)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={14} /> Investigation Difficulty Mode
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px' }}>
              <input
                type="radio"
                name="hintMode"
                checked={settings.hintMode === 'detective'}
                onChange={() => onUpdateSettings({ hintMode: 'detective' })}
              />
              <span>Detective Mode (Pure exploration, no automatic hints)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px' }}>
              <input
                type="radio"
                name="hintMode"
                checked={settings.hintMode === 'guided'}
                onChange={() => onUpdateSettings({ hintMode: 'guided' })}
              />
              <span>Guided Mode (Highlights clue-bearing artifacts)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
