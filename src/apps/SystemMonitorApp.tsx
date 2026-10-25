import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Wifi, ShieldAlert, Terminal, Play, Square } from 'lucide-react';

export const SystemMonitorApp: React.FC = () => {
  const [cpuHistory, setCpuHistory] = useState<number[]>([12, 14, 18, 15, 22, 19, 28, 24, 30, 26, 35, 22]);
  const [resonanceHistory, setResonanceHistory] = useState<number[]>([98, 99, 97, 99, 98, 92, 88, 94, 99, 97, 96, 99]);
  const [events, setEvents] = useState<string[]>([
    '[02:11:04] SOMNIA-KERNEL v4.81-rel mounted root VFS',
    '[02:11:12] Sub-harmonic hydrophone array synced: 7.8340 Hz',
    '[02:11:19] Chronos Telemetry Daemon: clock drift +7692.4 hrs',
    '[02:11:28] Inbound telemetry packet on loopback port 7830',
  ]);

  // Periodic telemetry fluctuation
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCpuHistory(prev => {
        const nextVal = Math.floor(15 + Math.random() * 25);
        return [...prev.slice(1), nextVal];
      });

      setResonanceHistory(prev => {
        const nextVal = Math.floor(92 + Math.random() * 8);
        return [...prev.slice(1), nextVal];
      });

      if (Math.random() > 0.6) {
        const fakeLogs = [
          `[${new Date().toLocaleTimeString()}] Resonant pulse detected on Aleutian channel 4 (amplitude: -14dB)`,
          `[${new Date().toLocaleTimeString()}] Memory page parity check divergence at 0x7FFF004B`,
          `[${new Date().toLocaleTimeString()}] ArcaNet crawler pinged local gateway`,
          `[${new Date().toLocaleTimeString()}] Station Epsilon subsea temperature: 1.8°C (nominal)`,
        ];
        const log = fakeLogs[Math.floor(Math.random() * fakeLogs.length)];
        setEvents(prev => [...prev.slice(-12), log]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const processes = [
    { pid: 1, user: 'root', cpu: '0.1%', mem: '12 MB', name: 'somnia-init' },
    { pid: 12, user: 'daemon', cpu: '1.4%', mem: '28 MB', name: 'chronos-syncd --carrier=7.83Hz' },
    { pid: 48, user: 'telemetry', cpu: '8.2%', mem: '64 MB', name: 'aleutian-hydrophone-rx' },
    { pid: 104, user: 'kovacs', cpu: '0.0%', mem: '8 MB', name: 'null-field-probe' },
    { pid: 218, user: 'luminary-adm', cpu: '2.1%', mem: '41 MB', name: 'audit-scrubber -f /archive' },
    { pid: 509, user: 'investigator', cpu: '0.4%', mem: '15 MB', name: 'scs-shell [active]' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0d14', color: '#e2e8f0', fontFamily: 'var(--mono-font)' }}>
      {/* Top Telemetry Meters */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '12px', 
        padding: '12px', 
        borderBottom: '1px solid #1e293b' 
      }}>
        {/* CPU Activity Graph */}
        <div style={{ background: '#05070a', border: '1px solid #1e293b', padding: '10px', borderRadius: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '11px', color: '#94a3b8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Cpu size={12} style={{ color: '#38bdf8' }} /> CPU Activity (4 Cores)
            </span>
            <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{cpuHistory[cpuHistory.length - 1]}%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '48px' }}>
            {cpuHistory.map((val, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${val}%`,
                  background: '#0284c7',
                  borderRadius: '1px',
                  transition: 'height 0.4s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* 7.83 Hz Resonance Stability Graph */}
        <div style={{ background: '#05070a', border: '1px solid #1e293b', padding: '10px', borderRadius: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '11px', color: '#94a3b8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Activity size={12} style={{ color: '#22c55e' }} /> Sub-Harmonic Phase Stability (7.83 Hz)
            </span>
            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{resonanceHistory[resonanceHistory.length - 1]}%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '48px' }}>
            {resonanceHistory.map((val, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${val}%`,
                  background: val < 90 ? '#ef4444' : '#16a34a',
                  borderRadius: '1px',
                  transition: 'height 0.4s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Middle: Processes Table */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '6px' }}>
          Active Daemon & Task Processes
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #1e293b', color: '#64748b' }}>
              <th style={{ padding: '4px' }}>PID</th>
              <th style={{ padding: '4px' }}>USER</th>
              <th style={{ padding: '4px' }}>CPU</th>
              <th style={{ padding: '4px' }}>MEM</th>
              <th style={{ padding: '4px' }}>COMMAND</th>
            </tr>
          </thead>
          <tbody>
            {processes.map(p => (
              <tr key={p.pid} style={{ borderBottom: '1px solid #0f172a' }}>
                <td style={{ padding: '5px', color: '#38bdf8' }}>{p.pid}</td>
                <td style={{ padding: '5px', color: '#94a3b8' }}>{p.user}</td>
                <td style={{ padding: '5px', color: '#e2e8f0' }}>{p.cpu}</td>
                <td style={{ padding: '5px', color: '#e2e8f0' }}>{p.mem}</td>
                <td style={{ padding: '5px', color: '#a7f3d0' }}>{p.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom: Live Telemetry Event Log */}
      <div style={{ height: '110px', background: '#05070a', padding: '10px', overflowY: 'auto', fontSize: '11px', lineHeight: 1.4 }}>
        <div style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '4px' }}>
          Station Epsilon Telemetry Stream:
        </div>
        {events.map((ev, i) => (
          <div key={i} style={{ color: ev.includes('amplitude') ? '#eab308' : '#94a3b8' }}>
            {ev}
          </div>
        ))}
      </div>
    </div>
  );
};
