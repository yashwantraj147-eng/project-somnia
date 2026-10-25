export interface EmailAttachment {
  name: string;
  size: string;
  type: string;
  targetApp?: string; // e.g. 'explorer' | 'media' | 'texteditor'
  targetPath?: string; // target file path in VFS
}

export interface EmailMessage {
  id: string;
  accountId: string; // which user account this message belongs to
  folder: 'inbox' | 'sent' | 'drafts' | 'archive' | 'trash';
  from: string;
  to: string;
  date: string;
  subject: string;
  body: string;
  isRead: boolean;
  isFlagged?: boolean;
  labels: string[];
  attachments?: EmailAttachment[];
  clueId?: string;
  threadId?: string;
}

export interface MailAccount {
  id: string;
  email: string;
  displayName: string;
  role: string;
  avatarColor: string;
  isUnlocked: boolean;
  unlockRequirementHint?: string;
  unlockClueId?: string;
}
