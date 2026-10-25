export interface ChatMessage {
  id: string;
  channelId: string;
  sender: string;
  senderRole?: string;
  timestamp: string;
  text: string;
  avatarColor: string;
  clueId?: string;
  isRedacted?: boolean;
}

export interface ChatChannel {
  id: string;
  name: string;
  topic: string;
  isPrivate?: boolean;
  memberCount: number;
  unreadCount: number;
}
