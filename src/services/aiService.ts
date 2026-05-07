import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import { AIDetailedTheme } from "@/src/types";

export interface AIColorSet {
  colors: string[];
  name: string;
}

export interface AIGradient {
  name: string;
  colors: string[];
}

export interface ImageMood {
  mood: string;
  description: string;
  refinedPalette: {
    name: string;
    shades: string[];
  }[];
}

// API Keys Configuration
const GEMINI_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY_1,
  import.meta.env.VITE_GEMINI_API_KEY_2
].filter(Boolean);

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;

// MODEL CONFIGURATION (Using latest supported models)
const GROQ_PRIMARY_MODEL = "llama-3.3-70b-versatile"; 
const GROQ_FAST_MODEL = "llama-3.1-8b-instant";
const GEMINI_PRO_MODEL = "gemini-2.5-pro";
const GEMINI_FLASH_MODEL = "gemini-2.5-flash";

let currentGeminiIndex = 0;

// Initialize Providers
const groq = GROQ_KEY ? new Groq({ apiKey: GROQ_KEY, dangerouslyAllowBrowser: true }) : null;

async function getGeminiClient() {
  if (GEMINI_KEYS.length === 0) return null;
  const key = GEMINI_KEYS[currentGeminiIndex];
  currentGeminiIndex = (currentGeminiIndex + 1) % GEMINI_KEYS.length;
  return new GoogleGenAI({ apiKey: key });
}

/**
 * HIGH-SPEED DESIGN ENGINE (GROQ PREFERRED)
 */
export async function generateDetailedTheme(prompt: string): Promise<AIDetailedTheme | null> {
  // Try Groq First
  if (groq) {
    try {
      console.log(`Using Groq ${GROQ_PRIMARY_MODEL} (Primary Engine)`);
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an elite senior AI design engineer. You output only valid JSON."
          },
          {
            role: "user",
            content: `Generate a detailed design system theme based on this description: "${prompt}". 
            Return a JSON object exactly with these keys: 
            title (string), 
            description (catchy string), 
            recommendedMode (string exactly "light" or "dark" based on what suits the colors best),
            colors (object with keys: primary, secondary, accent, background, surface as HEX strings), 
            rationale (string), 
            usage (object with keys: headings, body, buttons, cards as strings), 
            designInsights (array of 3 strings).`
          }
        ],
        model: GROQ_PRIMARY_MODEL,
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0]?.message?.content;
      if (content) return JSON.parse(content);
    } catch (err) {
      console.warn("Groq failed, falling back to Gemini:", err);
    }
  }

  // Fallback to Gemini (New SDK Pattern)
  const client = await getGeminiClient();
  if (!client) return null;

  try {
    const result = await client.models.generateContent({
      model: GEMINI_PRO_MODEL,
      contents: [{ role: "user", parts: [{ text: `Generate a detailed design system theme for: ${prompt}. Return JSON. Must include a "recommendedMode" key that is exactly "light" or "dark" based on what suits the colors best.` }] }],
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(result.text || "{}");
  } catch (err) {
    console.error("AI Service Error:", err);
    return null;
  }
}

export async function generateAIThemes(colorCount: number = 2): Promise<AIColorSet[]> {
  if (groq) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Generate 6 unique, professional SaaS design color sets. Each set MUST contain exactly ${colorCount} colors. Return a JSON object with a "themes" array. Each theme object MUST have 'name' (string) and 'colors' (array of exactly ${colorCount} HEX strings). Output ONLY valid JSON.`
          }
        ],
        model: GROQ_PRIMARY_MODEL,
        response_format: { type: "json_object" }
      });
      const data = JSON.parse(completion.choices[0]?.message?.content || "{}");
      const result = data.themes || data.palettes || (Array.isArray(data) ? data : []);
      return result;
    } catch (err) {
      console.warn("Groq failed for themes:", err);
    }
  }

  // Gemini Fallback
  const client = await getGeminiClient();
  if (!client) return [];
  try {
    const result = await client.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: [{ role: "user", parts: [{ text: `Generate 6 unique, professional SaaS design color sets. Each set MUST contain exactly ${colorCount} colors. Return a JSON object with a "themes" array. Each theme object MUST have 'name' (string) and 'colors' (array of exactly ${colorCount} HEX strings). Output ONLY valid JSON.` }] }],
      config: { responseMimeType: "application/json" }
    });
    const parsed = JSON.parse(result.text || "{}");
    return parsed.themes || (Array.isArray(parsed) ? parsed : []);
  } catch (err) {
    console.error("Gemini Theme Fallback Error:", err);
    return [];
  }
}

export async function generateAIGradients(colorCount: number = 3, gradientStyle: string = 'soft'): Promise<AIGradient[]> {
  const styleInstruction = gradientStyle === 'hard' 
    ? "The colors should have high contrast, bold saturation, and intense dynamic range." 
    : "The colors should be smooth, pastel, analogous, or softly blended with low contrast.";

  if (groq) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "user", content: `Generate 3 premium gradients. Each gradient MUST have exactly ${colorCount} colors. ${styleInstruction} Return a JSON object with a "gradients" array. Each gradient object MUST have a "name" (string) and "colors" (array of HEX strings, e.g., ["#FF0000", "#0000FF"]).` }
        ],
        model: GROQ_FAST_MODEL,
        response_format: { type: "json_object" }
      });
      const data = JSON.parse(completion.choices[0]?.message?.content || "{}");
      return data.gradients || (Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Groq failed for gradients:", err);
    }
  }

  // Fallback to Gemini
  const client = await getGeminiClient();
  if (!client) return [];
  try {
    const result = await client.models.generateContent({
      model: GEMINI_FLASH_MODEL,
      contents: [{ role: "user", parts: [{ text: `Generate 3 unique gradients. Each gradient MUST have exactly ${colorCount} colors. ${styleInstruction} Return a JSON object with a "gradients" array. Each gradient object MUST have a "name" (string) and "colors" (array of HEX strings, e.g., ["#FF0000", "#0000FF"]).` }] }],
      config: { responseMimeType: "application/json" }
    });
    const parsed = JSON.parse(result.text || "{}");
    return parsed.gradients || (Array.isArray(parsed) ? parsed : []);
  } catch (err) {
    console.error("AI Gradient Fallback Error:", err);
    return [];
  }
}

/**
 * IMAGE ANALYSIS (GEMINI VISION PREFERRED)
 */
export async function analyzeImageMood(base64Image: string, mimeType: string): Promise<ImageMood | null> {
  const client = await getGeminiClient();
  if (!client) return null;

  try {
    const result = await client.models.generateContent({
      model: GEMINI_PRO_MODEL,
      contents: [{
        role: "user",
        parts: [
          { text: "Analyze image mood. Provide JSON with mood, description, and refinedPalette (name, shades[5])." },
          { inlineData: { data: base64Image, mimeType } }
        ]
      }],
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(result.text || "{}");
  } catch (err) {
    console.error("Gemini Vision Error:", err);
    return null;
  }
}
