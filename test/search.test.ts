import { describe, it, expect } from 'vitest';
import { UniversalSearchService } from '../src/services/search';
import { VirtualFileSystem } from '../src/services/vfs';
import { SEED_EMAILS } from '../src/data/seedMail';
import { SEED_CHAT_MESSAGES, SEED_CHAT_CHANNELS } from '../src/data/seedChat';
import { SEED_AUDIO_TRACKS } from '../src/data/seedMedia';
import { SEED_TIMELINE_EVENTS } from '../src/data/seedTimeline';

describe('Universal Search Service', () => {
  const vfs = new VirtualFileSystem();

  it('finds Petrov results across files, emails, web, and timeline', () => {
    const results = UniversalSearchService.search(
      'Petrov',
      vfs,
      SEED_EMAILS,
      SEED_CHAT_MESSAGES,
      SEED_CHAT_CHANNELS,
      SEED_AUDIO_TRACKS,
      SEED_TIMELINE_EVENTS,
      'all'
    );

    expect(results.length).toBeGreaterThan(0);

    const categories = new Set(results.map(r => r.category));
    expect(categories.has('file')).toBe(true);
    expect(categories.has('email')).toBe(true);
    expect(categories.has('web')).toBe(true);
    expect(categories.has('timeline')).toBe(true);
  });

  it('filters results by specific category', () => {
    const webOnly = UniversalSearchService.search(
      'Orpheus',
      vfs,
      SEED_EMAILS,
      SEED_CHAT_MESSAGES,
      SEED_CHAT_CHANNELS,
      SEED_AUDIO_TRACKS,
      SEED_TIMELINE_EVENTS,
      'web'
    );

    expect(webOnly.length).toBeGreaterThan(0);
    expect(webOnly.every(r => r.category === 'web')).toBe(true);
  });

  it('ranks high-relevance matches higher', () => {
    const results = UniversalSearchService.search(
      'Schumann',
      vfs,
      SEED_EMAILS,
      SEED_CHAT_MESSAGES,
      SEED_CHAT_CHANNELS,
      SEED_AUDIO_TRACKS,
      SEED_TIMELINE_EVENTS,
      'all'
    );

    expect(results.length).toBeGreaterThan(1);
    expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
  });
});
