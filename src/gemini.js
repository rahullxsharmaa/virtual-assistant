// I have removed api-key for privacy 

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:api_key});

async function run(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${prompt}`,
    });
    return response.text
}

export default run;
