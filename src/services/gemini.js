import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;

function getGenAI() {
  if (!genAI) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("VITE_GEMINI_API_KEY is not set.");
      return null;
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export const geminiService = {
  /**
   * Enhances a user's short prompt into a detailed image generation prompt.
   */
  async enhancePrompt(basePrompt, adContext) {
    try {
      const ai = getGenAI();
      if (!ai) return basePrompt;

      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        You are an expert prompt engineer for an AI image generator (like Flux/Midjourney).
        The user wants to remix an advertisement for the brand: ${adContext.brand}.
        The original campaign was: ${adContext.campaign}.
        
        The user's idea is: "${basePrompt}"
        
        Write a highly detailed, comma-separated prompt that describes the lighting, 
        camera angle, aesthetic, and specific visual elements to create a stunning, 
        professional advertising image. Keep it under 500 characters. 
        Do not include any conversational text, ONLY return the prompt itself.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error("[Gemini API] Error enhancing prompt:", error);
      return basePrompt; // Fallback to original
    }
  }
};
