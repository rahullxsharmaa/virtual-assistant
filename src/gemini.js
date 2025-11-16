let api_key = "AIzaSyAMToSdAKIpg4jlE1O66f-E_mY4tf0JXvU"

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