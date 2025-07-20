import axios from 'axios';

const API_BASE_URL = 'https://youtube-mp36.p.rapidapi.com';

interface ConversionResponse {
  status: string;
  mess: string;
  page: string;
  vid: string;
  extractor: string;
  length: string;
  a_format: string;
  a_quality: string;
  a_bitrate: string;
  a_sample_rate: string;
  a_ch: string;
  v_format: string;
  v_quality: string;
  v_resolution: string;
  download_url: string;
  title: string;
  t: number;
  a_type: string;
  v_type: string;
  links: {
    mp3: {
      mp3128: {
        size: string;
        f: string;
        q: string;
        k: string;
      };
    };
  };
}

export const extractVideoId = (url: string): string | null => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const convertToMp3 = async (videoId: string): Promise<ConversionResponse> => {
  // Check if API credentials are configured
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;
  
  if (!apiKey || apiKey === 'your_rapidapi_key_here') {
    throw new Error('API key not configured. Please add your RapidAPI key to the .env file.');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/dl`, {
      params: {
        id: videoId,
      },
      headers: {
        'X-Rapidapi-Key': apiKey,
        'X-Rapidapi-Host': apiHost,
      },
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      
      switch (status) {
        case 403:
          if (message?.includes('not subscribed')) {
            throw new Error('API subscription required. Please subscribe to the YouTube MP3 API on RapidAPI.');
          }
          throw new Error('API access denied. Please check your API key.');
        case 401:
          throw new Error('Invalid API key. Please check your credentials.');
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        case 404:
          throw new Error('Video not found or unavailable for conversion.');
        default:
          throw new Error(message || 'Failed to convert video. Please try again.');
      }
    }
    
    throw new Error('Network error. Please check your connection and try again.');
  }
};

export const isValidYouTubeUrl = (url: string): boolean => {
  return extractVideoId(url) !== null;
};
