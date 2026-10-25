import React, { useState, useEffect } from 'react';
import { WindowState, AppId, SystemNotification } from '../types/os';
import { StateManager } from '../services/stateManager';
import { sound } from '../services/sound';
import { 
  Terminal, Globe, Mail, MessageSquare, Folder, Music, 
  Search, Calendar, Network, Activity, Settings, GitBranch, 
  Volume2, VolumeX, Bell, AlertTriangle, Monitor, Sparkles 
} from 'lucide-react';

interface TaskbarProps {
  windows: WindowState[];
  stateManager: StateManager;
  notifications: SystemNotification[];
  isStartOpen: boolean;
  onToggleStart: () => void;
  onFocusWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onOpenApp: (appId: AppId, params?: any) => void;
  onDismissNotification: (id: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  stateManager,
  notifications,
  isStartOpen,
  onToggleStart,
  onFocusWindow,
  onMinimizeWindow,
  onOpenApp,
  onDismissNotification,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showTelemetryModal, setShowTelemetryModal] = useState<boolean>(false);

  const settings = stateManager.getSettings();

  // Clock ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: !settings.clock24h 
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [settings.clock24h]);

  const handleTabClick = (win: WindowState) => {
    if (win.isFocused && !win.isMinimized) {
      onMinimizeWindow(win.id);
    } else {
      onFocusWindow(win.id);
    }
  };

  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <div className="taskbar">
      {/* Start Button */}
      <button 
        className={`bevel-button start-btn ${isStartOpen ? 'bevel-sunken' : ''}`}
        onClick={onToggleStart}
      >
        <Sparkles size={14} style={{ color: '#00f5d4' }} />
        <span>SOMNIA</span>
      </button>

      {/* Quick Launch Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '0 6px', borderRight: '1px solid var(--window-border-dark)' }}>
        <button className="bevel-button" style={{ padding: '3px 5px' }} onClick={() => onOpenApp('terminal')} title="Terminal Shell">
          <Terminal size={14} />
        </button>
        <button className="bevel-button" style={{ padding: '3px 5px' }} onClick={() => onOpenApp('browser')} title="ArcaNet Browser">
          <Globe size={14} />
        </button>
        <button className="bevel-button" style={{ padding: '3px 5px' }} onClick={() => onOpenApp('investigator')} title="Evidence Board">
          <Network size={14} />
        </button>
        <button className="bevel-button" style={{ padding: '3px 5px' }} onClick={() => onOpenApp('search')} title="Universal DeepScan">
          <Search size={14} />
        </button>
      </div>

      {/* Running Application Tabs */}
      <div className="taskbar-windows-area">
        {windows.map(win => (
          <button
            key={win.id}
            onClick={() => handleTabClick(win)}
            className={`bevel-button taskbar-tab ${win.isFocused && !win.isMinimized ? 'active' : ''}`}
            title={win.title}
          >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {win.title}
            </span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="system-tray bevel-sunken">
        {/* Telemetry / Anomaly Indicator */}
        <button 
          className="tray-icon-btn" 
          onClick={() => onOpenApp('sysmon')}
          title="Telemetry: 7.83 Hz Sub-Harmonic Carrier (Nominal)"
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Activity size={13} style={{ color: '#22c55e' }} className="pulse-glow" />
          <span style={{ fontSize: '10px' }}>7.83Hz</span>
        </button>

        {/* Audio Mute */}
        <button
          className="tray-icon-btn"
          onClick={() => {
            const next = !settings.soundEnabled;
            stateManager.updateSettings({ soundEnabled: next });
            sound.setMuted(!next);
          }}
          title={settings.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
        >
          {settings.soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} style={{ color: '#ef4444' }} />}
        </button>

        {/* Notification Bell */}
        <button
          className="tray-icon-btn"
          onClick={() => setShowNotifications(!showNotifications)}
          style={{ position: 'relative' }}
          title="Notification Center"
        >
          <Bell size={14} />
          {unreadNotifs > 0 && (
            <span style={{
              position: 'absolute',
              top: -3,
              right: -5,
              background: '#ef4444',
              color: '#ffffff',
              borderRadius: '50%',
              width: '12px',
              height: '12px',
              fontSize: '8px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {unreadNotifs}
            </span>
          )}
        </button>

        {/* Clock */}
        <div style={{ padding: '0 4px', fontWeight: 600 }}>
          {timeStr}
        </div>
      </div>

      {/* Notification Center Pop-over */}
      {showNotifications && (
        <div className="notif-popover bevel-box">
          <div className="notif-header">
            <span>System Notifications ({notifications.length})</span>
            <button className="window-control-btn bevel-button" onClick={() => setShowNotifications(false)}>✕</button>
          </div>
          <div className="notif-list">
            {notifications.length === 0 ? (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px' }}>
                No new notifications.
              </div>
            ) : (
              notifications.map(notif => (
                <div key={notif.id} className={`notif-card ${notif.type}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '11px' }}>{notif.title}</strong>
                    <span style={{ fontSize: '9px', opacity: 0.7 }}>{notif.timestamp}</span>
                  </div>
                  <div>{notif.message}</div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <button 
                      className="bevel-button" 
                      style={{ fontSize: '9px', padding: '1px 5px' }}
                      onClick={() => onDismissNotification(notif.id)}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
