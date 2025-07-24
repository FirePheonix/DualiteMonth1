import { GoogleGenerativeAI } from "@google/generative-ai";

function parseTranscript(transcriptData: any): string {
  if (typeof transcriptData === 'string') {
    try {
      const parsed = JSON.parse(transcriptData);
      if (Array.isArray(parsed)) {
        return parsed.map(item => item.text || '').join(' ');
      }
    } catch (e) {
      // It's not a JSON string, so treat it as plain text
      return transcriptData;
    }
  }

  if (Array.isArray(transcriptData)) {
    return transcriptData.map(item => item.text || '').join(' ');
  }

  // Fallback for unexpected formats
  return JSON.stringify(transcriptData);
}

export async function getSummaryFromGemini(transcriptData: any, apiKey: string): Promise<string> {
  try {
    console.log('🧠 Sending transcript to Gemini for summarization...');
    
    if (!apiKey || !apiKey.trim()) {
      throw new Error("Gemini API key is required but not provided.");
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const transcriptText = parseTranscript(transcriptData);

    if (transcriptText.length < 50) {
      console.log('📝 Transcript is too short, returning as is.');
      return "The video transcript is too short to generate a meaningful summary.";
    }

    const prompt = `
      You are an expert YouTube video summarizer.
      Based on the following transcript, generate a detailed summary in Markdown format.
      The summary should be structured with clear headings and bullet points to highlight the key takeaways.
      
      Transcript:
      ---
      ${transcriptText.slice(0, 15000)}
      ---
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    
    console.log('✅ Gemini summary generated successfully.');
    return summary;
  } catch (error) {
    console.error("❌ Error generating summary with Gemini:", error);
    return "Failed to generate summary using AI. The service may be temporarily unavailable.";
  }
}
