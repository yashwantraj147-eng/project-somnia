export type AppId =
  | 'browser'
  | 'mail'
  | 'relay'
  | 'explorer'
  | 'terminal'
  | 'media'
  | 'search'
  | 'timeline'
  | 'investigator'
  | 'sysmon'
  | 'texteditor'
  | 'statemanager'
  | 'settings';

export type OSTheme =
  | 'retro-98'         // Classic 1998 enterprise teal / gray
  | 'amber-terminal'   // Phosphor monochrome amber 80s research lab
  | 'obsidian-cobalt'  // Deep space telemetry midnight blue
  | 'polar-teal'       // Cryogenic Svalbard clean daylight
  | 'anomaly-breach';  // Corrupted reality magenta/cyan glitch

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  isFocused: boolean;
  initialParams?: Record<string, any>;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  role: string;
  clearanceLevel: number; // 1 to 5
  avatarColor: string;
  statusNote: string;
}

export interface SystemSettings {
  theme: OSTheme;
  volume: number;
  soundEnabled: boolean;
  scanlines: boolean;
  crtCurvature: boolean;
  reducedMotion: boolean;
  glitchFrequency: 'off' | 'low' | 'normal' | 'high';
  hintMode: 'detective' | 'guided';
  clock24h: boolean;
  activeUserId: string;
  wallpaper: 'default-grid' | 'sonar-drift' | 'satellite-1983' | 'deep-borehole' | 'monochrome-star';
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'alert' | 'clue';
  appId?: AppId;
  read: boolean;
}
