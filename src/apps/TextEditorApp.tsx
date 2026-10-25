import React, { useState } from 'react';
import { VirtualFileSystem } from '../services/vfs';
import { Save, FileText, Check } from 'lucide-react';

interface TextEditorAppProps {
  vfs: VirtualFileSystem;
  initialPath?: string;
  onFileSaved?: (path: string) => void;
}

export const TextEditorApp: React.FC<TextEditorAppProps> = ({
  vfs,
  initialPath = '/users/investigator/investigator_notes.txt',
  onFileSaved,
}) => {
  const [filePath, setFilePath] = useState<string>(initialPath);
  const [content, setContent] = useState<string>(() => {
    const existing = vfs.getNodeByPath(initialPath);
    return existing?.content || '';
  });
  const [saveStatus, setSaveStatus] = useState<string>('');

  const handleSave = () => {
    try {
      vfs.writeFile(filePath, content);
      setSaveStatus('Saved!');
      setTimeout(() => setSaveStatus(''), 2000);
      if (onFileSaved) onFileSaved(filePath);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const lines = content.split('\n').length;
  const chars = content.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-main)' }}>
      {/* Editor Toolbar */}
      <div className="app-toolbar" style={{ borderBottom: '1px solid var(--window-border-dark)', gap: '6px' }}>
        <button className="bevel-button" onClick={handleSave} style={{ fontWeight: 'bold' }}>
          <Save size={14} /> Save
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', flex: 1 }}>
          <span style={{ fontWeight: 600 }}>File:</span>
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            style={{ flex: 1, padding: '2px 6px', fontSize: '11px' }}
            className="bevel-sunken"
          />
        </div>
        {saveStatus && (
          <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Check size={12} /> {saveStatus}
          </span>
        )}
      </div>

      {/* Editor Text Area */}
      <div style={{ flex: 1, padding: '4px', background: 'var(--input-bg)' }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing notes, transcripts, or recovered code..."
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            color: 'var(--input-text)',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: 'var(--mono-font)',
            fontSize: '12px',
            lineHeight: 1.5,
            padding: '8px',
          }}
        />
      </div>

      {/* Status Bar */}
      <div style={{ 
        height: '24px', 
        background: 'var(--window-bg)', 
        borderTop: '1px solid var(--window-border-dark)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 8px',
        fontSize: '11px',
        color: 'var(--text-muted)' 
      }}>
        <span>Status: Ready</span>
        <span>Lines: {lines} | Characters: {chars}</span>
      </div>
    </div>
  );
};
