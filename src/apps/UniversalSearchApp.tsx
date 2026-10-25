import React, { useState } from 'react';
import { UniversalSearchService, SearchResultItem } from '../services/search';
import { VirtualFileSystem } from '../services/vfs';
import { EmailMessage } from '../types/mail';
import { ChatMessage, ChatChannel } from '../types/chat';
import { AudioTrack } from '../types/media';
import { TimelineEvent } from '../types/timeline';
import { AppId } from '../types/os';
import { 
  Search, FileText, Mail, Globe, MessageSquare, 
  Music, Calendar, ExternalLink, Filter 
} from 'lucide-react';

interface UniversalSearchAppProps {
  vfs: VirtualFileSystem;
  emails: EmailMessage[];
  chatMessages: ChatMessage[];
  chatChannels: ChatChannel[];
  audioTracks: AudioTrack[];
  timelineEvents: TimelineEvent[];
  initialQuery?: string;
  onOpenApp?: (appId: AppId | string, params?: any) => void;
}

export const UniversalSearchApp: React.FC<UniversalSearchAppProps> = ({
  vfs,
  emails,
  chatMessages,
  chatChannels,
  audioTracks,
  timelineEvents,
  initialQuery = '',
  onOpenApp,
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [results, setResults] = useState<SearchResultItem[]>(() => {
    if (initialQuery) {
      return UniversalSearchService.search(
        initialQuery,
        vfs,
        emails,
        chatMessages,
        chatChannels,
        audioTracks,
        timelineEvents,
        'all'
      );
    }
    return [];
  });

  const handleSearch = (q: string = query, cat: string = categoryFilter) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const res = UniversalSearchService.search(
      q,
      vfs,
      emails,
      chatMessages,
      chatChannels,
      audioTracks,
      timelineEvents,
      cat
    );
    setResults(res);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'file': return <FileText size={14} style={{ color: '#3b82f6' }} />;
      case 'email': return <Mail size={14} style={{ color: '#10b981' }} />;
      case 'web': return <Globe size={14} style={{ color: '#00f2fe' }} />;
      case 'chat': return <MessageSquare size={14} style={{ color: '#a855f7' }} />;
      case 'audio': return <Music size={14} style={{ color: '#ec4899' }} />;
      case 'timeline': return <Calendar size={14} style={{ color: '#f59e0b' }} />;
      default: return <Search size={14} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-main)' }}>
      {/* Search Header Bar */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--window-border-dark)', background: 'var(--card-bg)' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }} className="bevel-sunken">
            <Search size={16} style={{ margin: '0 8px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search files, emails, websites, chat, audio transcripts, timeline..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleSearch(e.target.value, categoryFilter);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              autoFocus
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '13px',
                padding: '6px 0',
                color: 'var(--input-text)',
              }}
            />
          </div>
          <button className="bevel-button" onClick={() => handleSearch()} style={{ fontWeight: 'bold', padding: '0 16px' }}>
            DeepScan
          </button>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
          <Filter size={12} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Filter:</span>
          {['all', 'file', 'email', 'web', 'chat', 'audio', 'timeline'].map(cat => (
            <button
              key={cat}
              className="bevel-button"
              onClick={() => {
                setCategoryFilter(cat);
                handleSearch(query, cat);
              }}
              style={{
                padding: '2px 8px',
                textTransform: 'capitalize',
                background: categoryFilter === cat ? 'var(--selection-bg)' : undefined,
                color: categoryFilter === cat ? 'var(--selection-text)' : undefined,
                fontWeight: categoryFilter === cat ? 600 : 'normal',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Viewport */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: 'var(--card-bg)' }}>
        {results.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            {query ? 'No records found matching your query.' : 'Type a query to search across the entire alternate reality.'}
            <div style={{ marginTop: '12px', fontSize: '11px' }}>
              Suggested queries: <code>Petrov</code>, <code>Kovacs</code>, <code>Station Epsilon</code>, <code>7.83</code>, <code>Directive 83</code>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Found {results.length} record(s) sorted by relevance score:
            </div>
            {results.map(item => (
              <div
                key={item.id}
                className="bevel-box"
                style={{
                  padding: '12px',
                  background: 'var(--window-bg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '13px' }}>
                    {getCategoryIcon(item.category)}
                    <span>{item.title}</span>
                  </div>
                  <button
                    className="bevel-button"
                    style={{ fontSize: '11px', padding: '2px 8px' }}
                    onClick={() => {
                      if (onOpenApp) {
                        onOpenApp(item.targetApp, item.targetParams);
                      }
                    }}
                  >
                    <ExternalLink size={12} />
                    <span>Open in {item.targetApp}</span>
                  </button>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {item.snippet}
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  <span>Category: <strong>{item.category.toUpperCase()}</strong></span>
                  <span>Match Score: {item.score}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
