import { describe, it, expect, beforeEach } from 'vitest';
import { ClueEngine } from '../src/services/clueEngine';
import { SEED_CLUES } from '../src/data/seedClues';

describe('Rule-Based Clue Engine', () => {
  let engine: ClueEngine;

  beforeEach(() => {
    engine = new ClueEngine(JSON.parse(JSON.stringify(SEED_CLUES)));
  });

  it('initializes with boot clue already discovered', () => {
    const discovered = engine.getDiscoveredClues();
    expect(discovered.length).toBeGreaterThan(0);
    expect(discovered.some(c => c.id === 'CLUE-INIT-01')).toBe(true);
  });

  it('unlocks clue when required file is viewed', () => {
    const initialDiscoveredCount = engine.getDiscoveredClues().length;
    const unlocked = engine.triggerAction('file_viewed', 'file_sys_log');

    expect(unlocked.length).toBe(1);
    expect(unlocked[0].id).toBe('CLUE-SYS-01');
    expect(engine.getDiscoveredClues().length).toBe(initialDiscoveredCount + 1);
  });

  it('unlocks clue when required web page is visited', () => {
    const unlocked = engine.triggerAction('page_visited', 'theglitchboard.net/thread/somnia');
    expect(unlocked.length).toBe(1);
    expect(unlocked[0].id).toBe('CLUE-WEB-SOMNIA-TRUTH');
    expect(unlocked[0].arc).toBe(4);
  });

  it('does not re-unlock already discovered clues', () => {
    engine.triggerAction('file_viewed', 'file_sys_log');
    const secondTry = engine.triggerAction('file_viewed', 'file_sys_log');
    expect(secondTry.length).toBe(0);
  });

  it('calculates progress percentage correctly', () => {
    const initialProgress = engine.getProgressPercentage();
    expect(initialProgress).toBeGreaterThan(0);
    engine.triggerAction('file_viewed', 'file_sys_log');
    expect(engine.getProgressPercentage()).toBeGreaterThan(initialProgress);
  });
});
