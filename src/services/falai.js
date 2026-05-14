/**
 * Fal.ai API Service
 * All AI image generation calls go through here
 */

const FAL_PROXY_URL = import.meta.env.VITE_FAL_PROXY_URL || '/api/fal';

/**
 * Build a rich prompt from user input
 * @param {string} userPrompt
 * @returns {string}
 */
function buildRemixPrompt(userPrompt) {
  return `
    Professional advertising visual, high quality, print-ready.
    Turkish market advertisement style.
    Maintain original composition and layout structure.
    Apply changes: ${userPrompt}
    Photorealistic, commercial quality, 4K resolution.
  `.trim();
}

/**
 * Remix an ad image using Fal.ai
 * @param {{ imageUrl: string, prompt: string }} params
 * @returns {Promise<string>} Generated image URL
 */
export async function remixImage({ imageUrl, prompt }) {
  if (!imageUrl) throw new Error('imageUrl gerekli');
  if (!prompt?.trim()) throw new Error('prompt gerekli');

  try {
    // TODO: Connect to Fal.ai API via proxy
    // const result = await fal.run("fal-ai/flux/dev/image-to-image", { ... });
    throw new Error('Fal.ai integration not yet implemented');
  } catch (error) {
    if (error.status === 429) throw new Error('Limit aşıldı. Lütfen bekleyin.');
    if (error.status === 401) throw new Error('API anahtarı geçersiz.');
    throw new Error(`Remix başarısız: ${error.message}`);
  }
}
