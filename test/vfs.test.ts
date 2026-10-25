import { describe, it, expect, beforeEach } from 'vitest';
import { VirtualFileSystem } from '../src/services/vfs';

describe('VirtualFileSystem Core', () => {
  let vfs: VirtualFileSystem;

  beforeEach(() => {
    vfs = new VirtualFileSystem();
  });

  it('initializes with seed directories and files', () => {
    const root = vfs.getNodeByPath('/');
    expect(root).toBeDefined();
    expect(root?.type).toBe('directory');

    const sysLog = vfs.getNodeByPath('/system/sys.log');
    expect(sysLog).toBeDefined();
    expect(sysLog?.type).toBe('file');
    expect(sysLog?.content).toContain('SOMNIA-KERNEL');
  });

  it('creates and reads new files and directories', () => {
    const dir = vfs.createDirectory('/users/investigator', 'case_notes');
    expect(dir.path).toBe('/users/investigator/case_notes');

    const file = vfs.createFile('/users/investigator/case_notes', 'suspects.txt', '1. Julian Sterling');
    expect(file.path).toBe('/users/investigator/case_notes/suspects.txt');

    const fetched = vfs.getNodeByPath('/users/investigator/case_notes/suspects.txt');
    expect(fetched?.content).toBe('1. Julian Sterling');
  });

  it('updates file content and records history', () => {
    vfs.createFile('/users/investigator', 'evidence.txt', 'Version 1');
    const updated = vfs.writeFile('/users/investigator/evidence.txt', 'Version 2 with more clues');
    expect(updated.content).toBe('Version 2 with more clues');
    expect(updated.history?.length).toBeGreaterThan(0);
  });

  it('soft deletes to recycle bin and restores properly', () => {
    const file = vfs.createFile('/users/investigator', 'trash_me.txt', 'Important memo');
    vfs.deleteNode(file.id, false);

    // Should no longer be found by active path
    expect(vfs.getNodeByPath('/users/investigator/trash_me.txt')).toBeUndefined();

    // Node is deleted
    const deletedNode = vfs.getNodeById(file.id);
    expect(deletedNode?.isDeleted).toBe(true);

    // Restore
    const restored = vfs.restoreNode(file.id);
    expect(restored.isDeleted).toBe(false);
    expect(vfs.getNodeByPath('/users/investigator/trash_me.txt')).toBeDefined();
  });

  it('searches files by term and tags', () => {
    const results = vfs.search({ term: 'petrov' });
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.name.includes('STREAM_A'))).toBe(true);
  });

  it('exports and imports VFS state cleanly', () => {
    vfs.createFile('/users/investigator', 'test_export.txt', 'Payload 123');
    const jsonStr = vfs.exportJSON();

    const newVfs = new VirtualFileSystem();
    newVfs.importJSON(jsonStr);

    const imported = newVfs.getNodeByPath('/users/investigator/test_export.txt');
    expect(imported).toBeDefined();
    expect(imported?.content).toBe('Payload 123');
  });
});
