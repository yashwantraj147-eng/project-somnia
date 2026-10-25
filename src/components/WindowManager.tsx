import React, { useState } from 'react';
import { WindowState, AppId } from '../types/os';
import { BrowserApp } from '../apps/BrowserApp';
import { MailApp } from '../apps/MailApp';
import { RelayApp } from '../apps/RelayApp';
import { ExplorerApp } from '../apps/ExplorerApp';
import { TerminalApp } from '../apps/TerminalApp';
import { MediaPlayerApp } from '../apps/MediaPlayerApp';
import { UniversalSearchApp } from '../apps/UniversalSearchApp';
import { TimelineApp } from '../apps/TimelineApp';
import { InvestigatorApp } from '../apps/InvestigatorApp';
import { SystemMonitorApp } from '../apps/SystemMonitorApp';
import { TextEditorApp } from '../apps/TextEditorApp';
import { StateManagerApp } from '../apps/StateManagerApp';
import { SettingsApp } from '../apps/SettingsApp';
import { VirtualFileSystem } from '../services/vfs';
import { StateManager } from '../services/stateManager';
import { ClueEngine } from '../services/clueEngine';
import { SEED_AUDIO_TRACKS } from '../data/seedMedia';
import { sound } from '../services/sound';
import { Minus, Square, Copy, X } from 'lucide-react';

interface WindowManagerProps {
  windows: WindowState[];
  vfs: VirtualFileSystem;
  stateManager: StateManager;
  clueEngine: ClueEngine;
  onFocusWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onToggleMaximizeWindow: (id: string) => void;
  onUpdateWindowPos: (id: string, x: number, y: number) => void;
  onUpdateWindowSize: (id: string, width: number, height: number) => void;
  onOpenApp: (appId: AppId | string, params?: any) => void;
  onClueTrigger: (clueId: string) => void;
  onSystemAction?: (action: { type: string; payload?: any }) => void;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  vfs,
  stateManager,
  clueEngine,
  onFocusWindow,
  onCloseWindow,
  onMinimizeWindow,
  onToggleMaximizeWindow,
  onUpdateWindowPos,
  onUpdateWindowSize,
  onOpenApp,
  onClueTrigger,
  onSystemAction,
}) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [resizingId, setResizingId] = useState<string | null>(null);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [initialResizeState, setInitialResizeState] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const activeBranch = stateManager.getActiveBranch();
  const settings = stateManager.getSettings();

  // Handle Dragging
  const startDrag = (e: React.MouseEvent, win: WindowState) => {
    if (win.isMaximized) return;
    onFocusWindow(win.id);
    setDraggingId(win.id);
    setDragOffset({
      x: e.clientX - win.x,
      y: e.clientY - win.y,
    });
  };

  // Handle Resizing
  const startResize = (e: React.MouseEvent, win: WindowState, dir: string) => {
    e.stopPropagation();
    if (win.isMaximized) return;
    onFocusWindow(win.id);
    setResizingId(win.id);
    setResizeDirection(dir);
    setInitialResizeState({
      x: win.x,
      y: win.y,
      w: win.width,
      h: win.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingId) {
      const win = windows.find(w => w.id === draggingId);
      if (win) {
        const nextX = Math.max(-win.width + 100, Math.min(window.innerWidth - 80, e.clientX - dragOffset.x));
        const nextY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragOffset.y));
        onUpdateWindowPos(draggingId, nextX, nextY);
      }
    } else if (resizingId && initialResizeState) {
      const deltaX = e.clientX - initialResizeState.mouseX;
      const deltaY = e.clientY - initialResizeState.mouseY;
      const win = windows.find(w => w.id === resizingId);
      if (!win) return;

      let newW = initialResizeState.w;
      let newH = initialResizeState.h;
      let newX = initialResizeState.x;
      let newY = initialResizeState.y;

      if (resizeDirection.includes('e')) {
        newW = Math.max(win.minWidth, initialResizeState.w + deltaX);
      }
      if (resizeDirection.includes('s')) {
        newH = Math.max(win.minHeight, initialResizeState.h + deltaY);
      }
      if (resizeDirection.includes('w')) {
        const potentialW = initialResizeState.w - deltaX;
        if (potentialW >= win.minWidth) {
          newW = potentialW;
          newX = initialResizeState.x + deltaX;
        }
      }
      if (resizeDirection.includes('n')) {
        const potentialH = initialResizeState.h - deltaY;
        if (potentialH >= win.minHeight) {
          newH = potentialH;
          newY = initialResizeState.y + deltaY;
        }
      }

      onUpdateWindowSize(resizingId, newW, newH);
      if (newX !== initialResizeState.x || newY !== initialResizeState.y) {
        onUpdateWindowPos(resizingId, newX, newY);
      }
    }
  };

  const handleMouseUp = () => {
    setDraggingId(null);
    setResizingId(null);
    setInitialResizeState(null);
  };

  const renderAppContent = (win: WindowState) => {
    switch (win.appId) {
      case 'browser':
        return (
          <BrowserApp
            initialUrl={win.initialParams?.url || 'orpheus.org'}
            onPageVisited={(url) => {
              clueEngine.triggerAction('page_visited', url);
            }}
            onOpenApp={onOpenApp}
          />
        );
      case 'mail':
        return (
          <MailApp
            accounts={activeBranch.mailAccounts}
            emails={activeBranch.emails}
            initialEmailId={win.initialParams?.selectedEmailId}
            initialAccountId={win.initialParams?.accountId}
            onReadEmail={(emailId) => {
              clueEngine.triggerAction('email_read', emailId);
            }}
            onSendEmail={(newEmail) => {
              const fullMsg = {
                ...newEmail,
                id: `mail_user_${Date.now()}`,
              } as any;
              activeBranch.emails.push(fullMsg);
            }}
            onOpenApp={onOpenApp}
          />
        );
      case 'relay':
        return (
          <RelayApp
            channels={[
              { id: 'chan_orpheus', name: '#orpheus-core', topic: 'Orpheus Staff Channel', memberCount: 18, unreadCount: 0 },
              { id: 'chan_telemetry', name: '#telemetry-night-shift', topic: 'Aleutian Hydrophone Feed', memberCount: 7, unreadCount: 0 },
              { id: 'chan_watercooler', name: '#watercooler', topic: 'General Discussions', memberCount: 24, unreadCount: 0 },
              { id: 'chan_anomaly', name: '#anomaly-investigation', topic: 'The Petrov Divergence', isPrivate: true, memberCount: 4, unreadCount: 0 },
            ]}
            messages={activeBranch.chatMessages}
            initialChannelId={win.initialParams?.channelId}
            onSendMessage={(msg) => {
              activeBranch.chatMessages.push({
                ...msg,
                id: `msg_user_${Date.now()}`,
              } as any);
            }}
            onReadMessage={(msgId) => {
              clueEngine.triggerAction('chat_read', msgId);
            }}
          />
        );
      case 'explorer':
        return (
          <ExplorerApp
            vfs={vfs}
            initialPath={win.initialParams?.selectedPath || '/users/investigator'}
            onFileViewed={(fileId) => {
              clueEngine.triggerAction('file_viewed', fileId);
            }}
            onOpenApp={onOpenApp}
          />
        );
      case 'terminal':
        return (
          <TerminalApp
            vfs={vfs}
            clues={clueEngine.getClues()}
            initialCwd={win.initialParams?.cwd || '/users/investigator'}
            onClueTrigger={onClueTrigger}
            onSystemAction={onSystemAction}
          />
        );
      case 'media':
        return (
          <MediaPlayerApp
            tracks={SEED_AUDIO_TRACKS}
            initialTrackId={win.initialParams?.trackId}
            onTrackListened={(trackId) => {
              clueEngine.triggerAction('track_listened', trackId);
            }}
            onClueTrigger={onClueTrigger}
          />
        );
      case 'search':
        return (
          <UniversalSearchApp
            vfs={vfs}
            emails={activeBranch.emails}
            chatMessages={activeBranch.chatMessages}
            chatChannels={[
              { id: 'chan_orpheus', name: '#orpheus-core', topic: '', memberCount: 0, unreadCount: 0 },
              { id: 'chan_telemetry', name: '#telemetry-night-shift', topic: '', memberCount: 0, unreadCount: 0 },
              { id: 'chan_watercooler', name: '#watercooler', topic: '', memberCount: 0, unreadCount: 0 },
              { id: 'chan_anomaly', name: '#anomaly-investigation', topic: '', memberCount: 0, unreadCount: 0 },
            ]}
            audioTracks={SEED_AUDIO_TRACKS}
            timelineEvents={activeBranch.timeline}
            initialQuery={win.initialParams?.query}
            onOpenApp={onOpenApp}
          />
        );
      case 'timeline':
        return (
          <TimelineApp
            events={activeBranch.timeline}
            initialEventId={win.initialParams?.eventId}
            onOpenApp={onOpenApp}
          />
        );
      case 'investigator':
        return (
          <InvestigatorApp
            nodes={activeBranch.evidenceNodes}
            edges={activeBranch.evidenceEdges}
            hypotheses={activeBranch.hypotheses}
            notes={activeBranch.notes}
            clues={clueEngine.getClues()}
            onUpdateNodes={(nodes) => {
              activeBranch.evidenceNodes = nodes;
            }}
            onUpdateEdges={(edges) => {
              activeBranch.evidenceEdges = edges;
            }}
            onAddHypothesis={(hypo) => {
              activeBranch.hypotheses.push(hypo);
            }}
            onAddNote={(note) => {
              activeBranch.notes.push(note);
            }}
          />
        );
      case 'sysmon':
        return <SystemMonitorApp />;
      case 'texteditor':
        return (
          <TextEditorApp
            vfs={vfs}
            initialPath={win.initialParams?.selectedPath}
          />
        );
      case 'statemanager':
        return (
          <StateManagerApp
            stateManager={stateManager}
          />
        );
      case 'settings':
        return (
          <SettingsApp
            settings={settings}
            onUpdateSettings={(updates) => stateManager.updateSettings(updates)}
          />
        );
      default:
        return <div style={{ padding: '24px' }}>Application content placeholder.</div>;
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {windows.map(win => {
        if (win.isMinimized) return null;

        const posX = win.isMaximized ? 0 : win.x;
        const posY = win.isMaximized ? 0 : win.y;
        const width = win.isMaximized ? '100vw' : `${win.width}px`;
        const height = win.isMaximized ? 'calc(100vh - 40px)' : `${win.height}px`;

        return (
          <div
            key={win.id}
            onMouseDown={() => onFocusWindow(win.id)}
            className={`os-window bevel-box ${win.isFocused ? 'focused' : ''}`}
            style={{
              left: `${posX}px`,
              top: `${posY}px`,
              width,
              height,
              zIndex: win.zIndex,
              pointerEvents: 'auto',
            }}
          >
            {/* Titlebar */}
            <div
              className="window-titlebar"
              onMouseDown={(e) => startDrag(e, win)}
              onDoubleClick={() => onToggleMaximizeWindow(win.id)}
            >
              <div className="window-title-left">
                <span>{win.title}</span>
              </div>
              <div className="window-controls">
                <button
                  className="window-control-btn bevel-button"
                  onClick={() => onMinimizeWindow(win.id)}
                  title="Minimize"
                >
                  <Minus size={10} />
                </button>
                <button
                  className="window-control-btn bevel-button"
                  onClick={() => onToggleMaximizeWindow(win.id)}
                  title={win.isMaximized ? 'Restore' : 'Maximize'}
                >
                  {win.isMaximized ? <Copy size={9} /> : <Square size={9} />}
                </button>
                <button
                  className="window-control-btn bevel-button"
                  onClick={() => onCloseWindow(win.id)}
                  title="Close"
                  style={{ color: '#ef4444' }}
                >
                  <X size={11} />
                </button>
              </div>
            </div>

            {/* Inner App Content */}
            <div className="window-content">
              {renderAppContent(win)}
            </div>

            {/* Resizing Handles (only when not maximized) */}
            {!win.isMaximized && (
              <>
                <div className="resize-handle resize-n" onMouseDown={(e) => startResize(e, win, 'n')} />
                <div className="resize-handle resize-s" onMouseDown={(e) => startResize(e, win, 's')} />
                <div className="resize-handle resize-e" onMouseDown={(e) => startResize(e, win, 'e')} />
                <div className="resize-handle resize-w" onMouseDown={(e) => startResize(e, win, 'w')} />
                <div className="resize-handle resize-ne" onMouseDown={(e) => startResize(e, win, 'ne')} />
                <div className="resize-handle resize-nw" onMouseDown={(e) => startResize(e, win, 'nw')} />
                <div className="resize-handle resize-se" onMouseDown={(e) => startResize(e, win, 'se')} />
                <div className="resize-handle resize-sw" onMouseDown={(e) => startResize(e, win, 'sw')} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
