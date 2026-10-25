import { VFSNode, FilePermission, VFSSearchQuery } from '../types/vfs';
import { INITIAL_VFS_DATA } from '../data/seedVfs';

export class VirtualFileSystem {
  private nodes: Record<string, VFSNode>;

  constructor(initialData?: Record<string, VFSNode>) {
    this.nodes = initialData ? { ...initialData } : JSON.parse(JSON.stringify(INITIAL_VFS_DATA));
  }

  public getNodes(): Record<string, VFSNode> {
    return this.nodes;
  }

  public setNodes(nodes: Record<string, VFSNode>) {
    this.nodes = nodes;
  }

  public getNodeById(id: string): VFSNode | undefined {
    return this.nodes[id];
  }

  public getNodeByPath(path: string): VFSNode | undefined {
    const normalized = this.normalizePath(path);
    return Object.values(this.nodes).find(n => n.path === normalized && !n.isDeleted);
  }

  public normalizePath(path: string): string {
    if (!path || path === '/') return '/';
    let clean = path.replace(/\\/g, '/');
    if (!clean.startsWith('/')) clean = '/' + clean;
    // remove redundant slashes and trailing slashes
    clean = clean.replace(/\/+/g, '/');
    if (clean.length > 1 && clean.endsWith('/')) {
      clean = clean.slice(0, -1);
    }
    return clean;
  }

  public getChildren(parentId: string, includeDeleted = false): VFSNode[] {
    return Object.values(this.nodes).filter(
      n => n.parentId === parentId && (includeDeleted ? true : !n.isDeleted)
    );
  }

  public getChildrenByPath(dirPath: string, includeDeleted = false): VFSNode[] {
    const dir = this.getNodeByPath(dirPath);
    if (!dir || dir.type !== 'directory') return [];
    return this.getChildren(dir.id, includeDeleted);
  }

  public createFile(
    parentPath: string,
    name: string,
    content: string,
    permission: FilePermission = 'public',
    mimeType: string = 'text/plain',
    tags: string[] = []
  ): VFSNode {
    const parent = this.getNodeByPath(parentPath);
    if (!parent || parent.type !== 'directory') {
      throw new Error(`Parent directory "${parentPath}" not found.`);
    }

    const filePath = parent.path === '/' ? `/${name}` : `${parent.path}/${name}`;
    if (this.getNodeByPath(filePath)) {
      throw new Error(`File or directory "${filePath}" already exists.`);
    }

    const id = `file_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const newNode: VFSNode = {
      id,
      name,
      path: filePath,
      type: 'file',
      parentId: parent.id,
      size: new Blob([content]).size,
      createdAt: now,
      modifiedAt: now,
      permission,
      tags,
      mimeType,
      fileType: name.endsWith('.md') ? 'markdown' : name.endsWith('.log') ? 'log' : 'text',
      content,
    };

    this.nodes[id] = newNode;
    return newNode;
  }

  public createDirectory(
    parentPath: string,
    name: string,
    permission: FilePermission = 'public',
    tags: string[] = []
  ): VFSNode {
    const parent = this.getNodeByPath(parentPath);
    if (!parent || parent.type !== 'directory') {
      throw new Error(`Parent directory "${parentPath}" not found.`);
    }

    const dirPath = parent.path === '/' ? `/${name}` : `${parent.path}/${name}`;
    if (this.getNodeByPath(dirPath)) {
      throw new Error(`Directory "${dirPath}" already exists.`);
    }

    const id = `dir_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const newNode: VFSNode = {
      id,
      name,
      path: dirPath,
      type: 'directory',
      parentId: parent.id,
      size: 4096,
      createdAt: now,
      modifiedAt: now,
      permission,
      tags,
    };

    this.nodes[id] = newNode;
    return newNode;
  }

  public writeFile(path: string, newContent: string): VFSNode {
    const node = this.getNodeByPath(path);
    if (!node) {
      // create it if it doesn't exist
      const lastSlash = path.lastIndexOf('/');
      const parentPath = lastSlash <= 0 ? '/' : path.slice(0, lastSlash);
      const fileName = path.slice(lastSlash + 1);
      return this.createFile(parentPath, fileName, newContent);
    }

    if (node.type !== 'file') {
      throw new Error(`Cannot write content to directory "${path}".`);
    }

    const now = new Date().toISOString();
    const history = node.history || [];
    history.push({
      timestamp: now,
      description: `Modified at ${now}`,
      diffSnippet: `Length: ${node.size} -> ${new Blob([newContent]).size}`,
    });

    node.content = newContent;
    node.size = new Blob([newContent]).size;
    node.modifiedAt = now;
    node.history = history;

    return node;
  }

  public renameNode(id: string, newName: string): VFSNode {
    const node = this.nodes[id];
    if (!node) throw new Error(`Node with id "${id}" not found.`);
    if (node.id === 'root') throw new Error('Cannot rename root directory.');

    const parent = node.parentId ? this.nodes[node.parentId] : null;
    const parentPath = parent ? parent.path : '';
    const newPath = parentPath === '/' ? `/${newName}` : `${parentPath}/${newName}`;

    node.name = newName;
    node.path = newPath;
    node.modifiedAt = new Date().toISOString();

    // If it's a directory, recursively update children paths
    if (node.type === 'directory') {
      this.updateDescendantPaths(node.id, newPath);
    }

    return node;
  }

  private updateDescendantPaths(dirId: string, dirPath: string) {
    const children = this.getChildren(dirId, true);
    for (const child of children) {
      const childNewPath = dirPath === '/' ? `/${child.name}` : `${dirPath}/${child.name}`;
      child.path = childNewPath;
      if (child.type === 'directory') {
        this.updateDescendantPaths(child.id, childNewPath);
      }
    }
  }

  public moveNode(id: string, targetDirId: string): VFSNode {
    const node = this.nodes[id];
    if (!node) throw new Error(`Node "${id}" not found.`);
    if (node.id === 'root') throw new Error('Cannot move root directory.');

    const targetDir = this.nodes[targetDirId];
    if (!targetDir || targetDir.type !== 'directory') {
      throw new Error(`Target is not a directory.`);
    }

    const newPath = targetDir.path === '/' ? `/${node.name}` : `${targetDir.path}/${node.name}`;
    node.parentId = targetDir.id;
    node.path = newPath;
    node.modifiedAt = new Date().toISOString();

    if (node.type === 'directory') {
      this.updateDescendantPaths(node.id, newPath);
    }

    return node;
  }

  public copyNode(id: string, targetDirId: string): VFSNode {
    const node = this.nodes[id];
    if (!node) throw new Error(`Node "${id}" not found.`);
    const targetDir = this.nodes[targetDirId];
    if (!targetDir || targetDir.type !== 'directory') {
      throw new Error(`Target is not a directory.`);
    }

    const copyName = node.type === 'file' && node.name.includes('.')
      ? node.name.replace(/(\.[^.]+)$/, '_copy$1')
      : `${node.name}_copy`;

    if (node.type === 'file') {
      return this.createFile(
        targetDir.path,
        copyName,
        node.content || '',
        node.permission,
        node.mimeType,
        [...(node.tags || [])]
      );
    } else {
      const newDir = this.createDirectory(targetDir.path, copyName, node.permission, [...(node.tags || [])]);
      // Copy children recursively
      const children = this.getChildren(node.id, false);
      for (const child of children) {
        this.copyNode(child.id, newDir.id);
      }
      return newDir;
    }
  }

  public deleteNode(id: string, permanent: boolean = false): void {
    const node = this.nodes[id];
    if (!node) throw new Error(`Node "${id}" not found.`);
    if (node.id === 'root') throw new Error('Cannot delete root directory.');

    if (permanent) {
      // Recursively delete children
      const children = this.getChildren(node.id, true);
      for (const child of children) {
        this.deleteNode(child.id, true);
      }
      delete this.nodes[id];
    } else {
      // Soft delete: move to recycle bin
      const recycleBin = Object.values(this.nodes).find(n => n.name === 'recycle_bin' && n.parentId === 'root');
      node.isDeleted = true;
      node.deletedAt = new Date().toISOString();
      node.originalPath = node.path;
      if (recycleBin) {
        node.parentId = recycleBin.id;
        node.path = `/recycle_bin/${node.name}`;
      }
    }
  }

  public restoreNode(id: string): VFSNode {
    const node = this.nodes[id];
    if (!node || !node.isDeleted) throw new Error(`Node "${id}" is not in recycle bin.`);

    const originalPath = node.originalPath || `/users/investigator/${node.name}`;
    const lastSlash = originalPath.lastIndexOf('/');
    const parentPath = lastSlash <= 0 ? '/' : originalPath.slice(0, lastSlash);

    let parent = this.getNodeByPath(parentPath);
    if (!parent) {
      parent = this.getNodeByPath('/users/investigator') || this.nodes['root'];
    }

    node.isDeleted = false;
    node.deletedAt = undefined;
    node.parentId = parent.id;
    node.path = parent.path === '/' ? `/${node.name}` : `${parent.path}/${node.name}`;
    node.modifiedAt = new Date().toISOString();

    return node;
  }

  public emptyRecycleBin(): void {
    const recycleBin = Object.values(this.nodes).find(n => n.name === 'recycle_bin' && n.parentId === 'root');
    if (!recycleBin) return;

    const items = Object.values(this.nodes).filter(n => n.isDeleted || n.parentId === recycleBin.id);
    for (const item of items) {
      if (item.id !== recycleBin.id) {
        delete this.nodes[item.id];
      }
    }
  }

  public search(query: VFSSearchQuery): VFSNode[] {
    return Object.values(this.nodes).filter(node => {
      if (!query.includeDeleted && node.isDeleted) return false;
      if (query.type && node.type !== query.type) return false;
      if (query.permission && node.permission !== query.permission) return false;
      if (query.tag && !node.tags.includes(query.tag)) return false;

      if (query.term) {
        const term = query.term.toLowerCase();
        const nameMatch = node.name.toLowerCase().includes(term);
        const pathMatch = node.path.toLowerCase().includes(term);
        const contentMatch = node.content ? node.content.toLowerCase().includes(term) : false;
        const tagMatch = node.tags.some(t => t.toLowerCase().includes(term));
        if (!nameMatch && !pathMatch && !contentMatch && !tagMatch) return false;
      }

      return true;
    });
  }

  public exportJSON(): string {
    return JSON.stringify(this.nodes, null, 2);
  }

  public importJSON(jsonStr: string): void {
    const parsed = JSON.parse(jsonStr);
    if (typeof parsed !== 'object' || !parsed['root']) {
      throw new Error('Invalid VFS JSON schema: missing root node.');
    }
    this.nodes = parsed;
  }
}
