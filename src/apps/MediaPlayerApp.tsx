import React, { useState, useEffect, useRef } from 'react';
import { AudioTrack } from '../types/media';
import { sound } from '../services/sound';
import { 
  Play, Pause, Square, SkipBack, SkipForward, Volume2, 
  VolumeX, Disc, Radio, AlertCircle 
} from 'lucide-react';

interface MediaPlayerAppProps {
  tracks: AudioTrack[];
  initialTrackId?: string;
  onTrackListened?: (trackId: string) => void;
  onClueTrigger?: (clueId: string) => void;
}

export const MediaPlayerApp: React.FC<MediaPlayerAppProps> = ({
  tracks,
  initialTrackId,
  onTrackListened,
  onClueTrigger,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (initialTrackId) {
      const idx = tracks.findIndex(t => t.id === initialTrackId);
      if (idx !== -1) setCurrentTrackIndex(idx);
    }
  }, [initialTrackId, tracks]);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Playback timer loop
  useEffect(() => {
    let timer: number | null = null;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setCurrentTime(t => {
          if (t >= currentTrack.durationSeconds) {
            handleNext();
            return 0;
          }
          const nextTime = t + 1;
          // Check if any transcript line at this timestamp has a clue
          const currentSegment = currentTrack.transcripts.find(tr => Math.floor(tr.timeSeconds) === nextTime);
          if (currentSegment?.clueId && onClueTrigger) {
            onClueTrigger(currentSegment.clueId);
          }
          return nextTime;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentTrack]);

  const handlePlay = () => {
    setIsPlaying(true);
    sound.playTrackPreset(currentTrack.synthPreset, (freqData) => {
      drawVisualizer(freqData);
    });
    if (onTrackListened) {
      onTrackListened(currentTrack.id);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    sound.stopTrack();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    sound.stopTrack();
  };

  const handlePrev = () => {
    handleStop();
    setCurrentTrackIndex(idx => (idx > 0 ? idx - 1 : tracks.length - 1));
  };

  const handleNext = () => {
    handleStop();
    setCurrentTrackIndex(idx => (idx < tracks.length - 1 ? idx + 1 : 0));
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    sound.setVolume(newVol);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    sound.setMuted(!isMuted);
  };

  const drawVisualizer = (data: Uint8Array) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / data.length) * 1.5;
    let x = 0;

    for (let i = 0; i < data.length; i++) {
      const barHeight = (data[i] / 255) * canvas.height;
      ctx.fillStyle = currentTrack.waveformColor || '#00f2fe';
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
      x += barWidth;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0e17', color: '#e2e8f0' }}>
      {/* Visualizer Display Box */}
      <div style={{ 
        height: '140px', 
        background: '#04070d', 
        borderBottom: '2px solid #1e293b', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        padding: '12px'
      }}>
        <canvas ref={canvasRef} width={400} height={100} style={{ width: '100%', height: '100%' }} />

        <div style={{ position: 'absolute', top: 8, left: 12, fontSize: '11px', fontFamily: 'var(--mono-font)', color: '#64748b' }}>
          <div>PRESET: {currentTrack.synthPreset.toUpperCase()}</div>
          <div>FREQ: 7.834 Hz CARRIER LOCKED</div>
        </div>

        <div style={{ position: 'absolute', top: 8, right: 12, fontSize: '11px', fontFamily: 'var(--mono-font)', color: isPlaying ? '#22c55e' : '#64748b' }}>
          {isPlaying ? '● AUDIO CARRIER ACTIVE' : '○ IDLE'}
        </div>
      </div>

      {/* Track Info & Scrubber */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e293b', background: '#0f172a' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '2px' }}>
          {currentTrack.title}
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
          {currentTrack.artist} • {currentTrack.album} ({currentTrack.year})
        </div>

        {/* Time Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--mono-font)' }}>
          <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
          <div style={{ flex: 1, height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${(currentTime / currentTrack.durationSeconds) * 100}%`, 
                height: '100%', 
                background: currentTrack.waveformColor || '#38bdf8',
                transition: 'width 0.2s linear' 
              }} 
            />
          </div>
          <span>{Math.floor(currentTrack.durationSeconds / 60)}:{(currentTrack.durationSeconds % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Control Buttons Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '8px 16px', 
        background: 'var(--window-bg)', 
        borderBottom: '1px solid var(--window-border-dark)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button className="bevel-button" onClick={handlePrev} title="Previous">
            <SkipBack size={14} />
          </button>
          {isPlaying ? (
            <button className="bevel-button" onClick={handlePause} title="Pause">
              <Pause size={14} /> Pause
            </button>
          ) : (
            <button className="bevel-button" onClick={handlePlay} style={{ fontWeight: 'bold' }} title="Play">
              <Play size={14} /> Play
            </button>
          )}
          <button className="bevel-button" onClick={handleStop} title="Stop">
            <Square size={14} />
          </button>
          <button className="bevel-button" onClick={handleNext} title="Next">
            <SkipForward size={14} />
          </button>
        </div>

        {/* Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button className="bevel-button" onClick={handleToggleMute}>
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            style={{ width: '80px' }}
          />
        </div>
      </div>

      {/* 2-Column: Track List Left + Synchronized Transcript Right */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Track Playlist */}
        <div style={{ width: '220px', borderRight: '1px solid #1e293b', background: '#090d16', overflowY: 'auto' }}>
          <div style={{ padding: '8px', fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>
            Archived Audio Tapes
          </div>
          {tracks.map((t, idx) => (
            <div
              key={t.id}
              onClick={() => {
                handleStop();
                setCurrentTrackIndex(idx);
              }}
              style={{
                padding: '8px 10px',
                fontSize: '11px',
                cursor: 'pointer',
                background: currentTrackIndex === idx ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                borderLeft: currentTrackIndex === idx ? '3px solid #38bdf8' : '3px solid transparent',
                color: currentTrackIndex === idx ? '#38bdf8' : '#cbd5e1',
              }}
            >
              <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {t.title}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>
                {Math.floor(t.durationSeconds / 60)}:{(t.durationSeconds % 60).toString().padStart(2, '0')} • {t.category}
              </div>
            </div>
          ))}
        </div>

        {/* Live Synchronized Transcript */}
        <div style={{ flex: 1, background: '#0c1220', overflowY: 'auto', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '12px' }}>
            Declassified Audio Transcript (Station Epsilon Sync)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentTrack.transcripts.map((seg, i) => {
              const isActive = currentTime >= seg.timeSeconds && (i === currentTrack.transcripts.length - 1 || currentTime < currentTrack.transcripts[i + 1].timeSeconds);
              return (
                <div
                  key={i}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    borderLeft: isActive ? '3px solid #38bdf8' : '3px solid transparent',
                    color: isActive ? '#ffffff' : '#94a3b8',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', fontSize: '10px', fontFamily: 'var(--mono-font)', color: isActive ? '#38bdf8' : '#64748b' }}>
                    <span>[{Math.floor(seg.timeSeconds / 60)}:{(seg.timeSeconds % 60).toString().padStart(2, '0')}]</span>
                    <strong>{seg.speaker}</strong>
                    {seg.isImportant && <span style={{ color: '#eab308' }}>★ KEY EVIDENCE</span>}
                  </div>
                  <div>{seg.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
