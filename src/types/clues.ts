export type NarrativeArc =
  | 1 // The Orpheus Event & Aleutian Trench
  | 2 // The Petrov 1983 Discrepancy
  | 3 // The Cognitive Carrier (Sub-Harmonic Voices)
  | 4 // The Whistleblower Syndicate
  | 5 // The Somnia Protocol;

export interface ClueRequirement {
  type: 'file_viewed' | 'email_read' | 'page_visited' | 'command_run' | 'chat_read' | 'track_listened' | 'clues_unlocked';
  targetId: string;
}

export interface ClueUnlockAction {
  type: 'unlock_file' | 'unlock_email_account' | 'unlock_hidden_page' | 'unlock_channel' | 'add_log_entry';
  payload: any;
}

export interface Clue {
  id: string;
  code: string; // e.g. "CLUE-ORP-01"
  title: string;
  description: string;
  arc: NarrativeArc;
  category: 'document' | 'signal' | 'person' | 'date' | 'contradiction' | 'cipher';
  discovered: boolean;
  discoveredAt?: string;
  provenance: string; // "Found by examining the corrupted header in /archive/1983_petrov/radar_log.dat"
  requirements: ClueRequirement[];
  unlockActions?: ClueUnlockAction[];
  contradictionWith?: string; // id of conflicting clue/event
  relatedEntityIds: string[]; // ids of people, places, dates, documents
}
