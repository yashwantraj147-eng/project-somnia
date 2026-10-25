import React, { useState, useEffect, useRef } from 'react';
import { StateManager } from './services/stateManager';
import { VirtualFileSystem } from './services/vfs';
import { ClueEngine } from './services/clueEngine';
import { sound } from './services/sound';
import { WindowState, AppId, UserProfile, SystemNotification } from './types/os';
import { BootSequence } from './components/BootSequence';
import { LoginScreen } from './components/LoginScreen';
import { WindowManager } from './components/WindowManager';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { 
  Globe, Mail, MessageSquare, Folder, Terminal, Music, 
  Search, Calendar, Network, Activity, Settings, GitBranch, 
  Trash2, FileText, Sparkles, ShieldAlert 
} from 'lucide-react';

export const App: React.FC = () => {
  // Initialize persistent singletons
  const stateManagerRef = useRef<StateManager>(new StateManager());
  const vfsRef = useRef<VirtualFileSystem>(new VirtualFileSystem(stateManagerRef.current.getActiveBranch().vfs));

  // Boot & Login States
  const [bootState, setBootState] = useState<'booting' | 'login' | 'desktop'>('booting');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // UI state
  const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });
  const [nextZIndex, setNextZIndex] = useState<number>(100);

  // Clue Engine with notification callback
  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    return stateManagerRef.current.getSaveData().notifications || [];
  });

  const clueEngineRef = useRef<ClueEngine>(
    new ClueEngine(stateManagerRef.current.getActiveBranch().clues, (evt) => {
      if (evt.newlyDiscovered) {
        const notif: SystemNotification = {
          id: `notif_${Date.now()}`,
          title: `Clue Discovered: [${evt.clue.code}]`,
          message: evt.clue.title,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'clue',
          read: false,
        };
        setNotifications(prev => [notif, ...prev]);
        // Also unlock any connected mail account if specified
        if (evt.clue.id === 'CLUE-LUM-01') {
          const acc = stateManagerRef.current.getActiveBranch().mailAccounts.find(a => a.id === 'acc_sterling');
          if (acc) acc.isUnlocked = true;
        }
        if (evt.clue.id === 'CLUE-WEB-SOMNIA-TRUTH') {
          const acc = stateManagerRef.current.getActiveBranch().mailAccounts.find(a => a.id === 'acc_nullpointer');
          if (acc) acc.isUnlocked = true;
        }
      }
    })
  );

  // Windows State
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'win_explorer_init',
      appId: 'explorer',
      title: 'Navigator Pro - /users/investigator',
      icon: 'folder',
      x: 60,
      y: 40,
      width: 760,
      height: 480,
      minWidth: 480,
      minHeight: 320,
      isMinimized: false,
      isMaximized: false,
      zIndex: 101,
      isFocused: true,
      initialParams: { selectedPath: '/users/investigator' },
    },
    {
      id: 'win_browser_init',
      appId: 'browser',
      title: 'ArcaNet Browser - Orpheus Institute',
      icon: 'globe',
      x: 160,
      y: 90,
      width: 820,
      height: 520,
      minWidth: 500,
      minHeight: 350,
      isMinimized: false,
      isMaximized: false,
      zIndex: 102,
      isFocused: false,
      initialParams: { url: 'orpheus.org' },
    },
  ]);

  const settings = stateManagerRef.current.getSettings();

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsStartOpen(false);
        setContextMenu(c => ({ ...c, show: false }));
      }
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        openApp('terminal');
      }
      if (e.altKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        openApp('browser');
      }
      if (e.altKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        openApp('explorer');
      }
      if (e.altKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        openApp('investigator');
      }
      if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault();
        openApp('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [windows, nextZIndex]);

  // Close context menu on outside click
  const handleDesktopClick = () => {
    setIsStartOpen(false);
    setSelectedDesktopIcon(null);
    setContextMenu(c => ({ ...c, show: false }));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      show: true,
    });
  };

  const openApp = (appId: AppId | string, params?: any) => {
    const validAppId = appId as AppId;
    sound.playWindowOpen();
    setIsStartOpen(false);

    // If an instance is already open and minimized, restore and focus it
    const existing = windows.find(w => w.appId === validAppId);
    if (existing) {
      focusWindow(existing.id);
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
      }
      return;
    }

    const appTitles: Record<AppId, string> = {
      browser: 'ArcaNet Browser',
      mail: 'OmniMail Client',
      relay: 'SignalRelay IRC',
      explorer: 'Navigator Pro',
      terminal: 'Somnia Command Shell',
      media: 'AetherWave Media Player',
      search: 'DeepScan Universal Search',
      timeline: 'Chronos Timeline Explorer',
      investigator: 'Evidence Corkboard & Graph',
      sysmon: 'Telemetry & Process Monitor',
      texteditor: 'Notepad',
      statemanager: 'Chronos Timeline Branching',
      settings: 'System Preferences',
    };

    const newZ = nextZIndex + 1;
    setNextZIndex(newZ);

    const newWin: WindowState = {
      id: `win_${validAppId}_${Date.now()}`,
      appId: validAppId,
      title: appTitles[validAppId] || 'Application',
      icon: validAppId,
      x: 100 + (windows.length % 6) * 30,
      y: 60 + (windows.length % 6) * 25,
      width: appId === 'investigator' ? 920 : appId === 'browser' ? 840 : appId === 'timeline' ? 880 : 720,
      height: appId === 'investigator' ? 560 : appId === 'terminal' ? 440 : 480,
      minWidth: 420,
      minHeight: 280,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZ,
      isFocused: true,
      initialParams: params,
    };

    setWindows(prev => [...prev.map(w => ({ ...w, isFocused: false })), newWin]);
  };

  const focusWindow = (id: string) => {
    sound.playKeyClick();
    const newZ = nextZIndex + 1;
    setNextZIndex(newZ);
    setWindows(prev => prev.map(w => ({
      ...w,
      zIndex: w.id === id ? newZ : w.zIndex,
      isFocused: w.id === id,
      isMinimized: w.id === id ? false : w.isMinimized,
    })));
  };

  const closeWindow = (id: string) => {
    sound.playWindowClose();
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true, isFocused: false } : w));
  };

  const toggleMaximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const updateWindowPos = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, width, height } : w));
  };

  const desktopIcons: { appId: AppId; label: string; icon: React.ReactNode; isTrash?: boolean }[] = [
    { appId: 'explorer', label: 'Navigator Pro', icon: <Folder size={32} style={{ color: '#eab308' }} /> },
    { appId: 'browser', label: 'ArcaNet Web', icon: <Globe size={32} style={{ color: '#00f2fe' }} /> },
    { appId: 'mail', label: 'OmniMail', icon: <Mail size={32} style={{ color: '#22c55e' }} /> },
    { appId: 'relay', label: 'SignalRelay', icon: <MessageSquare size={32} style={{ color: '#a855f7' }} /> },
    { appId: 'terminal', label: 'Terminal Shell', icon: <Terminal size={32} style={{ color: '#f59e0b' }} /> },
    { appId: 'media', label: 'AetherWave', icon: <Music size={32} style={{ color: '#ec4899' }} /> },
    { appId: 'search', label: 'DeepScan', icon: <Search size={32} style={{ color: '#38bdf8' }} /> },
    { appId: 'timeline', label: 'Timeline', icon: <Calendar size={32} style={{ color: '#f97316' }} /> },
    { appId: 'investigator', label: 'Evidence Board', icon: <Network size={32} style={{ color: '#ef4444' }} /> },
    { appId: 'sysmon', label: 'Telemetry', icon: <Activity size={32} style={{ color: '#10b981' }} /> },
    { appId: 'statemanager', label: 'Timeline Forks', icon: <GitBranch size={32} style={{ color: '#6366f1' }} /> },
    { appId: 'settings', label: 'Settings', icon: <Settings size={32} style={{ color: '#94a3b8' }} /> },
    { appId: 'explorer', label: 'Recycle Bin', icon: <Trash2 size={32} style={{ color: '#64748b' }} />, isTrash: true },
  ];

  return (
    <div 
      className={`desktop-container ${settings.crtCurvature ? 'crt-curvature' : ''}`}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* CRT Scanline & Phosphor Overlay */}
      {settings.scanlines && <div className="crt-overlay" />}
      {settings.crtCurvature && <div className="crt-vignette" />}

      {/* 1. Boot Sequence Stage */}
      {bootState === 'booting' && (
        <BootSequence onBootComplete={() => setBootState('login')} />
      )}

      {/* 2. Login Screen Stage */}
      {bootState === 'login' && (
        <LoginScreen
          onLogin={(user) => {
            setCurrentUser(user);
            setBootState('desktop');
            try {
              sound.playBootChime();
            } catch {}
          }}
        />
      )}

      {/* 3. Main Desktop Workspace Stage */}
      {bootState === 'desktop' && (
        <>
          {/* Desktop Icons Grid */}
          <div className="desktop-icons-layer">
            {desktopIcons.map(item => (
              <div
                key={item.label}
                className={`desktop-icon ${selectedDesktopIcon === item.label ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDesktopIcon(item.label);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  if (item.isTrash) {
                    openApp('explorer', { selectedPath: '/recycle_bin' });
                  } else {
                    openApp(item.appId);
                  }
                }}
              >
                <div className="desktop-icon-img">{item.icon}</div>
                <div className="desktop-icon-label">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Window Manager Workspace */}
          <WindowManager
            windows={windows}
            vfs={vfsRef.current}
            stateManager={stateManagerRef.current}
            clueEngine={clueEngineRef.current}
            onFocusWindow={focusWindow}
            onCloseWindow={closeWindow}
            onMinimizeWindow={minimizeWindow}
            onToggleMaximizeWindow={toggleMaximizeWindow}
            onUpdateWindowPos={updateWindowPos}
            onUpdateWindowSize={updateWindowSize}
            onOpenApp={openApp}
            onClueTrigger={(clueId) => clueEngineRef.current.triggerAction('clues_unlocked' as any, clueId)}
            onSystemAction={(action) => {
              if (action.type === 'reboot') setBootState('booting');
              if (action.type === 'theme') stateManagerRef.current.updateSettings({ theme: action.payload });
            }}
          />

          {/* Desktop Right-Click Context Menu */}
          {contextMenu.show && (
            <div
              className="bevel-box"
              style={{
                position: 'fixed',
                left: `${contextMenu.x}px`,
                top: `${contextMenu.y}px`,
                width: '180px',
                background: 'var(--window-bg)',
                zIndex: 99999,
                padding: '4px',
                boxShadow: '4px 4px 12px rgba(0,0,0,0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="start-item" 
                onClick={() => {
                  openApp('terminal');
                  setContextMenu(c => ({ ...c, show: false }));
                }}
              >
                <Terminal size={14} />
                <span>Open Terminal</span>
              </div>
              <div 
                className="start-item" 
                onClick={() => {
                  openApp('browser');
                  setContextMenu(c => ({ ...c, show: false }));
                }}
              >
                <Globe size={14} />
                <span>Open ArcaNet</span>
              </div>
              <div 
                className="start-item" 
                onClick={() => {
                  openApp('investigator');
                  setContextMenu(c => ({ ...c, show: false }));
                }}
              >
                <Network size={14} />
                <span>Evidence Board</span>
              </div>
              <div className="start-divider" />
              <div 
                className="start-item" 
                onClick={() => {
                  openApp('settings');
                  setContextMenu(c => ({ ...c, show: false }));
                }}
              >
                <Settings size={14} />
                <span>Display Settings</span>
              </div>
            </div>
          )}

          {/* Start Menu Popup */}
          <StartMenu
            isOpen={isStartOpen}
            onClose={() => setIsStartOpen(false)}
            onOpenApp={openApp}
            onReboot={() => setBootState('booting')}
          />

          {/* Taskbar */}
          <Taskbar
            windows={windows}
            stateManager={stateManagerRef.current}
            notifications={notifications}
            isStartOpen={isStartOpen}
            onToggleStart={() => setIsStartOpen(!isStartOpen)}
            onFocusWindow={focusWindow}
            onMinimizeWindow={minimizeWindow}
            onOpenApp={openApp}
            onDismissNotification={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
          />
        </>
      )}
    </div>
  );
};
export default App;
