/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import type { NewsFlashItem, WeatherCondition, GroundingSource } from '../components/types.ts';

/**
 * Generates a news flash using a text-based AI model.
 * @returns A promise that resolves to an array of news flash items.
 */
export const getNewsFlash = async (date: Date, dob?: string): Promise<NewsFlashItem[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

    // Check if it's the user's birthday
    if (dob) {
        const today = new Date();
        const userDob = new Date(dob);
        if (userDob.getDate() === today.getDate() && userDob.getMonth() === today.getMonth()) {
            return [{
                headline: `Happy Birthday! We wish you a wonderful day filled with joy and learning.`,
                story: `Happy Birthday! On behalf of the entire Canvas Play team, we're sending you our warmest wishes on your special day. May the year ahead be filled with exciting discoveries, new knowledge, and great success. Keep learning, stay curious, and have a fantastic celebration!`
            }];
        }
    }
    
    const todayString = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const cacheKey = `facts-cache-${todayString}`;
    
    // Pre-emptive cache check for performance
    try {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            console.log("Returning cached facts.");
            return JSON.parse(cachedData);
        }
    } catch (error) {
        console.warn("Could not access local storage for facts cache:", error);
    }
    
    const prompt = `
You are an AI assistant for an educational app called Canvas Play.
Today's date is ${date.toDateString()}.
Your task is to generate a list of 5 interesting items for the "Today's Fact" ticker.

First, check if today is a major festival or special occasion (e.g., Diwali, Holi, Independence Day, New Year's Day, etc., with a focus on broadly recognized events). If it is, the FIRST item in the list must be a warm greeting for that occasion. The headline should be the greeting, and the story should be a short, positive paragraph about the occasion.

For the remaining items (or all 5 if there's no special occasion), generate engaging "Did You Know?" facts or interesting trivia.
Each item must have:
1. "headline": A short, catchy "Did you know..." question or a surprising fact statement.
2. "story": A single, detailed paragraph explaining the fact in an easy-to-understand and fun way.

The topics for the facts should be diverse: science, history, nature, technology, etc.
Keep the tone light, educational, and positive.
Avoid any sensitive or controversial topics.
`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    headline: {
                      type: Type.STRING,
                      description: "A short, catchy headline for the fact or greeting."
                    },
                    story: {
                      type: Type.STRING,
                      description: "A single, detailed paragraph explaining the fact or greeting."
                    }
                  }
                }
              }
            }
        });

        const jsonStr = response.text.trim();
        const data: NewsFlashItem[] = JSON.parse(jsonStr);
        
        // Save to cache
        try {
            localStorage.setItem(cacheKey, JSON.stringify(data));
        } catch (error) {
            console.warn("Could not save facts to local storage:", error);
        }

        return data;

    } catch (error) {
        console.error("Failed to fetch or parse facts:", error);

        // Gracefully handle rate-limiting by attempting to return stale cache data.
        if (JSON.stringify(error).includes('429')) {
            try {
                const cachedDataJSON = localStorage.getItem(cacheKey);
                if (cachedDataJSON) {
                    const cachedData = JSON.parse(cachedDataJSON);
                    console.warn("API rate limited. Returning stale facts data from cache.", cachedData);
                    return cachedData;
                }
            } catch (cacheError) {
                console.warn("Could not access local storage for stale facts data:", cacheError);
            }
        }

        // Provide a generic, interesting fact as a fallback
        return [{
            headline: "Did you know? The shortest war in history lasted only 38 minutes.",
            story: "The Anglo-Zanzibar War, fought between the United Kingdom and the Zanzibar Sultanate on August 27, 1896, holds the record for the shortest war in history. The conflict was triggered by the death of the pro-British Sultan and the succession of a new Sultan whom the British did not approve of. The fighting lasted between 38 and 45 minutes before a surrender was declared."
        }];
    }
};

export const translateText = async (
  text: string, 
  targetLanguage: string, 
  chapterId: number, 
  contentIndex?: number
): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    
    // Check local storage first
    const cacheKey = `translation-cache-${chapterId}-${contentIndex ?? 'main'}-${targetLanguage}`;
    try {
        const cachedTranslation = localStorage.getItem(cacheKey);
        if (cachedTranslation) {
            console.log("Returning cached translation.");
            return cachedTranslation;
        }
    } catch (error) {
        console.warn("Could not access local storage for translation cache:", error);
    }

    // If not in cache, call the API
    const prompt = `
You are an expert translator specializing in educational content.
Translate the following text into ${targetLanguage}.
Preserve the original HTML tags (like <h1>, <p>, <strong>) and structure exactly as they are. Only translate the text content within these tags.
Do not add any new HTML tags or alter the existing ones.
Do not add any introductory phrases like "Here is the translation:".
Return ONLY the translated HTML content.

Text to translate:
${text}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const translatedHtml = response.text;
    
    // Save the new translation to local storage
    try {
        localStorage.setItem(cacheKey, translatedHtml);
    } catch (error) {
        console.warn("Could not save translation to local storage:", error);
    }

    return translatedHtml;
};

export const getWeatherData = async (latitude: number, longitude: number, bypassCache = false): Promise<{ temperature: number; condition: WeatherCondition, forecast: string, sources: GroundingSource[], timestamp: number }> => {
    console.log("Weather API call is disabled for development. Returning mock data.");
    
    // Return a static, hardcoded weather object to avoid API calls during development.
    const mockWeatherData = {
        temperature: 28,
        condition: 'PartlyCloudyDay' as WeatherCondition,
        forecast: 'Sunny skies ahead. Happy coding!',
        sources: [],
        timestamp: Date.now()
    };
    
    return Promise.resolve(mockWeatherData);
};

// In-memory cache for place searches to prevent rate-limiting when typing.
const searchMemoryCache = new Map<string, { timestamp: number; results: { name: string; lat: number; lon: number }[] }>();
const SEARCH_CACHE_DURATION_MINUTES = 15;

export const searchPlaces = async (query: string): Promise<{ name: string; lat: number; lon: number }[]> => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];
    
    const cacheKey = `search-cache-${normalizedQuery}`;

    // 1. Check short-term in-memory cache
    const memoryCached = searchMemoryCache.get(normalizedQuery);
    if (memoryCached) {
        const isMemoryCacheValid = (Date.now() - memoryCached.timestamp) < SEARCH_CACHE_DURATION_MINUTES * 60 * 1000;
        if (isMemoryCacheValid) {
            console.log(`Returning in-memory cached search results for: "${normalizedQuery}"`);
            return memoryCached.results;
        }
    }
    
    // 2. Check sessionStorage cache
    try {
        const sessionCachedJSON = sessionStorage.getItem(cacheKey);
        if (sessionCachedJSON) {
            const sessionCached = JSON.parse(sessionCachedJSON);
            const isSessionCacheValid = (Date.now() - sessionCached.timestamp) < SEARCH_CACHE_DURATION_MINUTES * 60 * 1000;
            if (isSessionCacheValid) {
                console.log(`Returning sessionStorage cached search results for: "${normalizedQuery}"`);
                searchMemoryCache.set(normalizedQuery, sessionCached); // Populate memory cache
                return sessionCached.results;
            }
        }
    } catch (error) {
        console.warn("Could not access session storage for search cache:", error);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    const prompt = `
You are a geocoding autocomplete API. Your task is to find a list of locations using Google Search that match the beginning of the user's query text.

**CRITICAL RULES:**
1.  **AUTOCOMPLETE BEHAVIOR:** The primary goal is to provide autocomplete suggestions. The returned location names MUST start with the user's query text.
    - Example: If the query is "Dib", you should return "Dibrugarh, Assam, India", "Dibrugarh University", etc.
    - Example: If the query is "d", you should return places like "Delhi, India", "Dhaka, Bangladesh", "Dibrugarh, Assam, India".
2.  **RELEVANCE:** Prioritize more significant locations (cities, towns) over very specific places if the query is short.
3.  **STRICT JSON ONLY:** You MUST return ONLY a raw JSON array. No explanations, no text, no markdown like \`\`\`json.
4.  **JSON FORMAT:** The JSON must be an array of objects. Each object MUST have these exact keys: "name", "lat", "lon".
5.  **NO RESULTS:** If no matching locations are found, you MUST return an empty array \`[]\`.

**User Query:** "${query}"

Return up to 5 of the most relevant autocomplete suggestions.
`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                temperature: 0,
            },
        });

        const text = response.text;
        if (!text) {
            console.error("API response for places search did not contain text:", response);
            throw new Error("API response was empty.");
        }

        let jsonStr = text.trim();
        
        // Robust JSON extraction
        const jsonStart = jsonStr.indexOf('[');
        const jsonEnd = jsonStr.lastIndexOf(']');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
            jsonStr = jsonStr.substring(jsonStart, jsonEnd + 1);
        } else {
             const jsonMatch = jsonStr.match(/```(json)?\s*([\s\S]*?)\s*```/);
            if (jsonMatch && jsonMatch[2]) {
                jsonStr = jsonMatch[2];
            }
        }
        
        const results = JSON.parse(jsonStr);

        if (!Array.isArray(results)) {
            throw new Error("Invalid JSON structure received from API: expected an array.");
        }

        const validatedResults = results.filter(r => r && typeof r.name === 'string' && typeof r.lat === 'number' && typeof r.lon === 'number');
        const cacheData = { timestamp: Date.now(), results: validatedResults };
        
        // Save to both caches
        searchMemoryCache.set(normalizedQuery, cacheData);
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
        } catch (error) {
            console.warn("Could not save search results to session storage:", error);
        }
        return validatedResults;

    } catch (error) {
        console.error("Error searching for places:", error);
        return [];
    }
};