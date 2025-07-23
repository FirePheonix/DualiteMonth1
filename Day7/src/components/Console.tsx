import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ConsoleProps {
  output: string;
}

const Console: React.FC<ConsoleProps> = ({ output }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-sm text-gray-300">Console</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded bg-gray-700">
            Format
          </button>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Show Only Latest</span>
          </div>
          <button className="text-xs text-gray-400 hover:text-white">
            Clear Past Runs
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-black p-4 overflow-auto">
        {output ? (
          <pre className="text-white font-mono text-sm whitespace-pre-wrap">
            {output}
          </pre>
        ) : (
          <div className="text-gray-400 text-sm">
            Results of your code will appear here when you run
          </div>
        )}
      </div>
      
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
        <div className="text-sm text-gray-400 mb-2">Default</div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
          <span>▶</span>
          <span>Run .replit entrypoint</span>
        </button>
        <div className="mt-2 text-xs text-gray-500">Workflows</div>
      </div>
    </div>
  );
};

export default Console;
