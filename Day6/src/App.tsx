import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import InputForm from './components/InputForm';
import FlowChart from './components/FlowChart';
import ErrorMessage from './components/ErrorMessage';
import ApiKeyInput from './components/ApiKeyInput';
import { generateFlowChart, FlowData } from './services/gemini';

function App() {
  const [flowData, setFlowData] = useState<FlowData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setError(null);
  };

  const handleApiKeyRemove = () => {
    setApiKey('');
    localStorage.removeItem('gemini_api_key');
    setFlowData(null);
  };

  const handleGenerate = async (prompt: string) => {
    if (!apiKey.trim()) {
      setError('Please enter your Gemini API key first');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const data = await generateFlowChart(prompt, apiKey);
      setFlowData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFlowData(null);
    setError(null);
  };

  const handleExport = async (element: HTMLElement) => {
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#f9fafb',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });
      
      const link = document.createElement('a');
      link.download = `flowchart-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export diagram. Please try again.');
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  // Show API key input if no key is provided
  if (!apiKey) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ApiKeyInput onSubmit={handleApiKeySubmit} />
        {error && (
          <ErrorMessage error={error} onClose={handleCloseError} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <InputForm 
        onGenerate={handleGenerate} 
        isLoading={isLoading} 
        apiKey={apiKey}
        onRemoveApiKey={handleApiKeyRemove}
      />
      
      {error && (
        <ErrorMessage error={error} onClose={handleCloseError} />
      )}
      
      {flowData ? (
        <FlowChart 
          flowData={flowData} 
          onReset={handleReset} 
          onExport={handleExport}
        />
      ) : !isLoading && (
        <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to create your flowchart?
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter a process description above and click "Generate Flowchart" to see an interactive diagram
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
