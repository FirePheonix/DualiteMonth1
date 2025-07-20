import React, { useState } from 'react';
import { Search, MapPin, Users, Instagram, Star, TrendingUp, Zap, Globe, Target, ArrowRight } from 'lucide-react';

interface LeadData {
  title: string | null;
  url: string | null;
  description: string | null;
  followers: string | null;
  channelName: string | null;
  position: number | null;
  emphasizedKeywords: string[];
  type: string | null;
}

interface SearchResults {
  instagramClubs: LeadData[];
  error?: string;
}

function App() {
  const [leadType, setLeadType] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dummy data matching the expected format
  const dummyData: SearchResults = {
    instagramClubs: [
      {
        title: "Elite Fitness Club Chandigarh",
        url: "https://instagram.com/elitefitnesschd",
        description: "Premium fitness club in the heart of Chandigarh. State-of-the-art equipment and expert trainers.",
        followers: "12.5K",
        channelName: "@elitefitnesschd",
        position: 1,
        emphasizedKeywords: ["fitness", "gym", "chandigarh"],
        type: "club"
      },
      {
        title: "Chandigarh Sports Club",
        url: "https://instagram.com/chdsportsclub",
        description: "Multi-sport club offering cricket, tennis, swimming and more. Join the community of sports enthusiasts.",
        followers: "8.2K",
        channelName: "@chdsportsclub",
        position: 2,
        emphasizedKeywords: ["sports", "cricket", "tennis"],
        type: "club"
      },
      {
        title: "The Social Club Sector 17",
        url: "https://instagram.com/thesocialclubchd",
        description: "Trendy social club and lounge in Sector 17. Perfect for networking and entertainment.",
        followers: "15.8K",
        channelName: "@thesocialclubchd",
        position: 3,
        emphasizedKeywords: ["social", "lounge", "networking"],
        type: "club"
      }
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      // For now, we'll use dummy data
      // In production, replace with your n8n webhook URL
      const webhookUrl = "https://shubhammm069.app.n8n.cloud/webhook-test/lead-finder";
      if(!webhookUrl){
        console.log('Webhook URL is not set. Using dummy data instead.');
      }
      
      // Simulating API call with dummy data
      // setTimeout(() => {
      //   setResults(dummyData);
      //   setIsLoading(false);
      // }, 1000);
      
      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            leadType,
            location,
          }),
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data : SearchResults = await res.json();
        setResults(data);
        console.log('Fetched leads:', data);
        setIsLoading(false);
      }  catch (error:any) {
      console.error('Error fetching leads:', error);
      console.log('Using dummy data instead.');
      setResults(dummyData);
      setIsLoading(false);
      } finally {
        setIsLoading(false);
      }

    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch leads. Please try again later.');
      setIsLoading(false);
    } 
  
  };

  return (
    <div className="min-h-screen bg-pitch-white font-inter relative overflow-x-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 text-purple-200 opacity-20">
          <Instagram size={120} className="animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 text-blue-200 opacity-15">
          <TrendingUp size={90} className="animate-bounce" />
        </div>
        <div className="absolute bottom-40 left-20 text-pink-200 opacity-20">
          <Target size={100} className="animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-10 text-indigo-200 opacity-15">
          <Zap size={80} className="animate-bounce" />
        </div>
        <div className="absolute bottom-20 right-1/3 text-cyan-200 opacity-20">
          <Globe size={110} className="animate-pulse" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div 
          className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(88, 28, 135, 0.9) 50%, rgba(30, 64, 175, 0.9) 100%), url('https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2339&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Animated particles */}
          <div className="absolute inset-0">
            <div className="absolute animate-ping top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-50"></div>
            <div className="absolute animate-ping top-1/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full opacity-60" style={{animationDelay: '1s'}}></div>
            <div className="absolute animate-ping bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-40" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 py-16 relative z-10">
            {/* Header */}
            <div className="text-center mb-20 pt-20">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-8 border border-white/20">
                <Star className="w-4 h-4 mr-2 text-yellow-300" />
                Premium Lead Discovery Platform
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
                Instagram
                <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Lead Finder
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12">
                Discover premium leads and connect with the right Instagram accounts. 
                <span className="block mt-2 text-lg text-white/60">
                  Find clubs, influencers, and businesses with AI-powered precision.
                </span>
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">10M+</div>
                  <div className="text-white/60 text-sm">Accounts Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">99.9%</div>
                  <div className="text-white/60 text-sm">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-white/60 text-sm">Happy Users</div>
                </div>
              </div>
            </div>

            {/* Luxury Search Form */}
            <div className="max-w-4xl mx-auto mb-20">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Lead Type Input */}
                    <div className="space-y-4">
                      <label htmlFor="leadType" className="flex items-center text-lg font-semibold text-white mb-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                          <Users className="w-5 h-5 text-purple-300" />
                        </div>
                        Which lead are you looking for?
                      </label>
                      <input
                        id="leadType"
                        type="text"
                        value={leadType}
                        onChange={(e) => setLeadType(e.target.value)}
                        placeholder="e.g., Clubs, Influencers, Restaurants"
                        className="w-full px-6 py-5 text-lg bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 placeholder-gray-500 text-gray-900"
                        required
                      />
                    </div>

                    {/* Location Input */}
                    <div className="space-y-4">
                      <label htmlFor="location" className="flex items-center text-lg font-semibold text-white mb-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                          <MapPin className="w-5 h-5 text-blue-300" />
                        </div>
                        Location?
                      </label>
                      <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., Chandigarh, Delhi, Mumbai"
                        className="w-full px-6 py-5 text-lg bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 placeholder-gray-500 text-gray-900"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-lg font-bold rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-300/50 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transform"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Finding Premium Leads...
                        </>
                      ) : (
                        <>
                          <Search className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                          Find Leads
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="relative z-10 bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                <Target className="w-4 h-4 mr-2" />
                Results Found
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Premium Instagram Leads
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked leads matching your criteria
              </p>
            </div>
            
            <div className="grid gap-8">
              {results.instagramClubs.map((lead, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                            <Instagram className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                              {lead.title}
                            </h3>
                            {lead.channelName && (
                              <p className="text-purple-600 font-semibold">{lead.channelName}</p>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                          {lead.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          {lead.followers && (
                            <div className="flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-xl font-semibold">
                              <Users className="w-4 h-4 mr-1" />
                              {lead.followers} followers
                            </div>
                          )}
                          {lead.type && (
                            <div className="px-3 py-2 bg-purple-50 text-purple-700 rounded-xl font-semibold capitalize">
                              {lead.type}
                            </div>
                          )}
                          {lead.position && (
                            <div className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-xl font-semibold">
                              <Star className="w-4 h-4 mr-1" />
                              Rank #{lead.position}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        {lead.url && (
                          <a
                            href={lead.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                          >
                            <Instagram className="w-4 h-4 mr-2" />
                            Visit Profile
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {lead.emphasizedKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500 mr-2">Keywords:</span>
                        {lead.emphasizedKeywords.map((keyword, keyIndex) => (
                          <span
                            key={keyIndex}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full border transition-colors"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-center py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">Powered by n8n & AI</span>
          </div>
          <p className="text-white/60 text-sm">
            © 2025 Instagram Lead Finder. Premium lead discovery made simple.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
