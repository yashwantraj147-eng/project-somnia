import { NarrativeArc } from './clues';

export interface TimelineEvent {
  id: string;
  year: number;
  dateStr: string; // e.g. "September 26, 1983"
  title: string;
  summary: string;
  details: string;
  arc: NarrativeArc;
  institution: string;
  characters: string[];
  evidenceIds: string[];
  isContradictory?: boolean;
  contradictionNote?: string;
  conflictingEventId?: string;
  anomalySeverity: number; // 0 to 5
  discovered: boolean;
  requiresClueId?: string;
}
