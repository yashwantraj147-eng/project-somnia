export interface TranscriptSegment {
  timeSeconds: number;
  speaker: string;
  text: string;
  clueId?: string;
  isImportant?: boolean;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  durationSeconds: number;
  category: 'telemetry' | 'hydrophone' | 'wiretap' | 'broadcast' | 'ambient';
  synthPreset: 'schumann_resonance' | 'pulsar_drift' | 'aleutian_hydrophone' | 'vlf_broadcast' | 'tape_decay';
  waveformColor: string;
  transcripts: TranscriptSegment[];
  description: string;
}
