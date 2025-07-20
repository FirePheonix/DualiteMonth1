import React, { useState } from 'react';
import { Loader2, Zap, Key, X } from 'lucide-react';

interface InputFormProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
  apiKey: string;
  onRemoveApiKey: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading, apiKey, onRemoveApiKey }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt.trim());
    }
  };

  const examplePrompts = [
    'How online shopping works',
    'Software development lifecycle',
    'Customer support ticket resolution',
    'Restaurant order processing',
    'User registration process'
  ];

  const maskedApiKey = apiKey.length > 8 
    ? `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`
    : apiKey;

  return (
    <div className="p-6 bg-white border-b shadow-sm">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            FlowAI – Smart Diagram Generator
          </h1>
          <p className="text-gray-600">
            Describe any process and get an interactive flowchart instantly
          </p>
        </div>

        {/* API Key Status */}
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                API Key: {maskedApiKey}
              </span>
            </div>
            <button
              onClick={onRemoveApiKey}
              className="text-red-600 hover:text-red-800 transition-colors"
              title="Remove API Key"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Describe your process
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., How online shopping works..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Generate Flowchart
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example) => (
              <button
                key={example}
                onClick={() => setPrompt(example)}
                disabled={isLoading}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
