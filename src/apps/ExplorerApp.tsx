import React, { useState } from 'react';
import { VirtualFileSystem } from '../services/vfs';
import { VFSNode, FilePermission } from '../types/vfs';
import { 
  Folder, FolderOpen, FileText, FileCode, File, Trash2, 
  ArrowUp, Plus, RefreshCw, Copy, Scissors, Trash, Shield, 
  Search, Eye, History, Clock, FileArchive, Music 
} from 'lucide-react';

interface ExplorerAppProps {
  vfs: VirtualFileSystem;
  initialPath?: string;
  onFileViewed?: (fileId: string) => void;
  onOpenApp?: (appId: string, params?: any) => void;
}

export const ExplorerApp: React.FC<ExplorerAppProps> = ({
  vfs,
  initialPath = '/users/investigator',
  onFileViewed,
  onOpenApp,
}) => {
  const [currentPath, setCurrentPath] = useState<string>(initialPath);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'details'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMetadataModal, setShowMetadataModal] = useState<boolean>(false);
  const [clipboardNodeId, setClipboardNodeId] = useState<string | null>(null);
  const [clipboardAction, setClipboardAction] = useState<'copy' | 'cut' | null>(null);
  const [, setForceUpdate] = useState<number>(0);

  const refresh = () => setForceUpdate(n => n + 1);

  // Normalize current path
  const currentDir = vfs.getNodeByPath(currentPath) || vfs.getNodeByPath('/')!;
  const isRecycleBin = currentDir.path === '/recycle_bin';

  // Get directory contents
  let contents = vfs.getChildren(currentDir.id, isRecycleBin);

  if (searchQuery) {
    contents = contents.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  const selectedNode = selectedNodeId ? vfs.getNodeById(selectedNodeId) : null;

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setSelectedNodeId(null);
  };

  const handleNavigateUp = () => {
    if (currentPath === '/') return;
    const lastSlash = currentPath.lastIndexOf('/');
    const parent = lastSlash <= 0 ? '/' : currentPath.slice(0, lastSlash);
    handleNavigate(parent);
  };

  const handleSelectNode = (node: VFSNode) => {
    setSelectedNodeId(node.id);
    if (node.type === 'file' && onFileViewed) {
      onFileViewed(node.id);
    }
  };

  const handleDoubleClick = (node: VFSNode) => {
    if (node.type === 'directory') {
      handleNavigate(node.path);
    } else {
      handleSelectNode(node);
      // If it's an audio file or markdown, can open in target app
      if (node.name.endsWith('.rec') || node.name.endsWith('.wav')) {
        if (onOpenApp) onOpenApp('media');
      }
    }
  };

  const handleCreateFolder = () => {
    const name = prompt('Enter new folder name:');
    if (!name) return;
    try {
      vfs.createDirectory(currentPath, name);
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateFile = () => {
    const name = prompt('Enter new file name:');
    if (!name) return;
    try {
      vfs.createFile(currentPath, name, 'New file content.');
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = () => {
    if (!selectedNodeId) return;
    if (confirm(`Are you sure you want to delete ${selectedNode?.name}?`)) {
      try {
        vfs.deleteNode(selectedNodeId, isRecycleBin);
        setSelectedNodeId(null);
        refresh();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleRestore = () => {
    if (!selectedNodeId) return;
    try {
      vfs.restoreNode(selectedNodeId);
      setSelectedNodeId(null);
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCopy = () => {
    if (!selectedNodeId) return;
    setClipboardNodeId(selectedNodeId);
    setClipboardAction('copy');
  };

  const handlePaste = () => {
    if (!clipboardNodeId || !clipboardAction) return;
    try {
      if (clipboardAction === 'copy') {
        vfs.copyNode(clipboardNodeId, currentDir.id);
      } else {
        vfs.moveNode(clipboardNodeId, currentDir.id);
        setClipboardNodeId(null);
        setClipboardAction(null);
      }
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getFileIcon = (node: VFSNode) => {
    if (node.type === 'directory') {
      return node.name === 'recycle_bin' ? <Trash2 size={24} style={{ color: '#64748b' }} /> : <Folder size={24} style={{ color: '#eab308' }} />;
    }
    if (node.name.endsWith('.md')) return <FileCode size={24} style={{ color: '#3b82f6' }} />;
    if (node.name.endsWith('.dat') || node.name.endsWith('.bin')) return <FileArchive size={24} style={{ color: '#a855f7' }} />;
    if (node.name.endsWith('.rec') || node.name.endsWith('.wav')) return <Music size={24} style={{ color: '#ec4899' }} />;
    return <FileText size={24} style={{ color: '#64748b' }} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-main)' }}>
      {/* Top Action Toolbar */}
      <div className="app-toolbar" style={{ borderBottom: '1px solid var(--window-border-dark)' }}>
        <button className="bevel-button" onClick={handleNavigateUp} disabled={currentPath === '/'}>
          <ArrowUp size={14} /> Up
        </button>
        <button className="bevel-button" onClick={handleCreateFolder}>
          <Plus size={14} /> New Folder
        </button>
        <button className="bevel-button" onClick={handleCreateFile}>
          <FileText size={14} /> New File
        </button>
        <button className="bevel-button" onClick={handleCopy} disabled={!selectedNodeId}>
          <Copy size={14} /> Copy
        </button>
        <button className="bevel-button" onClick={handlePaste} disabled={!clipboardNodeId}>
          Paste
        </button>
        <button className="bevel-button" onClick={handleDelete} disabled={!selectedNodeId}>
          <Trash size={14} /> Delete
        </button>
        {isRecycleBin && (
          <button className="bevel-button" onClick={handleRestore} disabled={!selectedNodeId} style={{ fontWeight: 600 }}>
            Restore File
          </button>
        )}
        <button className="bevel-button" onClick={() => setShowMetadataModal(true)} disabled={!selectedNodeId}>
          <Eye size={14} /> Properties
        </button>

        <div style={{ flex: 1 }} />

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', width: '200px' }} className="bevel-sunken">
          <Search size={13} style={{ margin: '0 6px', color: '#888' }} />
          <input
            type="text"
            placeholder="Filter directory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: '11px', padding: '3px 0' }}
          />
        </div>
      </div>

      {/* Path Breadcrumbs Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '3px 8px', 
        background: 'var(--card-bg)', 
        borderBottom: '1px solid var(--window-border-dark)',
        fontSize: '11px',
        gap: '4px' 
      }}>
        <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Location:</span>
        <div style={{ flex: 1, padding: '2px 6px', background: 'var(--input-bg)', color: 'var(--input-text)' }} className="bevel-sunken">
          {currentPath}
        </div>
        <button className="bevel-button" style={{ padding: '2px 6px' }} onClick={() => setViewMode(viewMode === 'grid' ? 'details' : 'grid')}>
          View: {viewMode === 'grid' ? 'Details' : 'Grid'}
        </button>
      </div>

      {/* Main 2-Pane View (Tree/Nav Left + Content Center/Right) */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Quick Nav Tree */}
        <div style={{ 
          width: '180px', 
          borderRight: '1px solid var(--window-border-dark)', 
          background: 'var(--window-bg)', 
          padding: '6px',
          overflowY: 'auto',
          fontSize: '11px' 
        }}>
          <div style={{ fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
            Drive Locations
          </div>
          {[
            { label: '/ (Root)', path: '/' },
            { label: '/system', path: '/system' },
            { label: '/users/investigator', path: '/users/investigator' },
            { label: '/users/kovacs', path: '/users/kovacs' },
            { label: '/users/elena', path: '/users/elena' },
            { label: '/shared', path: '/shared' },
            { label: '/archive', path: '/archive' },
            { label: 'Recycle Bin', path: '/recycle_bin' },
          ].map(nav => (
            <div
              key={nav.path}
              onClick={() => handleNavigate(nav.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 6px',
                cursor: 'pointer',
                background: currentPath === nav.path ? 'var(--selection-bg)' : 'transparent',
                color: currentPath === nav.path ? 'var(--selection-text)' : 'var(--text-main)',
                borderRadius: '2px',
                fontWeight: currentPath === nav.path ? 'bold' : 'normal',
              }}
            >
              {nav.path === '/recycle_bin' ? <Trash2 size={13} /> : <Folder size={13} />}
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nav.label}</span>
            </div>
          ))}
        </div>

        {/* Center: File List / Grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px', background: 'var(--card-bg)' }}>
          {contents.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
              (Empty directory)
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '12px' }}>
              {contents.map(node => (
                <div
                  key={node.id}
                  onClick={() => handleSelectNode(node)}
                  onDoubleClick={() => handleDoubleClick(node)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '8px 4px',
                    cursor: 'pointer',
                    background: selectedNodeId === node.id ? 'var(--selection-bg)' : 'transparent',
                    color: selectedNodeId === node.id ? 'var(--selection-text)' : 'var(--text-main)',
                    borderRadius: '3px',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div style={{ marginBottom: '6px' }}>{getFileIcon(node)}</div>
                  <div style={{ fontSize: '11px', wordBreak: 'break-word', lineHeight: 1.2 }}>
                    {node.name}
                  </div>
                  {node.permission === 'eyes_only' && (
                    <div style={{ position: 'absolute', top: 2, right: 2, background: '#ef4444', color: '#fff', fontSize: '9px', padding: '1px 3px', borderRadius: '2px' }}>
                      EYES
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Details Table */
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--window-border-dark)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '4px' }}>Name</th>
                  <th style={{ padding: '4px' }}>Type</th>
                  <th style={{ padding: '4px' }}>Size</th>
                  <th style={{ padding: '4px' }}>Modified</th>
                  <th style={{ padding: '4px' }}>Permission</th>
                </tr>
              </thead>
              <tbody>
                {contents.map(node => (
                  <tr
                    key={node.id}
                    onClick={() => handleSelectNode(node)}
                    onDoubleClick={() => handleDoubleClick(node)}
                    style={{
                      cursor: 'pointer',
                      background: selectedNodeId === node.id ? 'var(--selection-bg)' : 'transparent',
                      color: selectedNodeId === node.id ? 'var(--selection-text)' : 'var(--text-main)',
                    }}
                  >
                    <td style={{ padding: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {getFileIcon(node)}
                      <span>{node.name}</span>
                    </td>
                    <td style={{ padding: '5px' }}>{node.type}</td>
                    <td style={{ padding: '5px' }}>{node.size} B</td>
                    <td style={{ padding: '5px' }}>{node.modifiedAt.slice(0, 10)}</td>
                    <td style={{ padding: '5px' }}>{node.permission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Right Preview Pane (if file selected) */}
        {selectedNode && selectedNode.type === 'file' && (
          <div style={{ 
            width: '320px', 
            borderLeft: '1px solid var(--window-border-dark)', 
            background: 'var(--window-bg)', 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ 
              padding: '8px 12px', 
              borderBottom: '1px solid var(--window-border-dark)', 
              fontWeight: 600, 
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Preview: {selectedNode.name}
              </span>
              <button 
                className="bevel-button" 
                style={{ fontSize: '10px', padding: '1px 5px' }}
                onClick={() => setSelectedNodeId(null)}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, padding: '10px', overflowY: 'auto', background: 'var(--input-bg)', color: 'var(--input-text)' }}>
              {selectedNode.fileType === 'data' || selectedNode.name.endsWith('.dat') ? (
                /* Hex / Binary Dump View */
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: '10px', lineHeight: 1.4, color: '#22c55e' }}>
                  <div>[HEX DUMP VIEW: {selectedNode.path}]</div>
                  <div>00000000: 4F 52 50 48 45 55 53 2D 43 48 52 4F 4E 4F 53 2D | ORPHEUS-CHRONOS-</div>
                  <div>00000010: 43 49 50 48 45 52 2D 32 35 36 2D 45 4E 43 52 59 | CIPHER-256-ENCRY</div>
                  <div>00000020: 50 54 45 44 20 44 41 54 41 20 42 4C 4F 43 4B 20 | PTED DATA BLOCK </div>
                  <div>00000030: 37 2E 38 33 2D 50 45 54 52 4F 56 2D 31 39 38 33 | 7.83-PETROV-1983</div>
                  <div style={{ marginTop: '8px', color: '#eab308' }}>
                    Tip: Decrypt via Terminal using command: <code>decrypt {selectedNode.path} -k KEY</code>
                  </div>
                </div>
              ) : (
                /* Text / Markdown Preview */
                <div style={{ 
                  fontFamily: selectedNode.fileType === 'log' ? 'var(--mono-font)' : 'var(--sans-font)', 
                  fontSize: '12px', 
                  lineHeight: 1.5, 
                  whiteSpace: 'pre-wrap' 
                }}>
                  {selectedNode.content || '(empty file)'}
                </div>
              )}
            </div>

            <div style={{ padding: '6px 10px', borderTop: '1px solid var(--window-border-dark)', fontSize: '10px', color: 'var(--text-muted)' }}>
              <div>Permission: <strong>{selectedNode.permission}</strong></div>
              <div>Size: {selectedNode.size} bytes | Tags: {selectedNode.tags.join(', ')}</div>
            </div>
          </div>
        )}
      </div>

      {/* Metadata / Properties Modal */}
      {showMetadataModal && selectedNode && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px'
        }}>
          <div className="bevel-box" style={{ width: '420px', background: 'var(--window-bg)', padding: '4px' }}>
            <div className="window-titlebar" style={{ background: 'var(--window-header-active)', color: '#ffffff' }}>
              <span>Properties: {selectedNode.name}</span>
              <button className="window-control-btn bevel-button" onClick={() => setShowMetadataModal(false)}>✕</button>
            </div>
            <div style={{ padding: '16px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Path:</strong> {selectedNode.path}</div>
              <div><strong>Type:</strong> {selectedNode.type}</div>
              <div><strong>Size:</strong> {selectedNode.size} bytes</div>
              <div><strong>Created:</strong> {selectedNode.createdAt}</div>
              <div><strong>Modified:</strong> {selectedNode.modifiedAt}</div>
              <div><strong>Classification:</strong> {selectedNode.permission}</div>
              <div><strong>Tags:</strong> {selectedNode.tags.join(', ') || 'none'}</div>
              {selectedNode.history && selectedNode.history.length > 0 && (
                <div style={{ marginTop: '8px' }}>
                  <strong>Revision History ({selectedNode.history.length}):</strong>
                  <div style={{ maxHeight: '80px', overflowY: 'auto', background: 'var(--input-bg)', padding: '4px', marginTop: '4px' }} className="bevel-sunken">
                    {selectedNode.history.map((h, i) => (
                      <div key={i} style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {h.timestamp.slice(0, 16)} - {h.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button className="bevel-button" onClick={() => setShowMetadataModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
