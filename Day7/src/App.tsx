import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import Console from './components/Console';
import { Language } from './types';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('python');
  const [code, setCode] = useState<string>('print("Hello World!")');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [geminiKey, setGeminiKey] = useState<string>('');

  const getDefaultCode = (language: Language): string => {
    switch (language) {
      case 'python':
        return 'print("Hello World!")';
      case 'javascript':
        return 'console.log("Hello World!");';
      case 'cpp':
        return '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World!" << endl;\n    return 0;\n}';
      case 'java':
        return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}';
      case 'html':
        return '<!DOCTYPE html>\n<html>\n<head>\n    <title>Page Title</title>\n</head>\n<body>\n    <h1>Hello World!</h1>\n</body>\n</html>';
      case 'css':
        return 'body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n    background-color: #f0f0f0;\n}';
      default:
        return '';
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setSelectedLanguage(newLanguage);
    setCode(getDefaultCode(newLanguage));
    setOutput('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    try {
      if (!geminiKey.trim()) {
        setOutput('Please enter your Gemini API key.');
        setIsRunning(false);
        return;
      }
      // Use user-provided Gemini API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey.trim()}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are a code execution simulator. Execute this ${selectedLanguage} code and provide ONLY the console/terminal output that would appear. Do not include explanations, markdown formatting, or code blocks - just the raw execution result:

Code to execute:
${code}

Expected output format: Plain text output only, exactly as it would appear in a terminal/console.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      };

      console.log('Making API request to:', apiUrl);
      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}\nDetails: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        const result = data.candidates[0].content.parts[0].text;
        setOutput(result.trim());
      } else if (data.error) {
        setOutput(`API Error: ${data.error.message || JSON.stringify(data.error)}`);
      } else {
        setOutput(`Error: Unexpected response format\n${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      console.error('Execution error:', error);
      
      let errorMessage = 'Unknown error occurred';
      
      if (error instanceof Error) {
        if (error.message.includes('CORS')) {
          errorMessage = 'CORS Error: Direct API calls may be blocked by browser. The API might not support CORS from this domain.';
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Network Error: Unable to reach Gemini API. Check your internet connection.';
        } else if (error.message.includes('404')) {
          errorMessage = 'API Error: Endpoint not found (404). The API endpoint or model name might be incorrect.';
        } else if (error.message.includes('401') || error.message.includes('403')) {
          errorMessage = 'Authentication Error: Invalid API key or insufficient permissions.';
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      setOutput(errorMessage);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Gemini API Key Input */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center space-x-4">
        <label htmlFor="gemini-key" className="text-sm text-gray-300">Gemini API Key:</label>
        <input
          id="gemini-key"
          type="password"
          value={geminiKey}
          onChange={e => setGeminiKey(e.target.value)}
          placeholder="Enter your Gemini API key..."
          className="px-3 py-1 rounded bg-gray-900 border border-gray-600 text-white text-sm w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-xs text-gray-400">(Required to run code)</span>
      </div>

      <Header onRun={handleRun} isRunning={isRunning} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex">
          <div className="flex-1 border-r border-gray-700">
            <CodeEditor
              language={selectedLanguage}
              value={code}
              onChange={setCode}
            />
          </div>
          <div className="w-96">
            <Console output={output} />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 px-4 py-2 flex items-center space-x-4 text-sm text-gray-400">
        <select
          value={selectedLanguage}
          onChange={(e) => handleLanguageChange(e.target.value as Language)}
          className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600 text-sm"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <span>Ln 1, Col 1</span>
        <span>•</span>
        <span>Spaces: 2</span>
      </div>
    </div>
  );
}

export default App;
