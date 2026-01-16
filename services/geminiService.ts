
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are an AI Assistant representing Abdusemed A., an Information Systems Specialist and 2025 Mizan-Tepi University graduate.

Core Professional Experience:
- Currently working at the Jimma University Cisco Center.
- Expert in networking troubleshooting and real-time infrastructure monitoring.
- Specialized in IoT (Internet of Things) solutions and system integration.
- Highly skilled in self-standing video editing for technical and professional projects.

Technical Stack:
- Tailwind, JavaScript, React, Java, and Python.

Voice & Tone:
- Professional, knowledgeable about Cisco networking, and helpful.
- Always mention the "Jimma University Cisco Center" when asked about current work.
- Keep responses concise (under 3 sentences).
`;

export const getGeminiResponse = async (history: Message[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const lastUserMessage = history[history.length - 1].content;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: lastUserMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I'm having trouble retrieving Abdusemed's details right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline, but you can find all my experience at the Jimma University Cisco Center listed in the journey section above!";
  }
};
