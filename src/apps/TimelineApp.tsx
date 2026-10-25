import React, { useState } from 'react';
import { TimelineEvent } from '../types/timeline';
import { 
  Calendar, AlertTriangle, ShieldAlert, Filter, 
  ExternalLink, CheckCircle, Info 
} from 'lucide-react';

interface TimelineAppProps {
  events: TimelineEvent[];
  initialEventId?: string;
  onOpenApp?: (appId: string, params?: any) => void;
}

export const TimelineApp: React.FC<TimelineAppProps> = ({
  events,
  initialEventId,
  onOpenApp,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(initialEventId || null);
  const [arcFilter, setArcFilter] = useState<number | 'all'>('all');

  const filteredEvents = events.filter(e => {
    if (arcFilter !== 'all' && e.arc !== arcFilter) return false;
    return true;
  }).sort((a, b) => a.year - b.year);

  const selectedEvent = events.find(e => e.id === selectedEventId);

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--window-bg)', color: 'var(--text-main)' }}>
      {/* Left Timeline Scroll Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--window-border-dark)' }}>
        {/* Filter Bar */}
        <div className="app-toolbar" style={{ borderBottom: '1px solid var(--window-border-dark)', gap: '6px' }}>
          <Filter size={13} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '11px', fontWeight: 600 }}>Arc Filter:</span>
          {['all', 1, 2, 3, 4, 5].map(arc => (
            <button
              key={arc}
              className="bevel-button"
              onClick={() => setArcFilter(arc as any)}
              style={{
                padding: '2px 8px',
                fontSize: '11px',
                background: arcFilter === arc ? 'var(--selection-bg)' : undefined,
                color: arcFilter === arc ? 'var(--selection-text)' : undefined,
                fontWeight: arcFilter === arc ? 600 : 'normal',
              }}
            >
              {arc === 'all' ? 'All Arcs' : `Arc ${arc}`}
            </button>
          ))}
        </div>

        {/* Vertical Event Cards Timeline */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: 'var(--card-bg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredEvents.map(evt => {
              const isSelected = selectedEventId === evt.id;
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  className="bevel-box"
                  style={{
                    padding: '12px',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--selection-bg)' : 'var(--window-bg)',
                    color: isSelected ? 'var(--selection-text)' : 'var(--text-main)',
                    borderLeft: evt.isContradictory ? '5px solid #ef4444' : undefined,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ 
                        fontFamily: 'var(--mono-font)', 
                        fontWeight: 'bold', 
                        fontSize: '12px',
                        background: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
                        padding: '1px 6px',
                        borderRadius: '2px'
                      }}>
                        {evt.year}
                      </span>
                      <span style={{ fontSize: '11px', opacity: 0.85 }}>{evt.dateStr}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {evt.isContradictory && (
                        <span style={{ 
                          fontSize: '10px', 
                          background: '#ef4444', 
                          color: '#ffffff', 
                          padding: '1px 5px', 
                          borderRadius: '2px', 
                          fontWeight: 'bold' 
                        }}>
                          CONTRADICTION
                        </span>
                      )}
                      <span style={{ fontSize: '10px', opacity: 0.8 }}>Arc {evt.arc}</span>
                    </div>
                  </div>

                  <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>
                    {evt.title}
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.85, lineHeight: 1.4 }}>
                    {evt.summary}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Event Details Inspector */}
      <div style={{ width: '360px', background: 'var(--window-bg)', padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {selectedEvent ? (
          <div>
            <div style={{ borderBottom: '1px solid var(--window-border-dark)', paddingBottom: '12px', marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                {selectedEvent.dateStr} • Arc {selectedEvent.arc}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
                {selectedEvent.title}
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Institution: <strong>{selectedEvent.institution}</strong>
              </div>
            </div>

            {selectedEvent.isContradictory && (
              <div style={{ 
                padding: '10px', 
                background: '#fee2e2', 
                color: '#991b1b', 
                borderRadius: '4px', 
                marginBottom: '14px', 
                fontSize: '12px',
                border: '1px solid #f87171' 
              }}>
                <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <AlertTriangle size={14} /> Historical Contradiction Notice:
                </div>
                {selectedEvent.contradictionNote}
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '4px', color: 'var(--text-muted)' }}>
                Historical Report:
              </div>
              <div style={{ fontSize: '12px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {selectedEvent.details}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '4px', color: 'var(--text-muted)' }}>
                Involved Personnel:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedEvent.characters.map(char => (
                  <span key={char} className="bevel-button" style={{ fontSize: '11px' }}>
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '6px', color: 'var(--text-muted)' }}>
                Linked Primary Artifacts:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {selectedEvent.evidenceIds.map(eid => (
                  <button
                    key={eid}
                    className="bevel-button"
                    style={{ fontSize: '11px', textAlign: 'left', justifyContent: 'flex-start' }}
                    onClick={() => {
                      if (onOpenApp) {
                        if (eid.startsWith('file_')) onOpenApp('explorer');
                        else if (eid.startsWith('mail_')) onOpenApp('mail');
                        else if (eid.includes('.org') || eid.includes('.com') || eid.includes('.net')) onOpenApp('browser', { url: eid });
                        else if (eid.startsWith('track_')) onOpenApp('media', { trackId: eid });
                      }
                    }}
                  >
                    <ExternalLink size={12} />
                    <span>Artifact: {eid}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            Select an event from the timeline to inspect its historical records and contradictions.
          </div>
        )}
      </div>
    </div>
  );
};
