import React, { useState } from 'react';
import { EmailMessage, MailAccount } from '../types/mail';
import { 
  Mail, Inbox, Send, Archive, Trash2, FileText, 
  Paperclip, Search, Star, Lock, UserCheck, Plus, RefreshCw 
} from 'lucide-react';

interface MailAppProps {
  accounts: MailAccount[];
  emails: EmailMessage[];
  initialEmailId?: string;
  initialAccountId?: string;
  onReadEmail?: (emailId: string) => void;
  onSendEmail?: (newEmail: Partial<EmailMessage>) => void;
  onOpenApp?: (appId: string, params?: any) => void;
}

export const MailApp: React.FC<MailAppProps> = ({
  accounts,
  emails,
  initialEmailId,
  initialAccountId = 'acc_kovacs',
  onReadEmail,
  onSendEmail,
  onOpenApp,
}) => {
  const [activeAccountId, setActiveAccountId] = useState<string>(initialAccountId);
  const [activeFolder, setActiveFolder] = useState<'inbox' | 'sent' | 'drafts' | 'archive' | 'trash'>('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(initialEmailId || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCompose, setShowCompose] = useState<boolean>(false);

  // Compose State
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const activeAccount = accounts.find(a => a.id === activeAccountId) || accounts[0];

  // Filter emails for active account and folder
  const currentEmails = emails.filter(m => {
    if (m.accountId !== activeAccountId) return false;
    if (m.folder !== activeFolder) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchSub = m.subject.toLowerCase().includes(q);
      const matchFrom = m.from.toLowerCase().includes(q);
      const matchBody = m.body.toLowerCase().includes(q);
      if (!matchSub && !matchFrom && !matchBody) return false;
    }
    return true;
  });

  const selectedEmail = emails.find(m => m.id === selectedEmailId);

  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    if (onReadEmail) {
      onReadEmail(id);
    }
  };

  const handleSendMail = () => {
    if (!composeTo || !composeSubject) return;
    if (onSendEmail) {
      onSendEmail({
        accountId: activeAccountId,
        folder: 'sent',
        from: activeAccount.email,
        to: composeTo,
        subject: composeSubject,
        body: composeBody,
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
        isRead: true,
        labels: ['Sent', 'Investigator'],
      });
    }
    setShowCompose(false);
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-main)' }}>
      {/* Top Toolbar */}
      <div className="app-toolbar" style={{ borderBottom: '1px solid var(--window-border-dark)' }}>
        <button className="bevel-button" onClick={() => setShowCompose(true)} style={{ fontWeight: 600 }}>
          <Plus size={14} /> New Message
        </button>
        <button className="bevel-button" onClick={() => setSelectedEmailId(null)}>
          <RefreshCw size={14} /> Check Mail
        </button>

        <div style={{ flex: 1 }} />

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', width: '220px' }} className="bevel-sunken">
          <Search size={13} style={{ margin: '0 6px', color: '#888' }} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '11px',
              padding: '3px 0',
            }}
          />
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar: Accounts & Folders */}
        <div style={{ 
          width: '210px', 
          borderRight: '1px solid var(--window-border-dark)', 
          background: 'var(--window-bg)', 
          display: 'flex', 
          flexDirection: 'column',
          padding: '6px'
        }}>
          {/* Account Selector */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              Mail Accounts
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {accounts.map(acc => (
                <div
                  key={acc.id}
                  onClick={() => {
                    if (acc.isUnlocked) {
                      setActiveAccountId(acc.id);
                      setSelectedEmailId(null);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 8px',
                    fontSize: '11px',
                    cursor: acc.isUnlocked ? 'pointer' : 'not-allowed',
                    background: activeAccountId === acc.id ? 'var(--selection-bg)' : 'transparent',
                    color: activeAccountId === acc.id ? 'var(--selection-text)' : acc.isUnlocked ? 'var(--text-main)' : 'var(--text-muted)',
                    opacity: acc.isUnlocked ? 1 : 0.6,
                    borderRadius: '2px',
                  }}
                  title={acc.isUnlocked ? acc.email : `Locked: ${acc.unlockRequirementHint || 'Requires higher clearance'}`}
                >
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: acc.avatarColor, 
                    display: 'inline-block' 
                  }} />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
                    {acc.displayName}
                  </span>
                  {!acc.isUnlocked && <Lock size={12} />}
                </div>
              ))}
            </div>
          </div>

          {/* Folder List */}
          <div>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              Folders
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { id: 'inbox', label: 'Inbox', icon: <Inbox size={14} /> },
                { id: 'sent', label: 'Sent', icon: <Send size={14} /> },
                { id: 'archive', label: 'Archive', icon: <Archive size={14} /> },
                { id: 'trash', label: 'Trash', icon: <Trash2 size={14} /> },
              ].map(f => (
                <div
                  key={f.id}
                  onClick={() => {
                    setActiveFolder(f.id as any);
                    setSelectedEmailId(null);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 8px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    background: activeFolder === f.id ? 'var(--selection-bg)' : 'transparent',
                    color: activeFolder === f.id ? 'var(--selection-text)' : 'var(--text-main)',
                    borderRadius: '2px',
                  }}
                >
                  {f.icon}
                  <span style={{ flex: 1 }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Message Thread List */}
        <div style={{ 
          width: '280px', 
          borderRight: '1px solid var(--window-border-dark)', 
          background: 'var(--card-bg)', 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {currentEmails.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
              No messages in {activeFolder}.
            </div>
          ) : (
            currentEmails.map(mail => (
              <div
                key={mail.id}
                onClick={() => handleSelectEmail(mail.id)}
                style={{
                  padding: '10px 12px',
                  borderBottom: '1px solid var(--window-border-dark)',
                  cursor: 'pointer',
                  background: selectedEmailId === mail.id ? 'var(--selection-bg)' : !mail.isRead ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: selectedEmailId === mail.id ? 'var(--selection-text)' : 'var(--text-main)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', fontSize: '11px' }}>
                  <span style={{ fontWeight: !mail.isRead ? 'bold' : 'normal', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' }}>
                    {activeFolder === 'sent' ? `To: ${mail.to}` : mail.from}
                  </span>
                  <span style={{ fontSize: '10px', opacity: 0.8 }}>{mail.date.slice(5, 10)}</span>
                </div>
                <div style={{ fontWeight: !mail.isRead ? 'bold' : 500, fontSize: '12px', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {mail.subject}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.75, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {mail.body.slice(0, 50)}...
                </div>
                {mail.attachments && mail.attachments.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '10px', opacity: 0.85 }}>
                    <Paperclip size={11} /> {mail.attachments.length} attachment(s)
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right: Message Detail Reading View */}
        <div style={{ flex: 1, background: '#ffffff', color: '#0f172a', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {selectedEmail ? (
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>
                  {selectedEmail.subject}
                </h2>
                <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div><strong>From:</strong> {selectedEmail.from}</div>
                  <div><strong>To:</strong> {selectedEmail.to}</div>
                  <div><strong>Date:</strong> {selectedEmail.date}</div>
                </div>

                {/* Labels / Tags */}
                {selectedEmail.labels && (
                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                    {selectedEmail.labels.map(lbl => (
                      <span key={lbl} style={{ 
                        fontSize: '10px', 
                        padding: '2px 6px', 
                        background: lbl === 'Urgent' || lbl === 'EYES ONLY' ? '#fee2e2' : '#f1f5f9', 
                        color: lbl === 'Urgent' || lbl === 'EYES ONLY' ? '#991b1b' : '#334155',
                        borderRadius: '3px',
                        fontWeight: 600
                      }}>
                        {lbl}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Email Body */}
              <div style={{ flex: 1, fontSize: '13px', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: '#334155', fontFamily: 'var(--sans-font)' }}>
                {selectedEmail.body}
              </div>

              {/* Attachments Area */}
              {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Paperclip size={14} />
                    <span>Attachments:</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedEmail.attachments.map(att => (
                      <div
                        key={att.name}
                        onClick={() => {
                          if (att.targetApp && onOpenApp) {
                            onOpenApp(att.targetApp, { selectedPath: att.targetPath });
                          }
                        }}
                        className="bevel-button"
                        style={{ padding: '6px 12px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <FileText size={14} />
                        <span>{att.name}</span>
                        <span style={{ fontSize: '10px', opacity: 0.7 }}>({att.size})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '13px' }}>
              Select a message to view its contents.
            </div>
          )}
        </div>
      </div>

      {/* Compose Message Modal */}
      {showCompose && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px',
        }}>
          <div className="bevel-box" style={{ width: '540px', background: 'var(--window-bg)', display: 'flex', flexDirection: 'column' }}>
            <div className="window-titlebar" style={{ background: 'var(--window-header-active)', color: '#ffffff' }}>
              <span>Compose Message // Station Node</span>
              <button className="window-control-btn bevel-button" onClick={() => setShowCompose(false)}>✕</button>
            </div>
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold' }}>To:</label>
                <input
                  type="text"
                  placeholder="e.g. dr.kovacs@orpheus.org, elena.rostova@svalbard-cryo.ac.no"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  style={{ width: '100%', padding: '4px', fontSize: '12px' }}
                  className="bevel-sunken"
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Subject:</label>
                <input
                  type="text"
                  placeholder="Subject line..."
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  style={{ width: '100%', padding: '4px', fontSize: '12px' }}
                  className="bevel-sunken"
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Message Body:</label>
                <textarea
                  rows={8}
                  placeholder="Type message here..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  style={{ width: '100%', padding: '6px', fontSize: '12px', resize: 'vertical' }}
                  className="bevel-sunken"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button className="bevel-button" onClick={() => setShowCompose(false)}>Cancel</button>
                <button className="bevel-button" onClick={handleSendMail} style={{ fontWeight: 'bold' }}>Send Message</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
