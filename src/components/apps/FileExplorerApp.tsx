import React from 'react';
import { useFileSystemStore } from '../../stores/fileSystemStore';
import * as Icons from 'lucide-react';

export const FileExplorerApp: React.FC = () => {
  const { currentPath, navigateToPath, openFolder, navigateUp, getCurrentItems } =
    useFileSystemStore();

  const currentItems = getCurrentItems();

  const handleItemClick = (item: { name: string; type: string }) => {
    if (item.type === 'folder') {
      openFolder(item.name);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    navigateToPath(currentPath.slice(0, index + 1));
  };

  return (
    <div className="flex h-full w-full bg-cosmos-bg/90 text-cosmos-text-primary text-sm overflow-hidden select-none">
      {/* Explorer Sidebar */}
      <div className="w-52 bg-cosmos-container-low/60 border-r border-white/10 p-3 flex flex-col gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase text-cosmos-text-muted px-2 block mb-1">Favorites</span>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => navigateToPath(['Home Workspace'])}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md font-medium text-left transition-all ${
                currentPath.length === 1 && currentPath[0] === 'Home Workspace'
                  ? 'bg-cosmos-lime/20 text-cosmos-lime-bright border border-cosmos-lime/30'
                  : 'text-cosmos-text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icons.Home className="w-4 h-4 text-cosmos-lime-bright" />
              <span>Home Workspace</span>
            </button>
            <button
              onClick={() => navigateToPath(['Home Workspace', 'Documents'])}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md font-medium text-left transition-all ${
                currentPath.includes('Documents')
                  ? 'bg-cosmos-lime/20 text-cosmos-lime-bright border border-cosmos-lime/30'
                  : 'text-cosmos-text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icons.Folder className="w-4 h-4" />
              <span>Documents</span>
            </button>
            <button
              onClick={() => navigateToPath(['Home Workspace', 'Downloads'])}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md font-medium text-left transition-all ${
                currentPath.includes('Downloads')
                  ? 'bg-cosmos-lime/20 text-cosmos-lime-bright border border-cosmos-lime/30'
                  : 'text-cosmos-text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icons.Download className="w-4 h-4" />
              <span>Downloads</span>
            </button>
            <button
              onClick={() => navigateToPath(['Home Workspace', 'Pictures'])}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md font-medium text-left transition-all ${
                currentPath.includes('Pictures')
                  ? 'bg-cosmos-lime/20 text-cosmos-lime-bright border border-cosmos-lime/30'
                  : 'text-cosmos-text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icons.Image className="w-4 h-4" />
              <span>Pictures</span>
            </button>
          </div>
        </div>

        <div>
          <span className="text-[11px] font-mono uppercase text-cosmos-text-muted px-2 block mb-1">Storage</span>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => navigateToPath(['Home Workspace', 'System Logs'])}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md font-medium text-left transition-all ${
                currentPath.includes('System Logs')
                  ? 'bg-cosmos-lime/20 text-cosmos-lime-bright border border-cosmos-lime/30'
                  : 'text-cosmos-text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icons.HardDrive className="w-4 h-4" />
              <span>System Logs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Files Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Interactive Breadcrumb Bar */}
        <div className="h-10 border-b border-white/10 px-4 flex items-center gap-2 bg-black/40 text-xs font-mono">
          <button
            onClick={navigateUp}
            disabled={currentPath.length <= 1}
            className="p-1 rounded text-cosmos-text-muted hover:text-white disabled:opacity-40"
            title="Navigate Up"
          >
            <Icons.ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-cosmos-text-muted">/</span>
          {currentPath.map((seg, idx) => (
            <React.Fragment key={idx}>
              <span
                onClick={() => handleBreadcrumbClick(idx)}
                className={`cursor-pointer hover:underline ${
                  idx === currentPath.length - 1 ? 'text-white font-bold' : 'text-cosmos-text-muted'
                }`}
              >
                {seg}
              </span>
              {idx < currentPath.length - 1 && <span className="text-cosmos-text-muted">/</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Dynamic File & Folder Grid */}
        <div className="flex-1 p-4 grid grid-cols-4 gap-4 overflow-y-auto align-content-start">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div
                key={item.id}
                onDoubleClick={() => handleItemClick(item)}
                onClick={() => handleItemClick(item)}
                className="p-3 rounded-lg border border-white/5 bg-cosmos-container/40 hover:border-cosmos-lime/50 hover:bg-cosmos-lime/10 transition-all flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-cosmos-lime-bright mb-2 group-hover:scale-105 transition-transform">
                  {item.type === 'folder' ? (
                    <Icons.Folder className="w-6 h-6 fill-cosmos-lime/20" />
                  ) : item.icon === 'Image' ? (
                    <Icons.Image className="w-6 h-6" />
                  ) : item.icon === 'Music' ? (
                    <Icons.Music className="w-6 h-6" />
                  ) : item.icon === 'Code' ? (
                    <Icons.Code className="w-6 h-6 text-cyan-400" />
                  ) : (
                    <Icons.FileText className="w-6 h-6" />
                  )}
                </div>
                <span className="text-xs font-mono text-white truncate max-w-full font-medium">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-cosmos-text-muted mt-0.5">
                  {item.type === 'folder' ? `${item.children?.length || 0} items` : item.size}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-4 p-8 text-center text-xs font-mono text-cosmos-text-muted">
              Folder is empty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
