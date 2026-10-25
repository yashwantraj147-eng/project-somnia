import React, { useState } from 'react';
import { UserProfile } from '../types/os';
import { Shield, KeyRound, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const users: UserProfile[] = [
    {
      id: 'investigator',
      username: 'investigator',
      displayName: 'External Investigator',
      role: 'Forensic Terminal Auditor (Clearance: Level 2)',
      clearanceLevel: 2,
      avatarColor: '#22c55e',
      statusNote: 'Session restored from Station Epsilon recovery partition.',
    },
    {
      id: 'kovacs',
      username: 'a.kovacs',
      displayName: 'Dr. Arun Kovacs',
      role: 'Chief Physicist, Orpheus Institute (Clearance: Level 4)',
      clearanceLevel: 4,
      avatarColor: '#3b82f6',
      statusNote: 'Missing. Last active: Oct 24 2004.',
    },
    {
      id: 'guest',
      username: 'archive.guest',
      displayName: 'Archive Guest',
      role: 'Read-Only Historical Review (Clearance: Level 1)',
      clearanceLevel: 1,
      avatarColor: '#a855f7',
      statusNote: 'Unrestricted civilian access mode.',
    },
  ];

  const [selectedUser, setSelectedUser] = useState<UserProfile>(users[0]);
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedUser);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(#004d4d 15%, transparent 16%), #008080',
        backgroundSize: '24px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99990,
      }}
    >
      <div 
        className="bevel-box"
        style={{
          width: '440px',
          background: 'var(--window-bg)',
          boxShadow: '6px 6px 24px rgba(0,0,0,0.6)',
        }}
      >
        <div className="window-titlebar" style={{ background: 'var(--window-header-active)', color: '#ffffff' }}>
          <span>Station Epsilon Security Gateway // Log On</span>
          <span style={{ fontSize: '10px' }}>SOMNIA 4.81</span>
        </div>

        <form onSubmit={handleLogin} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid var(--window-border-dark)', paddingBottom: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              background: selectedUser.avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: 'bold',
            }}>
              {selectedUser.username[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{selectedUser.displayName}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{selectedUser.role}</div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
              Select Operator Profile:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {users.map(u => (
                <div
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    background: selectedUser.id === u.id ? 'var(--selection-bg)' : 'transparent',
                    color: selectedUser.id === u.id ? 'var(--selection-text)' : 'var(--text-main)',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: u.avatarColor }} />
                  <span style={{ fontWeight: 500 }}>{u.displayName}</span>
                  <span style={{ fontSize: '10px', opacity: 0.75, marginLeft: 'auto' }}>Level {u.clearanceLevel}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
              Authentication Code (Optional for Investigator):
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }} className="bevel-sunken">
              <KeyRound size={14} style={{ margin: '0 8px', color: 'var(--text-muted)' }} />
              <input
                type="password"
                placeholder="Press ENTER or Log On to start..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  padding: '6px 0',
                  fontSize: '12px',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Aleutian Trench Node #04</span>
            <button type="submit" className="bevel-button" style={{ fontWeight: 'bold', padding: '6px 16px' }}>
              Log On to SOMNIA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
