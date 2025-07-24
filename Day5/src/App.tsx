import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Globe, Zap, ArrowRight, Menu, X, Settings, Eye, EyeOff } from 'lucide-react';
import { summarizeVideo } from './services/api';
import { extractVideoId, isValidYouTubeUrl } from './utils/youtube';
import SummaryCard from './components/SummaryCard';

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    rapidApiKey: '',
    geminiApiKey: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    rapidApi: false,
    gemini: false
  });
  const [summaryResult, setSummaryResult] = useState<{
    videoId: string;
    summary: string;
    error?: string;
    rawResponse?: any;
  } | null>(null);

  const handleSummarize = async () => {
    if (!videoUrl.trim()) {
      setSummaryResult({
        videoId: '',
        summary: '',
        error: 'Please enter a YouTube URL'
      });
      return;
    }

    if (!apiKeys.rapidApiKey.trim() || !apiKeys.geminiApiKey.trim()) {
      setSummaryResult({
        videoId: '',
        summary: '',
        error: 'Please provide both RapidAPI and Gemini API keys in the settings'
      });
      return;
    }

    if (!isValidYouTubeUrl(videoUrl)) {
      setSummaryResult({
        videoId: '',
        summary: '',
        error: 'Please enter a valid YouTube URL'
      });
      return;
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      setSummaryResult({
        videoId: '',
        summary: '',
        error: 'Could not extract video ID from URL'
      });
      return;
    }

    console.log('🎯 Starting summarization for:', videoUrl);
    console.log('🆔 Extracted video ID:', videoId);

    setIsLoading(true);
    setSummaryResult(null);

    try {
      const result = await summarizeVideo(videoId, apiKeys.rapidApiKey, apiKeys.geminiApiKey);
      console.log('📋 Final result:', result);

      if (result.success && result.summary) {
        console.log('✅ Setting successful summary result');
        setSummaryResult({
          videoId,
          summary: result.summary,
          rawResponse: result.rawResponse,
        });
      } else {
        console.log('❌ Setting error result');
        setSummaryResult({
          videoId,
          summary: '',
          error: result.error || 'Failed to generate summary',
          rawResponse: result.rawResponse,
        });
      }
    } catch (error) {
      console.error('🚨 Unexpected error:', error);
      setSummaryResult({
        videoId,
        summary: '',
        error: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSummarize();
    }
  };

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Save Time",
      description: "Get the key points in seconds, not minutes"
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Supports Long Videos",
      description: "Works with videos of any length seamlessly"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multilingual AI",
      description: "Understands content in multiple languages"
    }
  ];

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="font-serif text-xl font-bold text-white">SummarizeAI</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-white/80 hover:text-white transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button className="w-full px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300">
                  Sign In
                </button>
                <button className="w-full px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Summarize YouTube Videos<br />
            <span className="text-white">Instantly with AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-12 max-w-3xl mx-auto"
          >
            No ads. No distractions. Just the essence — delivered in seconds.
          </motion.p>

          {/* Input Section */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto mb-8"
          >
            {/* API Keys Settings */}
            <div className="mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowApiKeys(!showApiKeys)}
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 mb-4"
              >
                <Settings className="w-4 h-4" />
                API Keys Settings
              </motion.button>
              
              {showApiKeys && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Configure Your API Keys</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        RapidAPI Key
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.rapidApi ? "text" : "password"}
                          placeholder="Enter your RapidAPI key"
                          value={apiKeys.rapidApiKey}
                          onChange={(e) => setApiKeys({...apiKeys, rapidApiKey: e.target.value})}
                          className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({...showPasswords, rapidApi: !showPasswords.rapidApi})}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                        >
                          {showPasswords.rapidApi ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-white/60 mt-1">
                        Get your key from <a href="https://rapidapi.com/rahilkhan224/api/youtube-video-summarizer-gpt-ai" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white underline">RapidAPI Hub</a>
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Google Gemini API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.gemini ? "text" : "password"}
                          placeholder="Enter your Gemini API key"
                          value={apiKeys.geminiApiKey}
                          onChange={(e) => setApiKeys({...apiKeys, geminiApiKey: e.target.value})}
                          className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({...showPasswords, gemini: !showPasswords.gemini})}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                        >
                          {showPasswords.gemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-white/60 mt-1">
                        Get your key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white underline">Google AI Studio</a>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <input
                type="text"
                placeholder="Paste YouTube Link…"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 min-w-0 w-full sm:w-auto"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSummarize}
                disabled={isLoading}
                className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 animate-glow disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Summarize
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Elegant Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-16"
          />

          {/* Results Section */}
          {summaryResult ? (
            <SummaryCard
              videoId={summaryResult.videoId}
              summary={summaryResult.summary}
              error={summaryResult.error}
              isLoading={isLoading}
              rawResponse={summaryResult.rawResponse}
            />
          ) : (
            /* Default Preview Card */
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  <div className="w-full lg:w-1/3">
                    <div className="aspect-video bg-white/10 rounded-lg overflow-hidden">
                      <img 
                        src="https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x225/1a1a1a/ffffff?text=Video+Preview" 
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-2/3 text-left">
                    <h3 className="text-xl font-semibold mb-4 text-white">AI-Generated Summary</h3>
                    <div className="space-y-3 text-white/80">
                      <p className="text-sm leading-relaxed">
                        • The video discusses advanced machine learning techniques for natural language processing
                      </p>
                      <p className="text-sm leading-relaxed">
                        • Key concepts include transformer architectures and attention mechanisms
                      </p>
                      <p className="text-sm leading-relaxed">
                        • Practical applications in real-world scenarios are demonstrated with examples
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose SummarizeAI?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Experience the future of content consumption with our advanced AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-white/80 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Start for Free – No Sign-Up Needed
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Experience the power of AI-driven video summarization. Transform any YouTube video into actionable insights in seconds.
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 animate-glow flex items-center gap-2 mx-auto"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-accent-gray text-sm">
              © 2025 SummarizeAI. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-accent-gray hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-accent-gray hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-accent-gray hover:text-white transition-colors text-sm">Support</a>
              <a href="#" className="text-accent-gray hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default App;
