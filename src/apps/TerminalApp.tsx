import React, { useState, useRef, useEffect } from 'react';
import { TerminalParser } from '../services/terminalParser';
import { TerminalCommandRunner } from '../services/terminalCommands';
import { VirtualFileSystem } from '../services/vfs';
import { Clue } from '../types/clues';
import { CommandContext } from '../types/terminal';
import { sound } from '../services/sound';

interface TerminalAppProps {
  vfs: VirtualFileSystem;
  clues: Clue[];
  initialCwd?: string;
  onClueTrigger?: (clueId: string) => void;
  onSystemAction?: (action: { type: string; payload?: any }) => void;
}

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  text: string;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({
  vfs,
  clues,
  initialCwd = '/users/investigator',
  onClueTrigger,
  onSystemAction,
}) => {
  const [cwd, setCwd] = useState<string>(initialCwd);
  const [clearanceLevel, setClearanceLevel] = useState<number>(1);
  const [user, setUser] = useState<string>('investigator');
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', text: 'SomniaOS SCS v4.81 (Station Epsilon Recovery Shell)' },
    { type: 'output', text: 'Type "help" for a list of commands, or "query" to inspect the archive.' },
    { type: 'output', text: 'Type "clues" to check your investigation progress.' },
    { type: 'output', text: '----------------------------------------------------------------------' },
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const runnerRef = useRef<TerminalCommandRunner>(new TerminalCommandRunner(vfs, clues, onClueTrigger));
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep runner updated with latest clues
  useEffect(() => {
    runnerRef.current.setClues(clues);
  }, [clues]);

  // Scroll to bottom on new line
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeyClick();

    // History navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length > 0 && historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx >= history.length) {
          setHistoryIdx(-1);
          setInputVal('');
        } else {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx] || '');
        }
      }
      return;
    }

    // Tab autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocomplete();
      return;
    }

    // Execute on Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    }
  };

  const handleAutocomplete = () => {
    const trimmed = inputVal.trimStart();
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) {
      // Autocomplete command name
      const available = ['help', 'man', 'ls', 'dir', 'cd', 'pwd', 'cat', 'echo', 'clear', 'whoami', 'uname', 'date', 'mkdir', 'touch', 'rm', 'cp', 'mv', 'ps', 'top', 'netstat', 'dmesg', 'query', 'telemetry', 'decrypt', 'auth', 'clues', 'archive', 'theme', 'reboot'];
      const prefix = parts[0].toLowerCase();
      const match = available.find(c => c.startsWith(prefix));
      if (match) {
        setInputVal(match + ' ');
      }
    } else {
      // Autocomplete filename in cwd
      const lastPart = parts[parts.length - 1];
      const children = vfs.getChildrenByPath(cwd, false);
      const match = children.find(c => c.name.toLowerCase().startsWith(lastPart.toLowerCase()));
      if (match) {
        parts[parts.length - 1] = match.name + (match.type === 'directory' ? '/' : '');
        setInputVal(parts.join(' '));
      }
    }
  };

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    // Record history
    setHistory(prev => [...prev, raw]);
    setHistoryIdx(-1);
    setInputVal('');

    // Append user input line
    const promptPrefix = `${user}@somnia:${cwd === '/' ? '/' : cwd.split('/').pop()}$ `;
    setLines(prev => [...prev, { type: 'input', text: promptPrefix + raw }]);

    // Parse and execute
    const parsed = TerminalParser.parse(raw);
    const ctx: CommandContext = {
      cwd,
      env: {},
      user,
      clearanceLevel,
    };

    const res = runnerRef.current.execute(parsed, ctx);

    // Apply state changes
    if (res.newCwd) setCwd(res.newCwd);
    if (res.newClearance) setClearanceLevel(res.newClearance);

    if (res.systemAction) {
      if (res.systemAction.type === 'clear') {
        setLines([]);
        return;
      }
      if (onSystemAction) {
        onSystemAction(res.systemAction);
      }
    }

    if (res.error) {
      sound.playErrorBeep();
      setLines(prev => [...prev, { type: 'error', text: res.error! }]);
    } else if (res.output) {
      setLines(prev => [...prev, { type: 'output', text: res.output }]);
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0c0802',
        color: '#ffb000',
        fontFamily: 'var(--mono-font)',
        fontSize: '13px',
        lineHeight: 1.4,
        padding: '12px',
        overflow: 'hidden',
        cursor: 'text',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output log */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {lines.map((l, idx) => (
          <div 
            key={idx} 
            style={{ 
              whiteSpace: 'pre-wrap', 
              wordBreak: 'break-word',
              color: l.type === 'error' ? '#ef4444' : l.type === 'input' ? '#00f2fe' : '#ffb000',
              fontWeight: l.type === 'input' ? 'bold' : 'normal'
            }}
          >
            {l.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Prompt & Input line */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
        <span style={{ color: '#00f2fe', fontWeight: 'bold', marginRight: '6px', whiteSpace: 'nowrap' }}>
          {user}@somnia:{cwd === '/' ? '/' : cwd.split('/').pop()}$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#ffb000',
            fontFamily: 'var(--mono-font)',
            fontSize: '13px',
            caretColor: '#ffb000',
          }}
        />
      </div>
    </div>
  );
};
