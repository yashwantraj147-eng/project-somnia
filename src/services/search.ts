import { VirtualFileSystem } from './vfs';
import { FICTIONAL_WEBSITES } from '../data/websites';
import { EmailMessage } from '../types/mail';
import { ChatMessage, ChatChannel } from '../types/chat';
import { AudioTrack } from '../types/media';
import { TimelineEvent } from '../types/timeline';
import { AppId } from '../types/os';

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'file' | 'email' | 'web' | 'chat' | 'audio' | 'timeline';
  snippet: string;
  targetApp: AppId;
  targetParams: Record<string, any>;
  score: number;
}

export class UniversalSearchService {
  public static search(
    queryStr: string,
    vfs: VirtualFileSystem,
    emails: EmailMessage[],
    chatMessages: ChatMessage[],
    chatChannels: ChatChannel[],
    audioTracks: AudioTrack[],
    timelineEvents: TimelineEvent[],
    categoryFilter: string = 'all'
  ): SearchResultItem[] {
    const raw = queryStr.trim().toLowerCase();
    if (!raw) return [];

    const terms = raw.split(/\s+/).filter(Boolean);
    const results: SearchResultItem[] = [];

    // Helper to score string matches
    const scoreText = (text: string): number => {
      if (!text) return 0;
      const lower = text.toLowerCase();
      let s = 0;
      for (const term of terms) {
        if (lower.includes(term)) {
          s += 10;
          if (lower.startsWith(term)) s += 5;
        }
      }
      return s;
    };

    const makeSnippet = (text: string): string => {
      if (!text) return '';
      const clean = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
      const lower = clean.toLowerCase();
      let firstIndex = -1;
      for (const t of terms) {
        const idx = lower.indexOf(t);
        if (idx !== -1 && (firstIndex === -1 || idx < firstIndex)) {
          firstIndex = idx;
        }
      }
      if (firstIndex === -1) {
        return clean.slice(0, 140) + (clean.length > 140 ? '...' : '');
      }
      const start = Math.max(0, firstIndex - 40);
      const end = Math.min(clean.length, firstIndex + 100);
      return (start > 0 ? '...' : '') + clean.slice(start, end) + (end < clean.length ? '...' : '');
    };

    // 1. Files
    if (categoryFilter === 'all' || categoryFilter === 'file') {
      const files = vfs.search({ term: raw, includeDeleted: true });
      for (const f of files) {
        const sName = scoreText(f.name) * 2;
        const sPath = scoreText(f.path);
        const sContent = scoreText(f.content || '');
        const total = sName + sPath + sContent;
        if (total > 0) {
          results.push({
            id: `file_${f.id}`,
            title: f.path,
            category: 'file',
            snippet: makeSnippet(f.content || f.name),
            targetApp: 'explorer',
            targetParams: { selectedPath: f.path },
            score: total + 5,
          });
        }
      }
    }

    // 2. Websites
    if (categoryFilter === 'all' || categoryFilter === 'web') {
      for (const site of FICTIONAL_WEBSITES) {
        const sUrl = scoreText(site.url) * 2;
        const sTitle = scoreText(site.title) * 2;
        const sDesc = scoreText(site.description);
        const sKeys = site.searchKeywords.some(k => terms.some(t => k.toLowerCase().includes(t))) ? 20 : 0;
        const sHtml = scoreText(site.contentHtml);
        const total = sUrl + sTitle + sDesc + sKeys + sHtml;
        if (total > 0) {
          results.push({
            id: `web_${site.url}`,
            title: `${site.title} (${site.url})`,
            category: 'web',
            snippet: makeSnippet(site.description + ' ' + site.contentHtml),
            targetApp: 'browser',
            targetParams: { url: site.url },
            score: total,
          });
        }
      }
    }

    // 3. Emails
    if (categoryFilter === 'all' || categoryFilter === 'email') {
      for (const m of emails) {
        const sSub = scoreText(m.subject) * 2;
        const sFrom = scoreText(m.from);
        const sBody = scoreText(m.body);
        const total = sSub + sFrom + sBody;
        if (total > 0) {
          results.push({
            id: `mail_${m.id}`,
            title: `[Email] ${m.subject} (From: ${m.from})`,
            category: 'email',
            snippet: makeSnippet(m.body),
            targetApp: 'mail',
            targetParams: { selectedEmailId: m.id, accountId: m.accountId },
            score: total + 3,
          });
        }
      }
    }

    // 4. Chat Messages
    if (categoryFilter === 'all' || categoryFilter === 'chat') {
      for (const c of chatMessages) {
        const sText = scoreText(c.text);
        const sSender = scoreText(c.sender);
        const total = sText + sSender;
        if (total > 0) {
          const chan = chatChannels.find(ch => ch.id === c.channelId);
          results.push({
            id: `chat_${c.id}`,
            title: `[Relay] ${chan ? chan.name : 'Chat'} - ${c.sender}`,
            category: 'chat',
            snippet: makeSnippet(c.text),
            targetApp: 'relay',
            targetParams: { channelId: c.channelId },
            score: total,
          });
        }
      }
    }

    // 5. Audio Transcripts
    if (categoryFilter === 'all' || categoryFilter === 'audio') {
      for (const track of audioTracks) {
        const sTrack = scoreText(track.title) + scoreText(track.description);
        let sTranscript = 0;
        let matchedLine = '';
        for (const t of track.transcripts) {
          const lineScore = scoreText(t.text) + scoreText(t.speaker);
          if (lineScore > 0) {
            sTranscript += lineScore;
            if (!matchedLine) matchedLine = `${t.speaker}: ${t.text}`;
          }
        }
        const total = sTrack + sTranscript;
        if (total > 0) {
          results.push({
            id: `audio_${track.id}`,
            title: `[AetherWave Audio] ${track.title}`,
            category: 'audio',
            snippet: makeSnippet(matchedLine || track.description),
            targetApp: 'media',
            targetParams: { trackId: track.id },
            score: total,
          });
        }
      }
    }

    // 6. Timeline Events
    if (categoryFilter === 'all' || categoryFilter === 'timeline') {
      for (const evt of timelineEvents) {
        const sTitle = scoreText(evt.title) * 2;
        const sSummary = scoreText(evt.summary);
        const sDetails = scoreText(evt.details);
        const sChars = evt.characters.some(ch => scoreText(ch) > 0) ? 10 : 0;
        const total = sTitle + sSummary + sDetails + sChars;
        if (total > 0) {
          results.push({
            id: `timeline_${evt.id}`,
            title: `[Timeline ${evt.year}] ${evt.title}`,
            category: 'timeline',
            snippet: makeSnippet(evt.summary + ' ' + evt.details),
            targetApp: 'timeline',
            targetParams: { eventId: evt.id },
            score: total,
          });
        }
      }
    }

    // Sort by score descending
    return results.sort((a, b) => b.score - a.score);
  }
}
