import { SystemSaveData, TimelineBranch } from '../types/state';
import { SystemSettings, WindowState, SystemNotification } from '../types/os';
import { VirtualFileSystem } from './vfs';
import { SEED_CLUES } from '../data/seedClues';
import { SEED_EMAILS, SEED_MAIL_ACCOUNTS } from '../data/seedMail';
import { SEED_CHAT_MESSAGES } from '../data/seedChat';
import { SEED_TIMELINE_EVENTS } from '../data/seedTimeline';
import { SEED_EVIDENCE_NODES, SEED_EVIDENCE_EDGES, SEED_HYPOTHESES, SEED_NOTES } from '../data/seedInvestigation';

const STORAGE_KEY = 'SOMNIA_SYSTEM_SAVE_V1';

export const DEFAULT_SETTINGS: SystemSettings = {
  theme: 'retro-98',
  volume: 0.6,
  soundEnabled: true,
  scanlines: true,
  crtCurvature: false,
  reducedMotion: false,
  glitchFrequency: 'low',
  hintMode: 'detective',
  clock24h: true,
  activeUserId: 'investigator',
  wallpaper: 'default-grid',
};

export class StateManager {
  private saveData: SystemSaveData;

  constructor() {
    this.saveData = this.loadFromStorage() || this.createInitialSaveData();
  }

  public getSaveData(): SystemSaveData {
    return this.saveData;
  }

  public getActiveBranch(): TimelineBranch {
    return this.saveData.branches[this.saveData.activeBranchId];
  }

  public getSettings(): SystemSettings {
    return this.saveData.settings;
  }

  public updateSettings(updates: Partial<SystemSettings>): SystemSettings {
    this.saveData.settings = { ...this.saveData.settings, ...updates };
    this.persist();
    return this.saveData.settings;
  }

  public createInitialSaveData(): SystemSaveData {
    const defaultVfs = new VirtualFileSystem();
    const branchId = 'branch_prime';

    const primeBranch: TimelineBranch = {
      id: branchId,
      name: 'Timeline Prime (Canonical)',
      description: 'Original baseline timeline recovered from Station Epsilon hardware.',
      createdAt: new Date().toISOString(),
      parentBranchId: null,
      vfs: defaultVfs.getNodes(),
      clues: JSON.parse(JSON.stringify(SEED_CLUES)),
      evidenceNodes: JSON.parse(JSON.stringify(SEED_EVIDENCE_NODES)),
      evidenceEdges: JSON.parse(JSON.stringify(SEED_EVIDENCE_EDGES)),
      hypotheses: JSON.parse(JSON.stringify(SEED_HYPOTHESES)),
      notes: JSON.parse(JSON.stringify(SEED_NOTES)),
      timeline: JSON.parse(JSON.stringify(SEED_TIMELINE_EVENTS)),
      emails: JSON.parse(JSON.stringify(SEED_EMAILS)),
      mailAccounts: JSON.parse(JSON.stringify(SEED_MAIL_ACCOUNTS)),
      chatMessages: JSON.parse(JSON.stringify(SEED_CHAT_MESSAGES)),
      discoveredWebsites: ['orpheus.org', 'luminarydynamics.com', 'globalchronicle.com', 'netboard99.org'],
      historyLog: ['System booted at Station Epsilon recovery terminal.'],
    };

    const initialSave: SystemSaveData = {
      version: '1.0.0',
      activeBranchId: branchId,
      branches: {
        [branchId]: primeBranch,
      },
      settings: { ...DEFAULT_SETTINGS },
      openWindows: [],
      notifications: [
        {
          id: 'notif_welcome',
          title: 'System Terminal Online',
          message: 'Recovered drive mounted. 40+ ArcaNet websites and archives accessible.',
          timestamp: '22:04',
          type: 'info',
          appId: 'explorer',
          read: false,
        },
      ],
      lastSavedAt: new Date().toISOString(),
    };

    return initialSave;
  }

  public branchTimeline(name: string, description: string): TimelineBranch {
    const current = this.getActiveBranch();
    const newBranchId = `branch_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const newBranch: TimelineBranch = {
      id: newBranchId,
      name,
      description,
      createdAt: new Date().toISOString(),
      parentBranchId: current.id,
      vfs: JSON.parse(JSON.stringify(current.vfs)),
      clues: JSON.parse(JSON.stringify(current.clues)),
      evidenceNodes: JSON.parse(JSON.stringify(current.evidenceNodes)),
      evidenceEdges: JSON.parse(JSON.stringify(current.evidenceEdges)),
      hypotheses: JSON.parse(JSON.stringify(current.hypotheses)),
      notes: JSON.parse(JSON.stringify(current.notes)),
      timeline: JSON.parse(JSON.stringify(current.timeline)),
      emails: JSON.parse(JSON.stringify(current.emails)),
      mailAccounts: JSON.parse(JSON.stringify(current.mailAccounts)),
      chatMessages: JSON.parse(JSON.stringify(current.chatMessages)),
      discoveredWebsites: [...current.discoveredWebsites],
      historyLog: [...current.historyLog, `Branched from "${current.name}" at ${new Date().toLocaleTimeString()}`],
    };

    this.saveData.branches[newBranchId] = newBranch;
    this.saveData.activeBranchId = newBranchId;
    this.persist();

    return newBranch;
  }

  public switchBranch(branchId: string): TimelineBranch {
    if (!this.saveData.branches[branchId]) {
      throw new Error(`Branch with ID "${branchId}" does not exist.`);
    }
    this.saveData.activeBranchId = branchId;
    this.persist();
    return this.saveData.branches[branchId];
  }

  public deleteBranch(branchId: string): void {
    if (branchId === 'branch_prime') {
      throw new Error('Cannot delete prime canonical branch.');
    }
    if (this.saveData.activeBranchId === branchId) {
      this.saveData.activeBranchId = 'branch_prime';
    }
    delete this.saveData.branches[branchId];
    this.persist();
  }

  public updateActiveBranchState(updates: Partial<TimelineBranch>): void {
    const branch = this.getActiveBranch();
    Object.assign(branch, updates);
    this.saveData.lastSavedAt = new Date().toISOString();
    this.persist();
  }

  public resetToFactory(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.saveData = this.createInitialSaveData();
    this.persist();
  }

  public exportJSON(): string {
    return JSON.stringify(this.saveData, null, 2);
  }

  public importJSON(jsonStr: string): void {
    const parsed = JSON.parse(jsonStr) as SystemSaveData;
    if (!parsed.branches || !parsed.activeBranchId || !parsed.settings) {
      throw new Error('Invalid SomniaOS save archive format.');
    }
    this.saveData = parsed;
    this.persist();
  }

  private loadFromStorage(): SystemSaveData | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  private persist(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.saveData));
      } catch {}
    }
  }
}
