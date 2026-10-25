import { describe, it, expect, beforeEach } from 'vitest';
import { StateManager } from '../src/services/stateManager';

describe('State Manager & Timeline Branching', () => {
  let stateMgr: StateManager;

  beforeEach(() => {
    stateMgr = new StateManager();
  });

  it('creates default canonical prime timeline branch', () => {
    const branch = stateMgr.getActiveBranch();
    expect(branch).toBeDefined();
    expect(branch.id).toBe('branch_prime');
    expect(branch.name).toContain('Prime');
  });

  it('branches timeline without overwriting parent timeline', () => {
    const parentBranch = stateMgr.getActiveBranch();
    const originalFileCount = Object.keys(parentBranch.vfs).length;

    // Create a branch
    const childBranch = stateMgr.branchTimeline('Timeline Beta (Coverup Theory)', 'Testing hypothesis that Luminary orchestrated the pulse.');
    expect(childBranch.parentBranchId).toBe('branch_prime');
    expect(stateMgr.getActiveBranch().id).toBe(childBranch.id);

    // Modify child branch VFS
    childBranch.vfs['test_branch_file'] = {
      id: 'test_branch_file',
      name: 'branch_only.txt',
      path: '/users/investigator/branch_only.txt',
      type: 'file',
      parentId: 'dir_investigator',
      size: 100,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      permission: 'public',
      tags: ['branch'],
    };

    // Switch back to parent branch
    stateMgr.switchBranch('branch_prime');
    const restoredParent = stateMgr.getActiveBranch();
    expect(Object.keys(restoredParent.vfs).length).toBe(originalFileCount);
    expect(restoredParent.vfs['test_branch_file']).toBeUndefined();

    // Switch back to child branch and verify change is preserved
    stateMgr.switchBranch(childBranch.id);
    expect(stateMgr.getActiveBranch().vfs['test_branch_file']).toBeDefined();
  });

  it('exports and imports complete system save archive', () => {
    stateMgr.updateSettings({ theme: 'amber-terminal', volume: 0.8 });
    const jsonStr = stateMgr.exportJSON();

    const newMgr = new StateManager();
    newMgr.importJSON(jsonStr);

    expect(newMgr.getSettings().theme).toBe('amber-terminal');
    expect(newMgr.getSettings().volume).toBe(0.8);
  });
});
