import React, { useState } from 'react';
import { Loader2, Sparkles, RefreshCw, Download } from 'lucide-react';

const API_KEY = "AIzaSyDx3r0GqGhBwkusyouVpGxAL82y6nBgvGw";

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt!');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              responseModalities: ['TEXT', 'IMAGE'],
            },
          }),
        }
      );

      const data = await res.json();

      // Extract base64 image data
      const base64Image =
        data?.candidates?.[0]?.content?.parts?.find(
          (part: any) => part.inlineData?.mimeType === 'image/png'
        )?.inlineData?.data;

      if (!base64Image) throw new Error('No image returned');

      setGeneratedImage(`data:image/png;base64,${base64Image}`);
    } catch (err) {
      console.error(err);
      setError('Failed to generate image.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `nft-${Date.now()}.png`;
    a.click();
  };

  const generateRandom = () => {
    const prompts = [
      'futuristic tiger made of glass and fire',
      'robot panda meditating in space',
      'a dragon shaped like a galaxy',
      '3D frog king on a neon throne',
    ];
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Create Your NFT</h2>
          <p className="text-white/70 text-sm">AI-powered NFT image generation by Gemini</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., pixelated phoenix in cyberspace"
            disabled={isGenerating}
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
          />
          <button
            onClick={generateRandom}
            disabled={isGenerating}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Random
          </button>
        </div>

        <button
          onClick={generateImage}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate NFT
            </>
          )}
        </button>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {generatedImage && (
          <div className="space-y-4">
            <img
              src={generatedImage}
              alt="Generated NFT"
              className="w-full h-auto rounded-xl border border-white/20"
            />
            <div className="flex justify-center">
              <button
                onClick={downloadImage}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
