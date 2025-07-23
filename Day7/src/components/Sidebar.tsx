import React from 'react';
import { Home, FileText, GitBranch, Package, Grid3X3 } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-12 bg-gray-900 border-r border-gray-700 flex flex-col items-center py-4 space-y-4">
      <Home size={20} className="text-gray-400 hover:text-white cursor-pointer" />
      <div className="relative">
        <FileText size={20} className="text-blue-400 cursor-pointer" />
        <div className="absolute -right-1 -top-1 w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>
      <GitBranch size={20} className="text-gray-400 hover:text-white cursor-pointer" />
      <Package size={20} className="text-gray-400 hover:text-white cursor-pointer" />
      <Grid3X3 size={20} className="text-gray-400 hover:text-white cursor-pointer" />
    </div>
  );
};

export default Sidebar;
