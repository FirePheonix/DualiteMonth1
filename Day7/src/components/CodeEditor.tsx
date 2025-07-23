import React from 'react';
import { Language } from '../types';

interface CodeEditorProps {
  language: Language;
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => {
  const getPlaceholder = (lang: Language): string => {
    switch (lang) {
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

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <span className="text-sm text-gray-300">main.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : language === 'html' ? 'html' : 'css'}</span>
      </div>
      
      <div className="flex-1 relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-850 border-r border-gray-700 flex flex-col text-xs text-gray-500">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i + 1} className="px-2 py-0.5 text-right leading-5">
              {i + 1}
            </div>
          ))}
        </div>
        
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={getPlaceholder(language)}
          className="w-full h-full pl-14 pr-4 py-2 bg-gray-900 text-white font-mono text-sm resize-none outline-none border-none leading-5"
          style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace' }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
