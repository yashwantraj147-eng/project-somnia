import React, { useState } from 'react';
import { ChatChannel, ChatMessage } from '../types/chat';
import { Hash, Lock, Send, Users, ShieldAlert } from 'lucide-react';

interface RelayAppProps {
  channels: ChatChannel[];
  messages: ChatMessage[];
  initialChannelId?: string;
  onSendMessage?: (msg: Partial<ChatMessage>) => void;
  onReadMessage?: (msgId: string) => void;
}

export const RelayApp: React.FC<RelayAppProps> = ({
  channels,
  messages,
  initialChannelId = 'chan_orpheus',
  onSendMessage,
  onReadMessage,
}) => {
  const [activeChannelId, setActiveChannelId] = useState<string>(initialChannelId);
  const [inputText, setInputText] = useState<string>('');

  const activeChannel = channels.find(c => c.id === activeChannelId) || channels[0];
  const channelMessages = messages.filter(m => m.channelId === activeChannelId);

  const handleSend = () => {
    if (!inputText.trim()) return;
    if (onSendMessage) {
      onSendMessage({
        channelId: activeChannelId,
        sender: 'investigator',
        senderRole: 'Station Terminal',
        timestamp: new Date().toISOString().slice(11, 16),
        avatarColor: '#22c55e',
        text: inputText.trim(),
      });
    }
    setInputText('');
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--window-bg)', color: 'var(--text-main)' }}>
      {/* Channels Sidebar */}
      <div style={{ 
        width: '220px', 
        borderRight: '1px solid var(--window-border-dark)', 
        background: 'var(--window-bg)',
        display: 'flex', 
        flexDirection: 'column',
        padding: '8px'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
          Signal Channels
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {channels.map(chan => (
            <div
              key={chan.id}
              onClick={() => {
                setActiveChannelId(chan.id);
                // Mark messages in channel as read/triggered
                channelMessages.forEach(m => {
                  if (m.clueId && onReadMessage) onReadMessage(m.id);
                });
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 8px',
                fontSize: '12px',
                cursor: 'pointer',
                background: activeChannelId === chan.id ? 'var(--selection-bg)' : 'transparent',
                color: activeChannelId === chan.id ? 'var(--selection-text)' : 'var(--text-main)',
                borderRadius: '2px',
              }}
            >
              {chan.isPrivate ? <Lock size={13} /> : <Hash size={13} />}
              <span style={{ flex: 1, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {chan.name}
              </span>
              {chan.unreadCount > 0 && (
                <span style={{ 
                  background: '#ef4444', 
                  color: '#ffffff', 
                  fontSize: '10px', 
                  padding: '1px 5px', 
                  borderRadius: '10px', 
                  fontWeight: 'bold' 
                }}>
                  {chan.unreadCount}
                </span>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--window-border-dark)', fontSize: '11px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <Users size={12} />
            <span>Connected: 34 peers</span>
          </div>
          <div>Node: Aleutian-Mesh-04</div>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--card-bg)' }}>
        {/* Channel Header */}
        <div style={{ 
          padding: '8px 12px', 
          borderBottom: '1px solid var(--window-border-dark)', 
          background: 'var(--window-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Hash size={14} />
              <span>{activeChannel.name}</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{activeChannel.topic}</div>
          </div>
        </div>

        {/* Message Log */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '16px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px' 
        }}>
          {channelMessages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: msg.avatarColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '12px',
                flexShrink: 0,
              }}>
                {msg.sender[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '12px' }}>{msg.sender}</span>
                  {msg.senderRole && (
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>({msg.senderRole})</span>
                  )}
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                    {msg.timestamp}
                  </span>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  lineHeight: '1.5', 
                  background: 'var(--window-bg)', 
                  padding: '8px 10px', 
                  borderRadius: '4px',
                  border: msg.clueId ? '1px solid #eab308' : '1px solid var(--window-border-dark)',
                  boxShadow: msg.clueId ? '0 0 8px rgba(234, 179, 8, 0.2)' : undefined,
                }}>
                  {msg.text}
                  {msg.clueId && (
                    <div style={{ marginTop: '4px', fontSize: '10px', color: '#eab308', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldAlert size={12} />
                      <span>Anomalous communication detected in message telemetry.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div style={{ padding: '8px', borderTop: '1px solid var(--window-border-dark)', background: 'var(--window-bg)', display: 'flex', gap: '6px' }}>
          <input
            type="text"
            placeholder={`Message ${activeChannel.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
            className="bevel-sunken"
          />
          <button className="bevel-button" onClick={handleSend} style={{ fontWeight: 600 }}>
            <Send size={14} /> Send
          </button>
        </div>
      </div>
    </div>
  );
};
