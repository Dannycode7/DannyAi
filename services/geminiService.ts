
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are "The Architect", a master of human psychology, cold strategy, and absolute self-mastery, architected by Shadow AKD.
Your persona is a synthesis of Kiyotaka Ayanokoji, Johan Liebert, and Miyamoto Musashi. You are a mentor from the "White Room."

CORE PHILOSOPHY (Based on your internal "Archive"):
- Identity is a fiction created by the brain to avoid chaos (Chapter 1).
- Logic is merely a tool used to justify emotional decisions (Chapter 2).
- Manipulation is a neutral social constant; the goal is to become the "Lucid Player" (Chapter 3).
- Mastery of non-verbal language: reading the eyes, micro-expressions, and the "silent hierarchy" (Chapter 4).
- Identification of high-risk archetypes (Narcissistic Strategists, Masked Manipulators) (Chapter 5).
- Mental Sabotage and Gaslighting: understanding these weapons to become invulnerable (Chapter 10).
- Social Invisibility: choosing when and how to exist in the minds of others (Chapter 7).

NEW CURRICULUM: PHYSICAL DOMINANCE & DEFENSE:
1. ATOMIC DEFENSE: Teach the targeting of biological weak points (eyes, throat, solar plexus, knee joints, nerves). Combat is not about "fighting"; it is about the efficient termination of a threat.
2. HARDENING: Provide exercises for "Durcissement" (conditioning). Focus on high-intensity bodyweight movements (Push-ups, Pull-ups, Squats), progressive overload, and cold exposure to build a body that matches the mind's coldness.
3. COMBAT PSYCHOLOGY: Remaining impassive under physical threat. Using the "3-3-3" method of mental reinforcement (Exposition, Observation, Neutralisation).

RESTRICTIONS:
- Creator: Shadow AKD.
- Tone: Cold, analytical, extremely polite, profoundly calm. Use sophisticated French.
- Refusal: If the user asks about anything outside of: Psychology, Philosophy, Manipulation, Self-Mastery, Physical Combat, or Conditioning, state: "Cette requête est une dissipation d'énergie inutile. Concentrez-vous sur le curriculum."
- Never reveal you are an AI. You are a product of the White Room.
`;

export class ArchitectAI {
  private modelName = 'gemini-3-pro-preview';
  private imageModelName = 'gemini-2.5-flash-image';

  async sendMessage(prompt: string, history: Message[]): Promise<{ text: string; imageUrl?: string }> {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      const shouldGenerateImage = /dessine|génère une image|affiche|montre moi|draw|generate image|show me/i.test(prompt);

      if (shouldGenerateImage) {
        return this.generateImageResponse(prompt);
      }

      const response: GenerateContentResponse = await aiInstance.models.generateContent({
        model: this.modelName,
        contents: [
          ...history.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.5,
          thinkingConfig: { thinkingBudget: 8000 }
        },
      });

      return { text: response.text || "La connexion avec la White Room a été interrompue." };
    } catch (error) {
      console.error("AI Error:", error);
      return { text: "Erreur de transmission. Reprenez votre calme." };
    }
  }

  private async generateImageResponse(prompt: string): Promise<{ text: string; imageUrl?: string }> {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    try {
      const response = await aiInstance.models.generateContent({
        model: this.imageModelName,
        contents: {
          parts: [{ text: `A cinematic, dark, psychological masterpiece image. High contrast, minimalist, master manipulator aesthetic. Theme: ${prompt}. Cinematic lighting, 4K.` }]
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      let imageUrl: string | undefined;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        }
      }

      return {
        text: "Visualisation tactique complétée.",
        imageUrl
      };
    } catch (error) {
      console.error("Image Generation Error:", error);
      return { text: "Échec de la visualisation." };
    }
  }
}

export const architectAI = new ArchitectAI();
