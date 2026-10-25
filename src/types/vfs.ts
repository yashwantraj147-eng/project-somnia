export type FilePermission = 'public' | 'confidential' | 'restricted' | 'eyes_only';

export type FileType = 'text' | 'markdown' | 'log' | 'image' | 'audio' | 'data' | 'archive' | 'script';

export interface VFSNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'directory';
  parentId: string | null;
  size: number; // in bytes
  createdAt: string;
  modifiedAt: string;
  permission: FilePermission;
  tags: string[];
  isFavorite?: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
  originalPath?: string; // used when restored from recycle bin
  // File specific
  mimeType?: string;
  fileType?: FileType;
  content?: string;
  isCorrupted?: boolean;
  originalRevision?: string;
  history?: {
    timestamp: string;
    description: string;
    diffSnippet?: string;
  }[];
  metadata?: Record<string, string>;
  clueId?: string;
  contradictionWith?: string;
}

export interface VFSSearchQuery {
  term?: string;
  type?: 'file' | 'directory';
  tag?: string;
  permission?: FilePermission;
  minSize?: number;
  maxSize?: number;
  includeDeleted?: boolean;
}
