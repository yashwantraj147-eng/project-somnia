import { WindowState, SystemSettings, SystemNotification } from './os';
import { VFSNode } from './vfs';
import { EmailMessage, MailAccount } from './mail';
import { ChatMessage, ChatChannel } from './chat';
import { Clue } from './clues';
import { EvidenceNode, EvidenceEdge, UserHypothesis, InvestigatorNote } from './investigation';
import { TimelineEvent } from './timeline';

export interface TimelineBranch {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  parentBranchId: string | null;
  // Snapshot of state for this branch
  vfs: Record<string, VFSNode>;
  clues: Clue[];
  evidenceNodes: EvidenceNode[];
  evidenceEdges: EvidenceEdge[];
  hypotheses: UserHypothesis[];
  notes: InvestigatorNote[];
  timeline: TimelineEvent[];
  emails: EmailMessage[];
  mailAccounts: MailAccount[];
  chatMessages: ChatMessage[];
  discoveredWebsites: string[]; // URLs
  historyLog: string[];
}

export interface SystemSaveData {
  version: string;
  activeBranchId: string;
  branches: Record<string, TimelineBranch>;
  settings: SystemSettings;
  openWindows: WindowState[];
  notifications: SystemNotification[];
  lastSavedAt: string;
}
