import { useState } from 'react';
import { pinokioService } from '../services/pinokio';
import { geminiService } from '../services/gemini';

export function useRemix() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);
  const [loadingState, setLoadingState] = useState('');

  const generateRemix = async (ad, userPrompt) => {
    setIsGenerating(true);
    setError(null);
    setResultImage(null);
    
    try {
      // 1. Prompt Enhancement via Gemini
      setLoadingState('Enhancing prompt with Gemini AI...');
      const enhancedPrompt = await geminiService.enhancePrompt(userPrompt, ad);
      
      // 2. Image Generation via Local Pinokio
      setLoadingState('Generating image via local Pinokio runtime...');
      const response = await pinokioService.generateImage(ad.originalUrl, enhancedPrompt);
      
      if (response.success) {
        setResultImage(response.resultUrl);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsGenerating(false);
      setLoadingState('');
    }
  };

  return {
    generateRemix,
    isGenerating,
    resultImage,
    error,
    loadingState
  };
}
