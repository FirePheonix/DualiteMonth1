import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, AlertCircle, CheckCircle, Link as LinkIcon, ExternalLink, Info } from 'lucide-react';
import { convertToMp3, extractVideoId, isValidYouTubeUrl } from '../services/youtubeApi';

interface ConversionFormProps {
  className?: string;
}

const ConversionForm: React.FC<ConversionFormProps> = ({ className = '' }) => {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [downloadData, setDownloadData] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    if (!apiKey.trim()) {
      setError('Please enter your RapidAPI key');
      setShowApiKeyInput(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const result = await convertToMp3(videoId, apiKey);
      
      // Add debugging information
      console.log('API Response:', result);
      
      if (result.status === 'ok') {
        setDownloadData(result);
        setSuccess(true);
      } else {
        throw new Error(result.mess || 'Conversion failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const extractDownloadUrl = (data: any): string | null => {
    // Check for the 'link' property first (this is what the API actually returns)
    if (data.link && typeof data.link === 'string' && data.link.startsWith('http')) {
      return data.link;
    }

    // Multiple other possible locations for download URLs
    const possibleUrls = [
      data.download_url,
      data.downloadUrl,
      data.url,
      data.mp3_url,
      data.audio_url,
      data.links?.mp3?.mp3128?.k,
      data.links?.mp3?.mp3128?.url,
      // Check if links is an array
      Array.isArray(data.links) ? data.links[0]?.url : null,
      // Check for nested audio links
      data.links?.audio?.url,
      data.links?.download?.url,
      // Check for direct mp3 links
      data.mp3?.url,
      data.audio?.url,
    ];

    // Find the first valid URL
    for (const url of possibleUrls) {
      if (url && typeof url === 'string' && (url.startsWith('http') || url.startsWith('https'))) {
        return url;
      }
    }

    return null;
  };

  const handleDownload = async () => {
    if (!downloadData) return;

    setIsDownloading(true);
    
    try {
      // Log the entire response to debug
      console.log('Download data structure:', JSON.stringify(downloadData, null, 2));
      
      const downloadUrl = extractDownloadUrl(downloadData);
      
      if (!downloadUrl) {
        // Show detailed error with response structure
        console.error('No download URL found in response:', downloadData);
        throw new Error('Download URL not found in API response. Please check the API response structure.');
      }

      console.log('Attempting to download from:', downloadUrl);

      // Generate a clean filename
      const fileName = `${downloadData.title || 'audio'}.mp3`
        .replace(/[^a-zA-Z0-9.\-_\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 100); // Limit filename length

      // Method 1: Try direct download with fetch
      try {
        const response = await fetch(downloadUrl, {
          method: 'GET',
          headers: {
            'Accept': 'audio/mpeg, audio/*, */*',
          },
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          
          console.log('Download successful via fetch method');
          return;
        } else {
          console.warn('Fetch response not ok:', response.status, response.statusText);
        }
      } catch (fetchError) {
        console.warn('Direct fetch download failed:', fetchError);
      }

      // Method 2: Try anchor element download
      try {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Download initiated via anchor method');
        return;
      } catch (anchorError) {
        console.warn('Anchor download failed:', anchorError);
      }

      // Method 3: Open in new window/tab as fallback
      console.log('Opening download URL in new window');
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
      
    } catch (err) {
      console.error('Download error:', err);
      setError(err instanceof Error ? err.message : 'Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const resetForm = () => {
    setUrl('');
    setError('');
    setSuccess(false);
    setDownloadData(null);
    // Keep API key for convenience
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Check if API key is provided
  const isApiConfigured = apiKey.trim() !== '';

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <div className="space-y-6">
        {/* API Configuration Warning */}
        {!isApiConfigured && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-center space-x-2 text-yellow-300">
              <AlertCircle className="w-5 h-5" />
              <span className="font-sans font-medium">API Key Required</span>
            </div>
            <p className="text-yellow-200 font-sans text-sm leading-relaxed">
              To use this converter, you need to:
            </p>
            <ol className="text-yellow-200 font-sans text-sm space-y-1 ml-4">
              <li>1. Visit <a href="https://rapidapi.com/ytjar/api/youtube-mp36" target="_blank" rel="noopener noreferrer" className="text-yellow-100 hover:text-white underline">RapidAPI YouTube MP3 API</a></li>
              <li>2. Subscribe to the API (free tier available)</li>
              <li>3. Get your API key</li>
              <li>4. Enter it in the form below</li>
            </ol>
          </motion.div>
        )}

        {/* API Key Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-2"
        >
          <label className="block text-white/70 font-sans text-sm font-medium">
            RapidAPI Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your RapidAPI key..."
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
          />
          <p className="text-white/50 font-sans text-xs">
            Your API key is only used for this session and never stored.
          </p>
        </motion.div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="flex flex-col sm:flex-row items-stretch space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste YouTube URL here..."
                  disabled={isLoading || !isApiConfigured}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 disabled:opacity-50"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading || !url.trim() || !isApiConfigured}
                whileHover={{ scale: isApiConfigured ? 1.05 : 1 }}
                whileTap={{ scale: isApiConfigured ? 0.95 : 1 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white font-sans font-medium tracking-wide hover:bg-white/30 hover:border-white/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[140px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Converting...</span>
                  </>
                ) : (
                  <span>Convert</span>
                )}
              </motion.button>
            </div>
          </motion.div>
        </form>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-4 space-y-2"
            >
              <div className="flex items-center space-x-2 text-red-300">
                <AlertCircle className="w-5 h-5" />
                <span className="font-sans font-medium">Error</span>
              </div>
              <p className="text-red-200 font-sans text-sm">{error}</p>
              
              {error.includes('API subscription') && (
                <a
                  href="https://rapidapi.com/ytjar/api/youtube-mp36"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-red-100 hover:text-white underline text-sm"
                >
                  <span>Subscribe to API</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success State */}
        <AnimatePresence>
          {success && downloadData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center space-x-2 text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span className="font-sans font-medium">Conversion Complete!</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white font-sans font-medium text-lg truncate">
                  {downloadData.title || 'Audio File'}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-white/70 font-sans text-sm">
                  {downloadData.duration && (
                    <span>Duration: {formatDuration(downloadData.duration)}</span>
                  )}
                  {downloadData.filesize && (
                    <span>Size: {formatFileSize(downloadData.filesize)}</span>
                  )}
                  <span className="text-green-300">Ready to download</span>
                </div>
              </div>

              {/* Debug Info - Development Mode */}
              <details className="bg-white/5 rounded-lg p-3">
                <summary className="text-white/60 font-sans text-xs cursor-pointer flex items-center space-x-2">
                  <Info className="w-4 h-4" />
                  <span>Debug Info</span>
                </summary>
                <pre className="text-white/50 font-mono text-xs mt-2 overflow-auto max-h-40">
                  {JSON.stringify(downloadData, null, 2)}
                </pre>
              </details>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <motion.button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  whileHover={{ scale: isDownloading ? 1 : 1.05 }}
                  whileTap={{ scale: isDownloading ? 1 : 0.95 }}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-500/30 backdrop-blur-sm border border-green-500/40 rounded-xl text-white font-sans font-medium hover:bg-green-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Download MP3</span>
                    </>
                  )}
                </motion.button>
                
                <button
                  onClick={resetForm}
                  className="px-6 py-3 text-white/70 hover:text-white font-sans transition-colors duration-300 text-center"
                >
                  Convert Another
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConversionForm;
