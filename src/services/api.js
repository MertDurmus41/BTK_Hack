/**
 * General API service
 * Centralized fetch wrapper with error handling
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * @param {string} endpoint
 * @param {RequestInit} options
 * @returns {Promise<any>}
 */
export async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}
