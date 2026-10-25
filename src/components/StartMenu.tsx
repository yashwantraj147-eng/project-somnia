import React from 'react';
import { AppId } from '../types/os';
import { 
  Globe, Mail, MessageSquare, Folder, Terminal, Music, 
  Search, Calendar, Network, Activity, Settings, GitBranch, 
  FileText, RotateCcw, Power, Shield 
} from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: AppId) => void;
  onReboot: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onReboot,
}) => {
  if (!isOpen) return null;

  const appItems: { id: AppId; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'browser', label: 'ArcaNet Browser', icon: <Globe size={16} style={{ color: '#00f2fe' }} />, desc: 'Explore 40+ archived websites' },
    { id: 'mail', label: 'OmniMail Client', icon: <Mail size={16} style={{ color: '#22c55e' }} />, desc: 'Inspect personnel inboxes and archives' },
    { id: 'relay', label: 'SignalRelay IRC', icon: <MessageSquare size={16} style={{ color: '#a855f7' }} />, desc: 'Read internal research chat channels' },
    { id: 'explorer', label: 'Navigator Pro (Files)', icon: <Folder size={16} style={{ color: '#eab308' }} />, desc: 'Simulated Virtual File System & Trash' },
    { id: 'terminal', label: 'Somnia Command Shell', icon: <Terminal size={16} style={{ color: '#f59e0b' }} />, desc: 'Command line shell, queries, decryption' },
    { id: 'media', label: 'AetherWave Player', icon: <Music size={16} style={{ color: '#ec4899' }} />, desc: 'Synthesized soundscapes & transcripts' },
    { id: 'search', label: 'DeepScan Search', icon: <Search size={16} style={{ color: '#38bdf8' }} />, desc: 'Cross-system universal search' },
    { id: 'timeline', label: 'Chronos Timeline', icon: <Calendar size={16} style={{ color: '#f97316' }} />, desc: 'Historical events and contradictory logs' },
    { id: 'investigator', label: 'Evidence Board', icon: <Network size={16} style={{ color: '#ef4444' }} />, desc: 'Detective corkboard & hypotheses' },
    { id: 'sysmon', label: 'Telemetry & Processes', icon: <Activity size={16} style={{ color: '#10b981' }} />, desc: '7.83 Hz signal & daemon telemetry' },
    { id: 'texteditor', label: 'Notepad Editor', icon: <FileText size={16} style={{ color: '#64748b' }} />, desc: 'Create and edit documents' },
    { id: 'statemanager', label: 'Timeline Branching', icon: <GitBranch size={16} style={{ color: '#6366f1' }} />, desc: 'Save slots and timeline branching' },
    { id: 'settings', label: 'System Settings', icon: <Settings size={16} style={{ color: '#64748b' }} />, desc: 'Themes, sound, CRT scanlines' },
  ];

  return (
    <div className="start-menu bevel-box" onClick={(e) => e.stopPropagation()}>
      <div className="start-menu-sidebar">
        SOMNIA OS 4.81
      </div>
      <div className="start-menu-items">
        {appItems.map(item => (
          <div
            key={item.id}
            className="start-item"
            onClick={() => {
              onOpenApp(item.id);
              onClose();
            }}
          >
            {item.icon}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{item.label}</div>
              <div style={{ fontSize: '10px', opacity: 0.75 }}>{item.desc}</div>
            </div>
          </div>
        ))}

        <div className="start-divider" />

        <div 
          className="start-item" 
          onClick={() => {
            onReboot();
            onClose();
          }}
          style={{ color: '#ef4444', fontWeight: 600 }}
        >
          <RotateCcw size={16} />
          <span>Reboot Station Terminal</span>
        </div>
      </div>
    </div>
  );
};
