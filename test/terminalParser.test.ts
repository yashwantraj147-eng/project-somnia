import { describe, it, expect, beforeEach } from 'vitest';
import { TerminalParser } from '../src/services/terminalParser';
import { TerminalCommandRunner } from '../src/services/terminalCommands';
import { VirtualFileSystem } from '../src/services/vfs';
import { CommandContext } from '../src/types/terminal';

describe('Terminal Parser & Grammar', () => {
  it('tokenizes basic commands with flags and arguments', () => {
    const tokens = TerminalParser.tokenize('ls -la /system');
    expect(tokens.map(t => t.value)).toEqual(['ls', '-la', '/system']);
  });

  it('tokenizes quoted strings with spaces', () => {
    const tokens = TerminalParser.tokenize('echo "Hello Sub-Harmonic World"');
    expect(tokens[0].value).toBe('echo');
    expect(tokens[1].type).toBe('string');
    expect(tokens[1].value).toBe('Hello Sub-Harmonic World');
  });

  it('parses pipes and chained commands', () => {
    const parsed = TerminalParser.parse('cat /system/sys.log | grep ANOMALY');
    expect(parsed.command).toBe('cat');
    expect(parsed.args).toEqual(['/system/sys.log']);
    expect(parsed.pipeTo).toBeDefined();
    expect(parsed.pipeTo?.command).toBe('grep');
    expect(parsed.pipeTo?.args).toEqual(['ANOMALY']);
  });

  it('parses output redirection', () => {
    const parsed = TerminalParser.parse('echo "evidence" > /users/investigator/log.txt');
    expect(parsed.command).toBe('echo');
    expect(parsed.args).toEqual(['evidence']);
    expect(parsed.redirectTo).toBe('/users/investigator/log.txt');
  });

  it('parses flags with key-value pairs', () => {
    const parsed = TerminalParser.parse('decrypt file.dat -k SECRET_KEY');
    expect(parsed.command).toBe('decrypt');
    expect(parsed.args).toEqual(['file.dat']);
    expect(parsed.flags['k']).toBe('SECRET_KEY');
  });
});

describe('Terminal Command Runner', () => {
  let vfs: VirtualFileSystem;
  let runner: TerminalCommandRunner;
  let ctx: CommandContext;

  beforeEach(() => {
    vfs = new VirtualFileSystem();
    runner = new TerminalCommandRunner(vfs);
    ctx = {
      cwd: '/users/investigator',
      env: {},
      user: 'investigator',
      clearanceLevel: 1,
    };
  });

  it('executes pwd and whoami', () => {
    const resPwd = runner.execute(TerminalParser.parse('pwd'), ctx);
    expect(resPwd.output).toBe('/users/investigator');

    const resWho = runner.execute(TerminalParser.parse('whoami'), ctx);
    expect(resWho.output).toContain('investigator');
    expect(resWho.output).toContain('Level: 1');
  });

  it('navigates with cd and lists files with ls', () => {
    const resCd = runner.execute(TerminalParser.parse('cd /system'), ctx);
    expect(resCd.newCwd).toBe('/system');

    ctx.cwd = '/system';
    const resLs = runner.execute(TerminalParser.parse('ls'), ctx);
    expect(resLs.output).toContain('sys.log');
    expect(resLs.output).toContain('kernel.conf');
  });

  it('executes cat and pipes to grep', () => {
    ctx.cwd = '/system';
    const res = runner.execute(TerminalParser.parse('cat sys.log | grep ANOMALY'), ctx);
    expect(res.output).toContain('[ANOMALY]');
  });

  it('enforces clearance levels for EYES ONLY files', () => {
    ctx.cwd = '/archive/1983_petrov';
    const resBlocked = runner.execute(TerminalParser.parse('cat serpukhov_15_log_STREAM_B.txt'), ctx);
    expect(resBlocked.exitCode).toBe(13);
    expect(resBlocked.error).toContain('ACCESS DENIED');

    // Elevate clearance
    const resAuth = runner.execute(TerminalParser.parse('auth 4 783-PETROV-ORPHEUS'), ctx);
    expect(resAuth.newClearance).toBe(4);
    ctx.clearanceLevel = 4;

    const resAllowed = runner.execute(TerminalParser.parse('cat serpukhov_15_log_STREAM_B.txt'), ctx);
    expect(resAllowed.exitCode).toBe(0);
    expect(resAllowed.output).toContain('STREAM B');
  });

  it('executes investigative query command', () => {
    const resStations = runner.execute(TerminalParser.parse('query stations'), ctx);
    expect(resStations.output).toContain('Station Epsilon');
    expect(resStations.output).toContain('Aleutian Trench');
  });

  it('decrypts files when correct key is provided', () => {
    const resDecrypt = runner.execute(TerminalParser.parse('decrypt /archive/somnia.dat -k 7.83-PETROV-1983'), ctx);
    expect(resDecrypt.exitCode).toBe(0);
    expect(resDecrypt.output).toContain('DECRYPTION SUCCESSFUL');
    expect(resDecrypt.output).toContain('THE SOMNIA PROTOCOL');
  });
});
