import axios from 'axios';
import { getSummaryFromGemini } from './gemini';

const API_BASE_URL = 'https://youtube-video-summarizer-gpt-ai.p.rapidapi.com';

export interface SummaryResponse {
  success: boolean;
  summary?: string;
  error?: string;
  rawResponse?: any;
}

export const summarizeVideo = async (videoId: string, rapidApiKey: string, geminiApiKey: string): Promise<SummaryResponse> => {
  try {
    console.log('🚀 Making API call for video ID:', videoId);
    
    const api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'youtube-video-summarizer-gpt-ai.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
    });
    
    // The only reliable endpoint seems to be the transcript one.
    const response = await api.get(`/api/v1/get-transcript-v2?video_id=${videoId}&platform=youtube`);
    
    console.log(`✅ Transcript fetched successfully. Status:`, response.status);
    
    if (!response.data) {
      throw new Error("Received empty transcript from the API.");
    }
    
    // Now, use Gemini to generate the actual summary from the transcript
    const finalSummary = await getSummaryFromGemini(response.data, geminiApiKey);
    
    return {
      success: true,
      summary: finalSummary.trim(),
      rawResponse: response.data, // Keep the original transcript for debugging
    };
    
  } catch (error: any) {
    console.error('❌ API or Summarization Error:', error);
    let errorMessage = 'Failed to process video. Please try again.';
    
    if (error.response?.status === 429) errorMessage = 'Rate limit exceeded on the transcript service. Please try again later.';
    else if (error.response?.status === 401) errorMessage = 'Invalid API key for the transcript service.';
    else if (error.response?.status === 404) errorMessage = 'Transcript service not found. It may be unavailable.';
    else if (error.response?.data?.message) errorMessage = error.response.data.message;
    else if (error.message) errorMessage = error.message;

    return {
      success: false,
      error: errorMessage,
      rawResponse: error.response?.data || { error: error.message },
    };
  }
};
