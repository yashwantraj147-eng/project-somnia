import React, { useState } from 'react';
import { StateManager } from '../services/stateManager';
import { GitBranch, Download, Upload, RotateCcw, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

interface StateManagerAppProps {
  stateManager: StateManager;
  onStateSwitched?: () => void;
}

export const StateManagerApp: React.FC<StateManagerAppProps> = ({
  stateManager,
  onStateSwitched,
}) => {
  const [, setForceUpdate] = useState<number>(0);
  const [showBranchModal, setShowBranchModal] = useState<boolean>(false);
  const [newBranchName, setNewBranchName] = useState<string>('');
  const [newBranchDesc, setNewBranchDesc] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('');

  const refresh = () => setForceUpdate(n => n + 1);

  const saveData = stateManager.getSaveData();
  const branches = Object.values(saveData.branches);
  const activeBranch = stateManager.getActiveBranch();

  const handleBranch = () => {
    if (!newBranchName) return;
    stateManager.branchTimeline(newBranchName, newBranchDesc);
    setShowBranchModal(false);
    setNewBranchName('');
    setNewBranchDesc('');
    setStatusMsg(`Branched into "${newBranchName}"!`);
    setTimeout(() => setStatusMsg(''), 3000);
    refresh();
    if (onStateSwitched) onStateSwitched();
  };

  const handleSwitch = (branchId: string) => {
    stateManager.switchBranch(branchId);
    setStatusMsg(`Switched to branch: ${saveData.branches[branchId].name}`);
    setTimeout(() => setStatusMsg(''), 3000);
    refresh();
    if (onStateSwitched) onStateSwitched();
  };

  const handleExport = () => {
    const jsonStr = stateManager.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOMNIA_STATE_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg('State exported to JSON successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        stateManager.importJSON(text);
        setStatusMsg('State successfully imported!');
        setTimeout(() => setStatusMsg(''), 3000);
        refresh();
        if (onStateSwitched) onStateSwitched();
      } catch (err: any) {
        alert('Import failed: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('CAUTION: This will erase all modified files, clues, and timeline branches, restoring the machine to initial recovery state. Proceed?')) {
      stateManager.resetToFactory();
      setStatusMsg('System restored to factory recovery state.');
      setTimeout(() => setStatusMsg(''), 3000);
      refresh();
      if (onStateSwitched) onStateSwitched();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-main)', padding: '16px', overflowY: 'auto' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}>
        <div style={{ borderBottom: '1px solid var(--window-border-dark)', paddingBottom: '12px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <GitBranch size={20} style={{ color: 'var(--accent-color)' }} /> Chronos State & Timeline Branch Manager
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Branch investigations into separate parallel tracks to test alternate hypotheses without destroying canonical progress.
          </p>
        </div>

        {statusMsg && (
          <div style={{ 
            padding: '8px 12px', 
            background: '#dcfce7', 
            color: '#15803d', 
            borderRadius: '4px', 
            fontSize: '12px', 
            fontWeight: 600, 
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Check size={14} /> {statusMsg}
          </div>
        )}

        {/* Current Active Branch Badge */}
        <div className="bevel-box" style={{ padding: '14px', background: 'var(--card-bg)', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Active Timeline Branch
              </div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                {activeBranch.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {activeBranch.description}
              </div>
            </div>
            <button className="bevel-button" onClick={() => setShowBranchModal(true)} style={{ fontWeight: 'bold' }}>
              <GitBranch size={14} /> Branch Timeline
            </button>
          </div>
        </div>

        {/* Branches List */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>
            Preserved Timeline Branches ({branches.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {branches.map(b => (
              <div 
                key={b.id} 
                className="bevel-box"
                style={{ 
                  padding: '12px', 
                  background: activeBranch.id === b.id ? 'var(--selection-bg)' : 'var(--window-bg)',
                  color: activeBranch.id === b.id ? 'var(--selection-text)' : 'var(--text-main)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{b.name}</div>
                  <div style={{ fontSize: '11px', opacity: 0.85 }}>{b.description}</div>
                  <div style={{ fontSize: '10px', opacity: 0.75, marginTop: '2px' }}>Created: {b.createdAt.slice(0, 16)}</div>
                </div>
                {activeBranch.id !== b.id && (
                  <button className="bevel-button" onClick={() => handleSwitch(b.id)}>
                    Switch to Branch
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Backup / Export / Import / Reset */}
        <div className="bevel-box" style={{ padding: '16px', background: 'var(--window-bg)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>
            System Backup & Recovery
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="bevel-button" onClick={handleExport} style={{ fontWeight: 600 }}>
              <Download size={14} /> Export Save Data (.JSON)
            </button>
            <label className="bevel-button" style={{ cursor: 'pointer', fontWeight: 600 }}>
              <Upload size={14} /> Import Save (.JSON)
              <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
            </label>
            <button className="bevel-button" onClick={handleReset} style={{ color: '#ef4444', fontWeight: 600 }}>
              <RotateCcw size={14} /> Factory Reset OS
            </button>
          </div>
        </div>
      </div>

      {/* Branch Modal */}
      {showBranchModal && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="bevel-box" style={{ width: '400px', padding: '16px', background: 'var(--window-bg)' }}>
            <h4 style={{ marginBottom: '10px' }}>Create New Timeline Branch</h4>
            <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Branch Name:</label>
            <input
              type="text"
              placeholder="e.g. Branch B: Soviet Radar Divergence..."
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
              style={{ width: '100%', padding: '6px', marginBottom: '10px' }}
              className="bevel-sunken"
            />
            <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Description / Hypothesis:</label>
            <textarea
              rows={3}
              placeholder="Hypothesis you are testing in this timeline branch..."
              value={newBranchDesc}
              onChange={(e) => setNewBranchDesc(e.target.value)}
              style={{ width: '100%', padding: '6px', marginBottom: '12px' }}
              className="bevel-sunken"
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="bevel-button" onClick={() => setShowBranchModal(false)}>Cancel</button>
              <button className="bevel-button" onClick={handleBranch} style={{ fontWeight: 'bold' }}>Fork Timeline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
