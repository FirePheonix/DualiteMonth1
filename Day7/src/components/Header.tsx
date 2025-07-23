import React from 'react';
import { Play, Search, Users, Monitor, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  onRun: () => void;
  isRunning: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRun, isRunning }) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">E</span>
          </div>
          <span className="text-white font-semibold">EnergeticAdequateServices</span>
        </div>
        <span className="text-gray-400 text-sm">0% used</span>
      </div>
      
      <button
        onClick={onRun}
        disabled={isRunning}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded flex items-center space-x-2 font-medium transition-colors"
      >
        <Play size={16} className={isRunning ? 'animate-pulse' : ''} />
        <span>{isRunning ? 'Running...' : 'Run'}</span>
      </button>
      
      <div className="flex items-center space-x-3">
        <Search size={20} className="text-gray-400 hover:text-white cursor-pointer" />
        <Users size={20} className="text-gray-400 hover:text-white cursor-pointer" />
        <span className="text-sm text-gray-400">Invite</span>
        <Monitor size={20} className="text-gray-400 hover:text-white cursor-pointer" />
        <span className="text-sm text-gray-400">Deploy</span>
        <Bell size={20} className="text-gray-400 hover:text-white cursor-pointer" />
        <Settings size={20} className="text-gray-400 hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
