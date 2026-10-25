import React, { useState } from 'react';
import { FICTIONAL_WEBSITES } from '../data/websites';
import { FictionalWebsite } from '../types/browser';
import { 
  ArrowLeft, ArrowRight, RotateCcw, Home, Bookmark, Code, 
  Search, ExternalLink, Globe, AlertTriangle 
} from 'lucide-react';

interface BrowserAppProps {
  initialUrl?: string;
  onPageVisited?: (url: string) => void;
  onOpenApp?: (appId: string, params?: any) => void;
}

export const BrowserApp: React.FC<BrowserAppProps> = ({ 
  initialUrl = 'orpheus.org', 
  onPageVisited,
  onOpenApp
}) => {
  const [currentUrl, setCurrentUrl] = useState<string>(initialUrl);
  const [inputUrl, setInputUrl] = useState<string>(initialUrl);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [showSourceModal, setShowSourceModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigateTo = (url: string) => {
    let clean = url.trim().replace(/^arcanet:\/\//, '').replace(/^http:\/\//, '').replace(/^https:\/\//, '');
    if (!clean) clean = 'omnisearch99.com';

    setCurrentUrl(clean);
    setInputUrl(clean);

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(clean);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    if (onPageVisited) {
      onPageVisited(clean);
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevUrl = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentUrl(prevUrl);
      setInputUrl(prevUrl);
      if (onPageVisited) onPageVisited(prevUrl);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextUrl = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentUrl(nextUrl);
      setInputUrl(nextUrl);
      if (onPageVisited) onPageVisited(nextUrl);
    }
  };

  const currentSite: FictionalWebsite | undefined = FICTIONAL_WEBSITES.find(
    s => s.url.toLowerCase() === currentUrl.toLowerCase()
  );

  // Filtered sites for search/directory
  const searchResults = searchQuery
    ? FICTIONAL_WEBSITES.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.searchKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff', color: '#000000' }}>
      {/* Browser Navigation Toolbar */}
      <div className="app-toolbar" style={{ borderBottom: '2px solid var(--window-border-dark)', gap: '4px' }}>
        <button 
          className="bevel-button" 
          disabled={historyIndex <= 0} 
          onClick={handleBack}
          title="Back"
        >
          <ArrowLeft size={14} />
        </button>
        <button 
          className="bevel-button" 
          disabled={historyIndex >= history.length - 1} 
          onClick={handleForward}
          title="Forward"
        >
          <ArrowRight size={14} />
        </button>
        <button 
          className="bevel-button" 
          onClick={() => navigateTo(currentUrl)}
          title="Reload"
        >
          <RotateCcw size={14} />
        </button>
        <button 
          className="bevel-button" 
          onClick={() => navigateTo('omnisearch99.com')}
          title="Home Portal"
        >
          <Home size={14} />
        </button>

        {/* Address Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, margin: '0 4px' }} className="bevel-sunken">
          <Globe size={14} style={{ margin: '0 6px', color: '#666666' }} />
          <span style={{ fontSize: '11px', color: '#666666', marginRight: '2px', fontFamily: 'var(--mono-font)' }}>arcanet://</span>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigateTo(inputUrl);
            }}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '12px',
              fontFamily: 'var(--mono-font)',
              padding: '3px 0',
            }}
          />
        </div>

        <button 
          className="bevel-button" 
          onClick={() => navigateTo(inputUrl)}
          style={{ fontWeight: 'bold' }}
        >
          Go
        </button>

        <button 
          className="bevel-button" 
          onClick={() => setShowSourceModal(true)}
          title="View Page Source Code & Hidden Comments"
          style={{ background: currentSite?.hiddenClueId ? '#fef08a' : undefined }}
        >
          <Code size={14} />
          <span>Source</span>
        </button>
      </div>

      {/* Bookmarks Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px', 
        padding: '3px 8px', 
        background: 'var(--window-bg)', 
        borderBottom: '1px solid var(--window-border-dark)',
        fontSize: '11px' 
      }}>
        <Bookmark size={12} style={{ color: '#eab308' }} />
        <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Bookmarks:</span>
        <button className="bevel-button" style={{ padding: '1px 6px', fontSize: '11px' }} onClick={() => navigateTo('orpheus.org')}>Orpheus</button>
        <button className="bevel-button" style={{ padding: '1px 6px', fontSize: '11px' }} onClick={() => navigateTo('svalbard-cryo.ac.no')}>Svalbard</button>
        <button className="bevel-button" style={{ padding: '1px 6px', fontSize: '11px' }} onClick={() => navigateTo('luminarydynamics.com')}>Luminary</button>
        <button className="bevel-button" style={{ padding: '1px 6px', fontSize: '11px' }} onClick={() => navigateTo('netboard99.org')}>NetBoard-99</button>
        <button className="bevel-button" style={{ padding: '1px 6px', fontSize: '11px' }} onClick={() => navigateTo('theglitchboard.net')}>The Glitch Board</button>
        <button className="bevel-button" style={{ padding: '1px 6px', fontSize: '11px' }} onClick={() => navigateTo('petrov-archive.org')}>Petrov 1983</button>
        <button className="bevel-button" style={{ padding: '1px 6px', fontSize: '11px' }} onClick={() => navigateTo('unboundsomnia.net')}>UNBOUND</button>
      </div>

      {/* Page Content Viewport */}
      <div 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '24px', 
          background: '#ffffff', 
          color: '#1a1a1a',
          fontFamily: 'serif',
          lineHeight: 1.6
        }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const anchor = target.closest('a');
          if (anchor && anchor.getAttribute('href')) {
            e.preventDefault();
            const href = anchor.getAttribute('href')!;
            navigateTo(href);
          }
        }}
      >
        {currentSite ? (
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div dangerouslySetInnerHTML={{ __html: currentSite.contentHtml }} />

            {/* Outgoing Links Discovery Strip */}
            {currentSite.links && currentSite.links.length > 0 && (
              <div style={{ 
                marginTop: '32px', 
                padding: '12px 16px', 
                background: '#f8fafc', 
                border: '1px solid #cbd5e1', 
                borderRadius: '4px',
                fontFamily: 'var(--sans-font)',
                fontSize: '12px' 
              }}>
                <div style={{ fontWeight: 600, color: '#334155', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ExternalLink size={14} />
                  <span>Outbound Links from this Node:</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {currentSite.links.map(link => (
                    <button
                      key={link}
                      className="bevel-button"
                      style={{ padding: '2px 8px', fontSize: '11px' }}
                      onClick={() => navigateTo(link)}
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* 404 / Search Page */
          <div style={{ maxWidth: '640px', margin: '40px auto', textAlign: 'center', fontFamily: 'var(--sans-font)' }}>
            <AlertTriangle size={48} style={{ color: '#ef4444', margin: '0 auto 16px auto' }} />
            <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>404 - ArcaNet Node Not Found</h2>
            <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '13px' }}>
              The server at <code>arcanet://{currentUrl}</code> did not respond or has been archived.
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '6px', 
              justifyContent: 'center', 
              maxWidth: '400px', 
              margin: '0 auto 24px auto' 
            }}>
              <input
                type="text"
                placeholder="Search ArcaNet directory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
                className="bevel-sunken"
              />
              <button className="bevel-button" style={{ fontWeight: 600 }}>
                <Search size={14} /> Search
              </button>
            </div>

            {searchResults.length > 0 && (
              <div style={{ textAlign: 'left', background: '#f8fafc', padding: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ marginBottom: '8px', fontSize: '13px' }}>Search Results:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {searchResults.slice(0, 8).map(s => (
                    <div key={s.url} style={{ cursor: 'pointer' }} onClick={() => navigateTo(s.url)}>
                      <div style={{ color: '#2563eb', fontWeight: 600, fontSize: '13px' }}>{s.title}</div>
                      <div style={{ color: '#16a34a', fontSize: '11px' }}>arcanet://{s.url}</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>{s.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* View Source Modal (Steganography & Comments Inspector) */}
      {showSourceModal && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }}>
          <div className="bevel-box" style={{ 
            width: '90%', 
            maxWidth: '720px', 
            height: '80%', 
            display: 'flex', 
            flexDirection: 'column',
            background: 'var(--window-bg)'
          }}>
            <div className="window-titlebar" style={{ background: 'var(--window-header-active)', color: '#ffffff' }}>
              <span>Source View: arcanet://{currentUrl}</span>
              <button className="window-control-btn bevel-button" onClick={() => setShowSourceModal(false)}>✕</button>
            </div>
            <div style={{ padding: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
              Inspecting raw HTML markup and developer comments for node: <strong>{currentUrl}</strong>
            </div>
            <div style={{ flex: 1, padding: '8px', overflow: 'hidden' }}>
              <textarea
                readOnly
                value={currentSite?.rawSourceCode || '<!-- No source code available for this node. -->'}
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#0a0a0a',
                  color: '#22c55e',
                  fontFamily: 'var(--mono-font)',
                  fontSize: '12px',
                  padding: '12px',
                  border: '1px solid #333333',
                  resize: 'none',
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ padding: '8px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="bevel-button" onClick={() => setShowSourceModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
