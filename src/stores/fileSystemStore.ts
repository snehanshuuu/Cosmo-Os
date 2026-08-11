import { create } from 'zustand';

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  icon?: string;
  children?: FileItem[];
}

const initialFileSystem: FileItem = {
  id: 'root',
  name: 'Home Workspace',
  type: 'folder',
  children: [
    {
      id: 'dir-documents',
      name: 'Documents',
      type: 'folder',
      children: [
        { id: 'f-1', name: 'Cosmos_Architecture.pdf', type: 'file', size: '2.4 MB', icon: 'FileText' },
        { id: 'f-2', name: 'PRD_Requirements.md', type: 'file', size: '10.8 KB', icon: 'FileText' },
        { id: 'f-3', name: 'Project_Design_Tokens.ts', type: 'file', size: '4.2 KB', icon: 'Code' },
      ],
    },
    {
      id: 'dir-downloads',
      name: 'Downloads',
      type: 'folder',
      children: [
        { id: 'f-4', name: 'wallpaper_electricgrid.png', type: 'file', size: '5.2 MB', icon: 'Image' },
        { id: 'f-5', name: 'audio_cybertrack.mp3', type: 'file', size: '8.1 MB', icon: 'Music' },
      ],
    },
    {
      id: 'dir-pictures',
      name: 'Pictures',
      type: 'folder',
      children: [
        { id: 'f-6', name: 'screenshot_desktop.png', type: 'file', size: '1.4 MB', icon: 'Image' },
        { id: 'f-7', name: 'nebula_flow.png', type: 'file', size: '3.8 MB', icon: 'Image' },
      ],
    },
    {
      id: 'dir-system',
      name: 'System Logs',
      type: 'folder',
      children: [
        { id: 'f-8', name: 'sys_diagnostic.log', type: 'file', size: '12 KB', icon: 'FileText' },
        { id: 'f-9', name: 'kernel_boot.log', type: 'file', size: '45 KB', icon: 'FileText' },
      ],
    },
    { id: 'f-10', name: 'config.json', type: 'file', size: '2.1 KB', icon: 'Code' },
    { id: 'f-11', name: 'README.md', type: 'file', size: '1.2 KB', icon: 'FileText' },
  ],
};

interface FileSystemStore {
  currentPath: string[]; // ['Home Workspace', 'Documents']
  navigateToPath: (path: string[]) => void;
  openFolder: (folderName: string) => void;
  navigateUp: () => void;
  getCurrentItems: () => FileItem[];
}

export const useFileSystemStore = create<FileSystemStore>((set, get) => ({
  currentPath: ['Home Workspace'],

  navigateToPath: (path: string[]) => set({ currentPath: path }),

  openFolder: (folderName: string) => {
    set((state) => ({ currentPath: [...state.currentPath, folderName] }));
  },

  navigateUp: () => {
    const { currentPath } = get();
    if (currentPath.length > 1) {
      set({ currentPath: currentPath.slice(0, -1) });
    }
  },

  getCurrentItems: () => {
    const { currentPath } = get();
    let current: FileItem = initialFileSystem;

    for (let i = 1; i < currentPath.length; i++) {
      const segment = currentPath[i];
      const match = current.children?.find((item) => item.name === segment && item.type === 'folder');
      if (match) {
        current = match;
      } else {
        break;
      }
    }

    return current.children || [];
  },
}));
