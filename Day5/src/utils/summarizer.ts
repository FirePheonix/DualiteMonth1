// This file is no longer needed as summarization is now handled by the Gemini API.
// It can be safely removed, but we'll leave it for now to avoid breaking imports if they exist elsewhere.
// In a real project, we would delete this file and update any corresponding imports.

export const generateSummaryFromTranscript = (transcript: string): string => {
  console.warn("generateSummaryFromTranscript is deprecated. Summarization is now handled by the Gemini API.");
  return "This function is deprecated. Please use the Gemini service for summarization.";
};
