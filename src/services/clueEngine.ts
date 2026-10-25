import { Clue } from '../types/clues';
import { SEED_CLUES } from '../data/seedClues';
import { sound } from './sound';

export interface ClueDiscoveryEvent {
  clue: Clue;
  newlyDiscovered: boolean;
  unlockedAction?: any;
}

export class ClueEngine {
  private clues: Clue[];
  private onClueUnlocked?: (event: ClueDiscoveryEvent) => void;
  private actionHistory: Set<string> = new Set();

  constructor(initialClues?: Clue[], onClueUnlocked?: (event: ClueDiscoveryEvent) => void) {
    this.clues = initialClues ? [...initialClues] : JSON.parse(JSON.stringify(SEED_CLUES));
    this.onClueUnlocked = onClueUnlocked;

    // Record initially discovered clues
    for (const c of this.clues) {
      if (c.discovered) {
        this.actionHistory.add(`clue:${c.id}`);
      }
    }
  }

  public getClues(): Clue[] {
    return this.clues;
  }

  public setClues(clues: Clue[]) {
    this.clues = clues;
  }

  public getDiscoveredClues(): Clue[] {
    return this.clues.filter(c => c.discovered);
  }

  public getClueById(id: string): Clue | undefined {
    return this.clues.find(c => c.id === id);
  }

  public triggerAction(type: 'file_viewed' | 'email_read' | 'page_visited' | 'command_run' | 'chat_read' | 'track_listened', targetId: string): Clue[] {
    const actionKey = `${type}:${targetId}`;
    this.actionHistory.add(actionKey);

    const unlocked: Clue[] = [];

    for (const clue of this.clues) {
      if (clue.discovered) continue;

      // Check if all requirements are satisfied
      const allMet = clue.requirements.every(req => {
        if (req.type === 'clues_unlocked') {
          return this.actionHistory.has(`clue:${req.targetId}`);
        }
        return this.actionHistory.has(`${req.type}:${req.targetId}`);
      });

      if (allMet && clue.requirements.length > 0) {
        clue.discovered = true;
        clue.discoveredAt = new Date().toISOString();
        this.actionHistory.add(`clue:${clue.id}`);
        unlocked.push(clue);

        try {
          sound.playClueDiscovered();
        } catch {}

        if (this.onClueUnlocked) {
          this.onClueUnlocked({
            clue,
            newlyDiscovered: true,
            unlockedAction: clue.unlockActions,
          });
        }
      }
    }

    return unlocked;
  }

  public unlockClueDirectly(clueId: string): Clue | undefined {
    const clue = this.getClueById(clueId);
    if (!clue) return undefined;

    if (!clue.discovered) {
      clue.discovered = true;
      clue.discoveredAt = new Date().toISOString();
      this.actionHistory.add(`clue:${clue.id}`);

      try {
        sound.playClueDiscovered();
      } catch {}

      if (this.onClueUnlocked) {
        this.onClueUnlocked({
          clue,
          newlyDiscovered: true,
          unlockedAction: clue.unlockActions,
        });
      }
    }

    return clue;
  }

  public getProgressPercentage(): number {
    if (this.clues.length === 0) return 0;
    const discoveredCount = this.clues.filter(c => c.discovered).length;
    return Math.round((discoveredCount / this.clues.length) * 100);
  }
}
