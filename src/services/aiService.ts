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
const GROQ_PRIMARY_MODEL = "llama-3.3-70b-versatile"; // Updated from decommissioned model
const GROQ_FAST_MODEL = "llama-3.1-8b-instant";
const GEMINI_PRO_MODEL = "gemini-1.5-pro";
const GEMINI_FLASH_MODEL = "gemini-1.5-flash";

let currentGeminiIndex = 0;

// Initialize Providers
const groq = GROQ_KEY ? new Groq({ apiKey: GROQ_KEY, dangerouslyAllowBrowser: true }) : null;

async function getGeminiModel(modelName: string) {
  if (GEMINI_KEYS.length === 0) return null;
  const key = GEMINI_KEYS[currentGeminiIndex];
  currentGeminiIndex = (currentGeminiIndex + 1) % GEMINI_KEYS.length;
  const genAI = new GoogleGenAI(key);
  return genAI.getGenerativeModel({ model: modelName });
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

  // Fallback to Gemini
  const model = await getGeminiModel(GEMINI_PRO_MODEL);
  if (!model) return null;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `Generate a detailed design system theme for: ${prompt}. Return JSON.` }] }],
      generationConfig: { responseMimeType: "application/json" }
    });
    return JSON.parse(result.response.text());
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
            content: `Generate 6 unique, professional SaaS design color sets. Each set MUST contain exactly ${colorCount} colors. Return JSON object with a "themes" array of objects with 'colors' (array) and 'name' (string).`
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
  const model = await getGeminiModel(GEMINI_FLASH_MODEL);
  if (!model) return [];
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `Generate 6 color sets with ${colorCount} colors as a JSON array.` }] }],
      generationConfig: { responseMimeType: "application/json" }
    });
    return JSON.parse(result.response.text());
  } catch (err) {
    console.error("Gemini Theme Fallback Error:", err);
    return [];
  }
}

export async function generateAIGradients(): Promise<AIGradient[]> {
  if (groq) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "user", content: "Generate 3 premium gradients as a JSON object with a \"gradients\" array of {name, colors[]}." }
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
  const model = await getGeminiModel(GEMINI_FLASH_MODEL);
  if (!model) return [];
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: "Generate 3 unique gradients as JSON array of {name, colors[]}." }] }],
      generationConfig: { responseMimeType: "application/json" }
    });
    const parsed = JSON.parse(result.response.text());
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("AI Gradient Fallback Error:", err);
    return [];
  }
}

/**
 * IMAGE ANALYSIS (GEMINI VISION PREFERRED)
 */
export async function analyzeImageMood(base64Image: string, mimeType: string): Promise<ImageMood | null> {
  const model = await getGeminiModel(GEMINI_PRO_MODEL);
  if (!model) return null;

  try {
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { text: "Analyze image mood. Provide JSON with mood, description, and refinedPalette (name, shades[5])." },
          { inlineData: { data: base64Image, mimeType } }
        ]
      }],
      generationConfig: { responseMimeType: "application/json" }
    });
    return JSON.parse(result.response.text());
  } catch (err) {
    console.error("Gemini Vision Error:", err);
    return null;
  }
}
