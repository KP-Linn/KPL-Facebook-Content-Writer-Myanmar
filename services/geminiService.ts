
import { GoogleGenAI } from "@google/genai";
import type { FormData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFacebookContent = async (formData: FormData): Promise<string> => {
  const { topic, tone, format, audience } = formData;

  const prompt = `You are an expert social media manager specializing in Facebook content for a Myanmar audience.
Generate a compelling and engaging ${format} in the MYANMAR LANGUAGE.

**Instructions:**
- Language: MUST be MYANMAR (Burmese).
- Topic: "${topic}"
- Tone of Voice: ${tone}
- Target Audience: ${audience}
- Format: ${format}

**Content Requirements:**
- Write in natural, fluent Burmese that resonates with the target audience.
- Structure the content appropriately for the chosen format.
- Include 2-4 relevant hashtags in Burmese.
- Add engaging emojis where appropriate.

Generate the content now.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
