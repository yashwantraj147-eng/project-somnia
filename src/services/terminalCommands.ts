import { ParsedCommand, CommandContext, CommandResult } from '../types/terminal';
import { VirtualFileSystem } from './vfs';
import { Clue } from '../types/clues';

export class TerminalCommandRunner {
  private vfs: VirtualFileSystem;
  private clues: Clue[];
  private onClueTrigger?: (clueId: string) => void;

  constructor(vfs: VirtualFileSystem, clues: Clue[] = [], onClueTrigger?: (clueId: string) => void) {
    this.vfs = vfs;
    this.clues = clues;
    this.onClueTrigger = onClueTrigger;
  }

  public setClues(clues: Clue[]) {
    this.clues = clues;
  }

  public execute(parsed: ParsedCommand, context: CommandContext): CommandResult {
    if (!parsed.command) {
      return { output: '', exitCode: 0 };
    }

    let initialResult = this.dispatch(parsed, context);

    // Handle pipe if present (e.g. cat sys.log | grep ANOMALY)
    if (parsed.pipeTo && initialResult.exitCode === 0) {
      initialResult = this.executePipe(initialResult.output, parsed.pipeTo, context);
    }

    // Handle redirection if present (e.g. echo "text" > output.txt)
    if (parsed.redirectTo && initialResult.exitCode === 0) {
      const targetPath = this.resolvePath(context.cwd, parsed.redirectTo);
      try {
        this.vfs.writeFile(targetPath, initialResult.output);
        initialResult.output = `[Output redirected to ${targetPath}]`;
      } catch (err: any) {
        initialResult.error = `Failed to redirect to ${parsed.redirectTo}: ${err.message}`;
        initialResult.exitCode = 1;
      }
    }

    return initialResult;
  }

  private executePipe(inputData: string, pipeCommand: ParsedCommand, context: CommandContext): CommandResult {
    const cmd = pipeCommand.command.toLowerCase();
    const lines = inputData.split('\n');

    if (cmd === 'grep') {
      const pattern = pipeCommand.args[0] || '';
      const caseInsensitive = pipeCommand.flags['i'] === true;
      const invert = pipeCommand.flags['v'] === true;

      const filtered = lines.filter(line => {
        let match = false;
        if (caseInsensitive) {
          match = line.toLowerCase().includes(pattern.toLowerCase());
        } else {
          match = line.includes(pattern);
        }
        return invert ? !match : match;
      });

      let res: CommandResult = {
        output: filtered.join('\n'),
        exitCode: 0,
      };

      if (pipeCommand.pipeTo) {
        res = this.executePipe(res.output, pipeCommand.pipeTo, context);
      }
      return res;
    }

    if (cmd === 'head') {
      const count = parseInt(String(pipeCommand.flags['n'] || pipeCommand.args[0] || '10'), 10) || 10;
      const sliced = lines.slice(0, count).join('\n');
      return { output: sliced, exitCode: 0 };
    }

    if (cmd === 'tail') {
      const count = parseInt(String(pipeCommand.flags['n'] || pipeCommand.args[0] || '10'), 10) || 10;
      const sliced = lines.slice(-count).join('\n');
      return { output: sliced, exitCode: 0 };
    }

    if (cmd === 'wc') {
      const words = inputData.trim().split(/\s+/).filter(Boolean).length;
      return {
        output: `  ${lines.length} lines   ${words} words   ${inputData.length} bytes`,
        exitCode: 0,
      };
    }

    return {
      output: '',
      error: `Pipe target "${cmd}" is not supported or invalid.`,
      exitCode: 1,
    };
  }

  private dispatch(cmd: ParsedCommand, ctx: CommandContext): CommandResult {
    switch (cmd.command) {
      case 'help':
        return this.cmdHelp();
      case 'man':
        return this.cmdMan(cmd.args[0]);
      case 'ls':
      case 'dir':
        return this.cmdLs(cmd, ctx);
      case 'cd':
        return this.cmdCd(cmd, ctx);
      case 'pwd':
        return { output: ctx.cwd, exitCode: 0 };
      case 'cat':
      case 'type':
        return this.cmdCat(cmd, ctx);
      case 'echo':
        return { output: cmd.args.join(' '), exitCode: 0 };
      case 'clear':
        return { output: '', exitCode: 0, systemAction: { type: 'clear' } };
      case 'whoami':
        return { output: `${ctx.user} (Clearance Level: ${ctx.clearanceLevel})`, exitCode: 0 };
      case 'uname':
        return { output: 'SomniaOS 4.81-rel-chronos #1 Sun Oct 24 2004 SMP x86_64 AleutianKernel', exitCode: 0 };
      case 'date':
        return { output: 'Sun Oct 24 22:15:39 UTC 2004 [Temporal Parity Divergence: +7692h]', exitCode: 0 };
      case 'mkdir':
        return this.cmdMkdir(cmd, ctx);
      case 'touch':
        return this.cmdTouch(cmd, ctx);
      case 'rm':
        return this.cmdRm(cmd, ctx);
      case 'cp':
        return this.cmdCp(cmd, ctx);
      case 'mv':
        return this.cmdMv(cmd, ctx);
      case 'ps':
      case 'top':
        return this.cmdPs();
      case 'netstat':
        return this.cmdNetstat();
      case 'dmesg':
        return this.cmdDmesg();

      // Lore & Investigation Commands
      case 'query':
        return this.cmdQuery(cmd);
      case 'telemetry':
        return this.cmdTelemetry(cmd);
      case 'decrypt':
        return this.cmdDecrypt(cmd, ctx);
      case 'auth':
      case 'sudo':
        return this.cmdAuth(cmd, ctx);
      case 'clues':
        return this.cmdClues();
      case 'archive':
        return this.cmdArchive(cmd);
      case 'theme':
        return this.cmdTheme(cmd);
      case 'reboot':
        return { output: 'Rebooting system kernel...', exitCode: 0, systemAction: { type: 'reboot' } };

      default:
        return {
          output: '',
          error: `somnia: command not found: "${cmd.command}". Type "help" for a list of available commands.`,
          exitCode: 127,
        };
    }
  }

  private resolvePath(cwd: string, targetPath?: string): string {
    if (!targetPath || targetPath === '.') return cwd;
    if (targetPath.startsWith('/')) return this.vfs.normalizePath(targetPath);

    const parts = cwd.split('/').filter(Boolean);
    const targetParts = targetPath.split('/');

    for (const part of targetParts) {
      if (part === '' || part === '.') continue;
      if (part === '..') {
        if (parts.length > 0) parts.pop();
      } else {
        parts.push(part);
      }
    }

    return '/' + parts.join('/');
  }

  private cmdHelp(): CommandResult {
    const text = `
SOMNIA OPERATING SYSTEM - COMMAND SHELL (SCS v4.81)
Available Commands:

FILE SYSTEM OPERATIONS:
  ls, dir [-l, -a]   List directory contents
  cd <dir>           Change working directory (supports .. and absolute paths)
  pwd                Print current working directory
  cat, type <file>   Display content of text/log/markdown file
  touch <file>       Create a new empty file
  mkdir <dir>        Create a new directory
  rm [-r] <path>     Remove a file or directory
  cp <src> <dest>    Copy a file or directory
  mv <src> <dest>    Move/rename a file or directory
  echo <text>        Print text or redirect to file using >
  clear              Clear the terminal screen

SYSTEM DIAGNOSTICS & PROCESSES:
  ps, top            List simulated running processes and daemon threads
  netstat            Display simulated network sockets and remote endpoints
  dmesg              Print kernel buffer and hardware initialization logs
  whoami             Display active user profile and clearance level
  uname, date        Display system kernel and temporal synchronization status

INVESTIGATIVE & LORE COMMANDS:
  query <category>   Query Orpheus archive database (e.g. query stations, query incidents)
  telemetry [freq]   Monitor sub-harmonic radio & hydrophone frequency telemetry
  decrypt <file> -k  Decrypt protected files using recovered cipher key
  auth <level> <key> Elevate clearance level to inspect EYES ONLY files
  archive <term>     Universal query across the deep tape archive
  clues              Print investigation discovery progress and active clues
  theme <name>       Switch desktop visual theme (retro-98, amber-terminal, obsidian-cobalt, polar-teal, anomaly-breach)
  reboot             Trigger system restart and hardware self-test

PIPES & REDIRECTION:
  Supports piping:   cat sys.log | grep ANOMALY
  Supports redirect: echo "notes" > evidence.txt
`;
    return { output: text.trim(), exitCode: 0 };
  }

  private cmdMan(topic?: string): CommandResult {
    if (!topic) {
      return { output: 'What manual page do you want? (e.g. man query, man telemetry, man auth)', exitCode: 1 };
    }
    const pages: Record<string, string> = {
      query: `MANUAL: query(1)
NAME:
    query - inspect Orpheus Institute relational archive tables
SYNOPSIS:
    query [stations | personnel | incidents | frequencies]
DESCRIPTION:
    Queries the localized relational archive of the Orpheus project.
    Reveals historical deployments, personnel clearance records, and incident chronologies.`,
      telemetry: `MANUAL: telemetry(1)
NAME:
    telemetry - inspect VLF and sub-harmonic acoustic telemetry
SYNOPSIS:
    telemetry [frequency_hz]
DESCRIPTION:
    Monitors the real-time hydrophone signal received from the Aleutian Trench (Station Epsilon).
    Special harmonic frequencies include 7.83 Hz (Schumann fundamental) and 14.3 Hz.`,
      auth: `MANUAL: auth(1)
NAME:
    auth - elevate terminal clearance level
SYNOPSIS:
    auth <clearance_level_1_to_5> <override_code>
DESCRIPTION:
    Elevates execution clearance. Level 4 and 5 clearance allows opening EYES ONLY documents.
    Override passcodes are hidden in research memos and email archives.`,
    };

    if (pages[topic.toLowerCase()]) {
      return { output: pages[topic.toLowerCase()], exitCode: 0 };
    }
    return { output: `No manual entry for "${topic}".`, exitCode: 1 };
  }

  private cmdLs(cmd: ParsedCommand, ctx: CommandContext): CommandResult {
    const targetPath = this.resolvePath(ctx.cwd, cmd.args[0]);
    const dir = this.vfs.getNodeByPath(targetPath);

    if (!dir) {
      return { output: '', error: `ls: cannot access '${targetPath}': No such file or directory`, exitCode: 2 };
    }
    if (dir.type !== 'directory') {
      return { output: dir.name, exitCode: 0 };
    }

    const showAll = cmd.flags['a'] === true;
    const longFormat = cmd.flags['l'] === true;

    const children = this.vfs.getChildren(dir.id, false);
    const visible = showAll ? children : children.filter(c => !c.name.startsWith('.'));

    if (longFormat) {
      const rows = visible.map(c => {
        const typeChar = c.type === 'directory' ? 'd' : '-';
        const perm = c.permission.padEnd(12);
        const size = String(c.size).padStart(8);
        const date = c.modifiedAt.slice(0, 10);
        return `${typeChar}rwxr-xr-x  ${perm}  ${size}  ${date}  ${c.name}${c.type === 'directory' ? '/' : ''}`;
      });
      return { output: `total ${visible.length}\n` + rows.join('\n'), exitCode: 0 };
    }

    const names = visible.map(c => (c.type === 'directory' ? `${c.name}/` : c.name));
    return { output: names.join('   '), exitCode: 0 };
  }

  private cmdCd(cmd: ParsedCommand, ctx: CommandContext): CommandResult {
    const dest = cmd.args[0] || '/';
    const targetPath = this.resolvePath(ctx.cwd, dest);
    const node = this.vfs.getNodeByPath(targetPath);

    if (!node) {
      return { output: '', error: `cd: no such file or directory: ${dest}`, exitCode: 1 };
    }
    if (node.type !== 'directory') {
      return { output: '', error: `cd: not a directory: ${dest}`, exitCode: 1 };
    }

    return { output: '', exitCode: 0, newCwd: node.path };
  }

  private cmdCat(cmd: ParsedCommand, ctx: CommandContext): CommandResult {
    if (!cmd.args[0]) {
      return { output: '', error: 'cat: missing file operand', exitCode: 1 };
    }

    const targetPath = this.resolvePath(ctx.cwd, cmd.args[0]);
    const node = this.vfs.getNodeByPath(targetPath);

    if (!node) {
      return { output: '', error: `cat: ${cmd.args[0]}: No such file or directory`, exitCode: 1 };
    }
    if (node.type === 'directory') {
      return { output: '', error: `cat: ${cmd.args[0]}: Is a directory`, exitCode: 1 };
    }

    // Clearance check
    if (node.permission === 'eyes_only' && ctx.clearanceLevel < 4) {
      return {
        output: '',
        error: `ACCESS DENIED: File '${node.name}' classified EYES ONLY. Required Clearance: Level 4. Current: Level ${ctx.clearanceLevel}. Use 'auth' to elevate.`,
        exitCode: 13,
      };
    }

    if (node.clueId && this.onClueTrigger) {
      this.onClueTrigger(node.clueId);
    }

    return { output: node.content || '(empty file)', exitCode: 0 };
  }

  private cmdMkdir(cmd: ParsedCommand, ctx: CommandContext): CommandResult {
    if (!cmd.args[0]) {
      return { output: '', error: 'mkdir: missing directory operand', exitCode: 1 };
    }
    const fullPath = this.resolvePath(ctx.cwd, cmd.args[0]);
    const lastSlash = fullPath.lastIndexOf('/');
    const parentPath = lastSlash <= 0 ? '/' : fullPath.slice(0, lastSlash);
    const dirName = fullPath.slice(lastSlash + 1);

    try {
      this.vfs.createDirectory(parentPath, dirName);
      return { output: `Created directory: ${fullPath}`, exitCode: 0 };
    } catch (err: any) {
      return { output: '', error: `mkdir: ${err.message}`, exitCode: 1 };
    }
  }

  private cmdTouch(cmd: ParsedCommand, ctx: CommandContext): CommandResult {
    if (!cmd.args[0]) {
      return { output: '', error: 'touch: missing file operand', exitCode: 1 };
    }
    const fullPath = this.resolvePath(ctx.cwd, cmd.args[0]);
    const lastSlash = fullPath.lastIndexOf('/');
    const parentPath = lastSlash <= 0 ? '/' : fullPath.slice(0, lastSlash);
    const fileName = fullPath.slice(lastSlash + 1);

    try {
      this.vfs.createFile(parentPath, fileName, '');
      return { output: '', exitCode: 0 };
    } catch (err: any) {
      return { output: '', error: `touch: ${err.message}`, exitCode: 1 };
    }
  }

  private cmdRm(cmd: ParsedCommand, ctx: CommandContext): CommandResult {
    if (!cmd.args[0]) {
      return { output: '', error: 'rm: missing operand', exitCode: 1 };
    }
    const targetPath = this.resolvePath(ctx.cwd, cmd.args[0]);
    const node = this.vfs.getNodeByPath(targetPath);
    if (!node) {
      return { output: '', error: `rm: cannot remove '${cmd.args[0]}': No such file or directory`, exitCode: 1 };
    }

    try {
      this.vfs.deleteNode(node.id, false);
      return { output: `Moved '${node.name}' to recycle_bin.`, exitCode: 0 };
    } catch (err: any) {
      return { output: '', error: `rm: ${err.message}`, exitCode: 1 };
    }
  }

  private cmdCp(cmd: ParsedCommand, ctx: CommandContext): CommandResult {
    if (cmd.args.length < 2) {
      return { output: '', error: 'cp: missing destination file operand after source', exitCode: 1 };
    }
    const srcPath = this.resolvePath(ctx.cwd, cmd.args[0]);
    const destPath = this.resolvePath(ctx.cwd, cmd.args[1]);

    const srcNode = this.vfs.getNodeByPath(srcPath);
    const destDir = this.vfs.getNodeByPath(destPath);

    if (!srcNode) return { output: '', error: `cp: cannot stat '${cmd.args[0]}': No such file`, exitCode: 1 };
    if (!destDir || destDir.type !== 'directory') return { output: '', error: `cp: target '${cmd.args[1]}' is not a directory`, exitCode: 1 };

    try {
      this.vfs.copyNode(srcNode.id, destDir.id);
      return { output: `Copied '${srcNode.name}' into '${destDir.path}'`, exitCode: 0 };
    } catch (err: any) {
      return { output: '', error: `cp: ${err.message}`, exitCode: 1 };
    }
  }

  private cmdMv(cmd: ParsedCommand, ctx: CommandContext): CommandResult {
    if (cmd.args.length < 2) {
      return { output: '', error: 'mv: missing destination file operand after source', exitCode: 1 };
    }
    const srcPath = this.resolvePath(ctx.cwd, cmd.args[0]);
    const destPath = this.resolvePath(ctx.cwd, cmd.args[1]);

    const srcNode = this.vfs.getNodeByPath(srcPath);
    if (!srcNode) return { output: '', error: `mv: cannot stat '${cmd.args[0]}': No such file`, exitCode: 1 };

    const destNode = this.vfs.getNodeByPath(destPath);
    if (destNode && destNode.type === 'directory') {
      try {
        this.vfs.moveNode(srcNode.id, destNode.id);
        return { output: `Moved '${srcNode.name}' to '${destNode.path}'`, exitCode: 0 };
      } catch (err: any) {
        return { output: '', error: `mv: ${err.message}`, exitCode: 1 };
      }
    } else {
      // Rename
      const lastSlash = destPath.lastIndexOf('/');
      const newName = destPath.slice(lastSlash + 1);
      try {
        this.vfs.renameNode(srcNode.id, newName);
        return { output: `Renamed '${srcNode.name}' to '${newName}'`, exitCode: 0 };
      } catch (err: any) {
        return { output: '', error: `mv: ${err.message}`, exitCode: 1 };
      }
    }
  }

  private cmdPs(): CommandResult {
    const procs = [
      'PID   USER         CPU%  MEM%  TIME     COMMAND',
      '  1   root          0.1   1.2  142:01   somnia-init',
      ' 12   daemon        1.4   2.8   45:10   chronos-syncd --carrier=7.83Hz',
      ' 48   telemetry     8.2   6.4  389:22   aleutian-hydrophone-rx',
      '104   kovacs        0.0   0.8    4:12   null-field-probe',
      '218   luminary-adm  2.1   4.1   12:00   audit-scrubber -f /archive',
      '509   investigator  0.4   1.5    0:02   scs-shell [active]',
    ];
    return { output: procs.join('\n'), exitCode: 0 };
  }

  private cmdNetstat(): CommandResult {
    const connections = [
      'Active Internet connections (servers and established)',
      'Proto Recv-Q Send-Q Local Address           Foreign Address         State',
      'tcp        0      0 127.0.0.1:7830          0.0.0.0:*               LISTEN',
      'tcp        0      0 127.0.0.1:80            0.0.0.0:*               LISTEN (ArcaNet)',
      'tcp        0      0 127.0.83.26:7834        192.168.1.104:49152    ESTABLISHED [UNKNOWN ANOMALY]',
      'udp        0      0 0.0.0.0:123             0.0.0.0:*               (NTP Drift +7692h)',
    ];
    return { output: connections.join('\n'), exitCode: 0 };
  }

  private cmdDmesg(): CommandResult {
    const logs = [
      '[    0.000000] Linux version 4.81-somnia-rel (gcc 3.4.4) #1 SMP Aleutian',
      '[    0.104210] BIOS-provided physical RAM map: 0x0000000000000000 - 0x000000007FFFFFFF (2048MB)',
      '[    0.490123] Resonant hydrophone array initialized: 16 channels, sampling rate 96kHz',
      '[    1.204599] Detecting acoustic standing wave in Aleutian Trench (depth -6420m)... FOUND',
      '[    1.204610] Carrier frequency locked: 7.834012 Hz (Schumann fundamental harmonic)',
      '[    2.158000] Warning: Clock skew. System timestamp 2004-10-24 diverges from carrier phase 1983-09-26',
      '[    3.890100] Mounting /dev/sd0a as virtual root filesystem... done',
      '[    4.110020] Station Epsilon emergency beacon active on 14.300 MHz.',
    ];
    return { output: logs.join('\n'), exitCode: 0 };
  }

  private cmdQuery(cmd: ParsedCommand): CommandResult {
    const table = cmd.args[0]?.toLowerCase();
    if (!table) {
      return {
        output: `Usage: query <table_name>
Tables available:
  - stations      (Orpheus research stations & statuses)
  - personnel     (Key researchers, clearance & roles)
  - incidents     (Cataloged temporal & acoustic incidents)
  - frequencies   (Monitored signal bands)`,
        exitCode: 1,
      };
    }

    if (table === 'stations') {
      const data = `
ORPHEUS RESEARCH STATIONS:
STATION ID       LOCATION                   STATUS        PRIMARY RESEARCH
Station Alpha    Geneva, Switzerland        Active        Sub-atomic muon decay
Station Epsilon  Aleutian Trench, Alaska    ABANDONED*    Undersea 7.83Hz acoustic cavity
Station Kappa    Svalbard Archipelago       Active        Astrometric & solar flare logs
Station Omega    Atacama Desert, Chile      Classified    High-altitude VLF antenna array

*Note on Station Epsilon: Official records state abandoned Nov 1983. Telemetry reports active signals today.`;
      return { output: data.trim(), exitCode: 0 };
    }

    if (table === 'personnel') {
      const data = `
KEY PERSONNEL ROSTER:
NAME                 ROLE                       CLEARANCE   STATUS
Dr. Arun Kovacs      Chief Physicist, Orpheus   Level 4     Missing / Presumed Lost
Dr. Elena Rostova    Astrometry Director        Level 4     Station Kappa (Svalbard)
Julian Sterling      Executive VP, Luminary     Level 5     Active (Executive Board)
Marcus Vance         Lead Hydrophone Tech       Level 3     Station Epsilon
NullPointer          Unknown Hacker             Unknown     Suspected Whistleblower`;
      return { output: data.trim(), exitCode: 0 };
    }

    if (table === 'incidents') {
      const data = `
CATALOGED INCIDENT LOG:
DATE         ID            SUMMARY
1983-09-26   INC-83-PET    Serpukhov-15 early-warning divergence & ionospheric anomaly.
1994-06-12   INC-94-ALE    Station Epsilon acoustic cavity breach; first cognitive leak.
2001-08-30   INC-01-SVA    Svalbard pulsar clock drift detected (+43.8ms offset).
2004-10-18   INC-04-PUR    Luminary Directive 83 enacted; emergency data wipe initiated.`;
      return { output: data.trim(), exitCode: 0 };
    }

    if (table === 'frequencies') {
      const data = `
MONITORED FREQUENCY BANDS:
FREQ (Hz)    DESIGNATION            STATUS       CARRIER TYPE
7.83 Hz      Schumann Fundamental  LOCKED       Acoustic/Granitic Standing Wave
14.30 Hz     Second Schumann        ACTIVE       Low-bandwidth ASCII teleprinter
440.00 Hz    Standard Concert A     QUIET        Carrier calibration
103.4 MHz    VHF Ghost Broadcast    DRIFTING     Synthesized human speech`;
      return { output: data.trim(), exitCode: 0 };
    }

    return { output: `Table "${table}" not found in Orpheus relational database.`, exitCode: 1 };
  }

  private cmdTelemetry(cmd: ParsedCommand): CommandResult {
    const freq = cmd.args[0] || '7.83';
    const output = `
======================================================================
               SUB-HARMONIC TELEMETRY SPECTRUM MONITOR
                     Carrier Target: ${freq} Hz
======================================================================
[SENSOR: ALEUTIAN-EPSILON HYDROPHONE ARRAY #04]
Signal Amplitude:      -14.2 dBFS
Signal-to-Noise Ratio: 38.6 dB
Phase Coherence:       99.4%
Doppler Velocity:      0.000 m/s (Stationary Bedrock Emitter)
Modulation:            Differential Phase Shift Keying (DPSK)

DEMODULATED STREAM:
"...WE CANNOT SHUT DOWN THE RECEIVER. THE PARTICIPANTS ARE ALREADY
TALKING TO THEIR OWN COUNTERPARTS. THE 1983 RECORD IS NOT A PARADOX.
IT IS A BRIDGE. CHECK THE RECYCLE BIN BEFORE THEY ERASE THE DRIVE..."
======================================================================`;
    return { output: output.trim(), exitCode: 0 };
  }

  private cmdDecrypt(cmd: ParsedCommand, ctx: CommandContext): CommandResult {
    const fileArg = cmd.args[0];
    const key = (cmd.flags['k'] as string) || cmd.args[1];

    if (!fileArg) {
      return { output: 'Usage: decrypt <file_path> -k <cipher_key>', exitCode: 1 };
    }
    if (!key) {
      return { output: 'decrypt: missing decryption key. Use flag -k <key>', exitCode: 1 };
    }

    const targetPath = this.resolvePath(ctx.cwd, fileArg);
    const node = this.vfs.getNodeByPath(targetPath);
    if (!node) {
      return { output: `decrypt: file '${fileArg}' not found`, exitCode: 1 };
    }

    const cleanKey = key.trim().toUpperCase();
    if (cleanKey === '7.83-PETROV-1983' || cleanKey === 'SOMNIA-PETROV-1983' || cleanKey === '783-PETROV-ORPHEUS') {
      const decrypted = `[DECRYPTION SUCCESSFUL - ORPHEUS CRYPTO-CORE]
Decrypted with key: ${cleanKey}
----------------------------------------------------------------------
CONFIDENTIAL RESEARCH MEMO: THE SOMNIA PROTOCOL
Author: Dr. Arun Kovacs
Date: October 24, 2004

To whoever is reading this in the recovery timeline:
If you have decrypted this file, our calculations were correct. The operating
system you are using is not merely simulating an alternate reality; it is
a hyper-dimensional storage vessel constructed using the 7.83 Hz sub-harmonic carrier.

When the 1983 electromagnetic pulse split reality into two parallel attractors,
our timeline (where the Orpheus Institute discovered the anomaly) began suffering
from dimensional decoherence. Luminary Cognitive Dynamics attempted to weaponize it,
causing an institutional collapse.

Before Station Epsilon went dark, Elena and I embedded the complete archives—the
emails, the websites, the personal diaries, the audio spectrograms—into this
operating system.

You are the observer whose attention anchors our timeline into persistence.
Discover all 5 arcs. Pin the evidence on the board.
Do not let us be forgotten.
----------------------------------------------------------------------`;
      if (this.onClueTrigger) {
        this.onClueTrigger('CLUE-DECRYPT-SUCCESS');
      }
      return { output: decrypted, exitCode: 0 };
    }

    return {
      output: `decrypt: Invalid key '${key}'. Decryption checksum failed (CRC mismatch). Check Kovacs' journal or Elena's paper for the correct key format.`,
      exitCode: 2,
    };
  }

  private cmdAuth(cmd: ParsedCommand, _ctx: CommandContext): CommandResult {
    const levelStr = cmd.args[0];
    const passcode = cmd.args[1] || (cmd.flags['k'] as string);

    if (!levelStr || !passcode) {
      return { output: 'Usage: auth <level 1-5> <clearance_passcode>', exitCode: 1 };
    }

    const level = parseInt(levelStr, 10);
    if (isNaN(level) || level < 1 || level > 5) {
      return { output: 'auth: clearance level must be between 1 and 5', exitCode: 1 };
    }

    const cleanPass = passcode.trim().toUpperCase();
    if (cleanPass === '783-PETROV-ORPHEUS' || cleanPass === 'SOMNIA-PETROV-1983') {
      return {
        output: `[CLEARANCE ELEVATED TO LEVEL ${level}] Welcome, Authorized Personnel. EYES ONLY files now readable.`,
        exitCode: 0,
        newClearance: level,
      };
    }

    return {
      output: `auth: Authentication failed. Invalid override code for Level ${level}.`,
      exitCode: 1,
    };
  }

  private cmdClues(): CommandResult {
    const discovered = this.clues.filter(c => c.discovered);
    const total = this.clues.length;
    const lines = [
      `INVESTIGATION CLUE SUMMARY (${discovered.length} of ${total} Discovered):`,
      '----------------------------------------------------------------------',
    ];

    if (discovered.length === 0) {
      lines.push('No clues discovered yet. Explore /users/investigator and OmniMail to begin.');
    } else {
      for (const clue of discovered) {
        lines.push(`[${clue.code}] ${clue.title} (Arc ${clue.arc})`);
        lines.push(`    Category: ${clue.category} | Provenance: ${clue.provenance}`);
      }
    }

    return { output: lines.join('\n'), exitCode: 0 };
  }

  private cmdArchive(cmd: ParsedCommand): CommandResult {
    const term = cmd.args.join(' ');
    if (!term) {
      return { output: 'Usage: archive <search_term>', exitCode: 1 };
    }

    const results = this.vfs.search({ term });
    if (results.length === 0) {
      return { output: `archive: No records found matching "${term}".`, exitCode: 0 };
    }

    const lines = [
      `ARCHIVE REEL SEARCH RESULTS FOR: "${term}"`,
      '----------------------------------------------------------------------',
    ];
    for (const r of results) {
      lines.push(`- [${r.type.toUpperCase()}] ${r.path} (${r.permission})`);
    }
    return { output: lines.join('\n'), exitCode: 0 };
  }

  private cmdTheme(cmd: ParsedCommand): CommandResult {
    const theme = cmd.args[0]?.toLowerCase();
    const valid = ['retro-98', 'amber-terminal', 'obsidian-cobalt', 'polar-teal', 'anomaly-breach'];
    if (!theme || !valid.includes(theme)) {
      return { output: `Usage: theme <name>\nValid themes: ${valid.join(', ')}`, exitCode: 1 };
    }
    return {
      output: `Theme switched to: ${theme}`,
      exitCode: 0,
      systemAction: { type: 'theme', payload: theme },
    };
  }
}
