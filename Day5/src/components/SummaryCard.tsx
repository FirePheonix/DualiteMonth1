import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, AlertCircle, FileText, Code, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SummaryCardProps {
  videoId: string;
  summary: string;
  error?: string;
  isLoading: boolean;
  rawResponse?: any;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ videoId, summary, error, isLoading, rawResponse }) => {
  const [copied, setCopied] = React.useState(false);
  const [copyError, setCopyError] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  };

  const handleCopy = async () => {
    if (!summary) return;
    
    setCopyError(false);
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch (err) {
      console.warn('Clipboard API failed, trying fallback method');
    }
    
    try {
      const successful = fallbackCopyTextToClipboard(summary);
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        setCopyError(true);
        setTimeout(() => setCopyError(false), 3000);
      }
    } catch (err) {
      console.error('Copy failed:', err);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (error) {
    return (
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-semibold text-red-400">Error</h3>
          </div>
          <p className="text-red-300 mb-4">{error}</p>
          
          {rawResponse && (
            <div className="mt-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-red-300 text-sm"
              >
                <Code className="w-4 h-4" />
                {showDetails ? 'Hide' : 'Show'} Details
              </button>
              
              {showDetails && (
                <div className="mt-4 p-4 bg-black/50 rounded-lg border border-red-500/20">
                  <p className="text-red-300 text-xs mb-2">Raw API Response:</p>
                  <pre className="text-red-200 text-xs overflow-x-auto whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {JSON.stringify(rawResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-1/3">
            <div className="aspect-video bg-white/10 rounded-lg overflow-hidden">
              <img 
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x225/1a1a1a/ffffff?text=Video+Preview';
                }}
              />
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">AI-Generated Summary</h3>
              <div className="flex items-center gap-2">
                {rawResponse && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowDetails(!showDetails)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title={showDetails ? "Hide Details" : "Show Processing Details"}
                  >
                    <FileText className="w-4 h-4 text-white/70" />
                  </motion.button>
                )}
                
                {!isLoading && summary && (
                  <>
                    {copyError && (
                      <span className="text-red-400 text-xs">Copy failed</span>
                    )}
                    {copied && (
                      <span className="text-green-400 text-xs">Copied!</span>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopy}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/70" />
                      )}
                    </motion.button>
                  </>
                )}
              </div>
            </div>
            
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-white/10 rounded animate-pulse w-1/2"></div>
              </div>
            ) : (
              <>
                <div className="prose prose-invert prose-sm max-w-none text-white/80 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {summary || "No summary content found. Check the console for debugging information."}
                  </ReactMarkdown>
                </div>
                
                {showDetails && (
                  <div className="mt-6 p-4 bg-black/50 rounded-lg border border-white/10 space-y-4">
                    {rawResponse && (
                      <div>
                        <p className="text-white/70 text-xs mb-2 font-semibold flex items-center gap-2">
                          <Code className="w-4 h-4" /> Source Transcript (from API)
                        </p>
                        <pre className="text-white/60 text-xs overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto bg-black/30 p-2 rounded">
                          {JSON.stringify(rawResponse, null, 2)}
                        </pre>
                      </div>
                    )}
                    {summary && (
                      <div>
                        <p className="text-white/70 text-xs mb-2 font-semibold flex items-center gap-2">
                          <Zap className="w-4 h-4" /> Generated Summary (by Gemini)
                        </p>
                        <pre className="text-white/90 text-xs overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto bg-black/30 p-2 rounded">
                          {summary}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
