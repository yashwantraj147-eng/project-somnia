export interface CommandToken {
  type: 'word' | 'flag' | 'pipe' | 'redirect' | 'string';
  value: string;
}

export interface ParsedCommand {
  command: string;
  args: string[];
  flags: Record<string, boolean | string>;
  pipeTo?: ParsedCommand;
  redirectTo?: string;
  rawInput: string;
}

export interface CommandContext {
  cwd: string;
  env: Record<string, string>;
  user: string;
  clearanceLevel: number;
}

export interface CommandResult {
  output: string;
  error?: string;
  exitCode: number;
  newCwd?: string;
  newEnv?: Record<string, string>;
  newClearance?: number;
  systemAction?: {
    type: 'reboot' | 'theme' | 'clear' | 'open_app' | 'play_audio' | 'unlock_clue';
    payload?: any;
  };
}
