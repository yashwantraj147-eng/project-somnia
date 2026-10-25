export type EvidenceNodeType =
  | 'person'
  | 'event'
  | 'document'
  | 'anomaly'
  | 'organization'
  | 'location';

export interface EvidenceNode {
  id: string;
  label: string;
  type: EvidenceNodeType;
  summary: string;
  x: number;
  y: number;
  confidence: number; // 0 to 100
  isPinned: boolean;
  linkedClueId?: string;
  linkedArtifactUri?: string;
  isUserCreated: boolean;
}

export type RelationType =
  | 'contradicts'
  | 'mentions'
  | 'created_by'
  | 'witnessed'
  | 'coverup'
  | 'suspects'
  | 'communicated_with'
  | 'caused';

export interface EvidenceEdge {
  id: string;
  source: string; // node id
  target: string; // node id
  relation: RelationType;
  label: string;
  confidence: number; // 0 to 100
  notes?: string;
  isUserCreated: boolean;
  discovered: boolean;
}

export interface UserHypothesis {
  id: string;
  title: string;
  description: string;
  supportingNodeIds: string[];
  contradictingNodeIds: string[];
  confidence: number; // 0 to 100
  createdAt: string;
  updatedAt: string;
}

export interface InvestigatorNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
