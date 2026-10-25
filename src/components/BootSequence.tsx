import React, { useState, useEffect } from 'react';
import { sound } from '../services/sound';

interface BootSequenceProps {
  onBootComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onBootComplete }) => {
  const [bootLines, setBootLines] = useState<string[]>([]);

  useEffect(() => {
    try {
      sound.playBootChime();
    } catch {}

    const lines = [
      'ORPHEUS-CHRONOS BIOS v2.41 (C) 1983-1998 Orpheus Research Systems',
      'HARDWARE ID: STATION-EPSILON-ALEUTIAN-TRENCH [NODE #04]',
      'CPU: 4x Neural Resonance Core @ 7.83 MHz Fundamental',
      'MEMORY TEST: 2048 MB RAM OK (Parity Check: Quantum Stable)',
      'DETECTING VIRTUAL STORAGE UNITS...',
      '  /dev/sd0a: Aleutian Trench Bedrock Acoustic Array (Mounting /)',
      'INITIALIZING DRIVERS & CARRIER DAEMONS...',
      '  [OK] driver_piezoelectric_64ch.sys',
      '  [OK] chronos-syncd (Clock offset: +7692.4 hrs)',
      '  [OK] arcanet-loopback-gateway (40+ Fictional Sites Cached)',
      '  [OK] somnia-clue-engine (Rule-Based Matrix Armed)',
      'STATION EPSILON HARDWARE RECOVERED FROM OCTOBER 2004.',
      'INITIALIZING DESKTOP GRAPHICS SUBSYSTEM...',
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < lines.length) {
        setBootLines(prev => [...prev, lines[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(onBootComplete, 500);
      }
    }, 160);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: '#040301',
        color: '#ffb000',
        fontFamily: 'var(--mono-font)',
        fontSize: '13px',
        lineHeight: 1.5,
        padding: '32px',
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      onClick={onBootComplete}
    >
      <div>
        {bootLines.map((l, i) => (
          <div key={i} style={{ marginBottom: '2px' }}>
            {l}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#886000', fontSize: '11px' }}>
        <span>Press anywhere or ESC to bypass boot checks</span>
        <span>SOMNIA OS 4.81</span>
      </div>
    </div>
  );
};
