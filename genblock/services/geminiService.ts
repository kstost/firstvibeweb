import { GoogleGenAI, Type } from "@google/genai";
import { BlockShape } from '../types';

export const generateCreativeBlock = async (prompt: string, apiKey: string): Promise<BlockShape | null> => {
    if (!apiKey) {
        alert("Please set your Gemini API key to use this feature.");
        return null;
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a pixel art assistant. Based on the following prompt, create a small, recognizable pixel art shape that can be used as a block in a puzzle game. The shape must fit within a 5x5 grid. Return ONLY the JSON representation of this shape. The JSON should be an array of arrays, where 1 represents a filled pixel and 0 represents an empty one. Do not include any other text or markdown.

Prompt: "${prompt}"`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        shape: {
                            type: Type.ARRAY,
                            description: "A 2D array representing the pixel art shape, using 1 for filled and 0 for empty.",
                            items: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.INTEGER
                                }
                            }
                        }
                    }
                },
                temperature: 0.7,
            },
        });
        
        const jsonString = response.text;
        const parsed = JSON.parse(jsonString);

        if (parsed.shape && Array.isArray(parsed.shape)) {
            // Validate and clean the shape
            const cleanedShape = parsed.shape.map((row: any) => 
                Array.isArray(row) ? row.map((cell: any) => (cell === 1 ? 1 : 0)) : []
            ).filter((row: any[]) => row.length > 0 && row.some(cell => cell === 1));

            if(cleanedShape.length > 0) {
                 return cleanedShape as BlockShape;
            }
        }
        
        console.error("Generated JSON is not in the expected format:", parsed);
        return null;

    } catch (error: any) {
        console.error("Error generating creative block:", error);
        localStorage.removeItem('geminiApiKey');
        
        // Extract clean error message from various possible error formats
        let errorMessage = "Failed to generate block";
        
        // Try to parse JSON error first
        if (typeof error.message === 'string') {
            try {
                const parsed = JSON.parse(error.message);
                if (parsed.error?.message) {
                    errorMessage = parsed.error.message;
                }
            } catch {
                // If JSON parsing fails, check other formats
                if (error?.response?.data?.error?.message) {
                    errorMessage = error.response.data.error.message;
                } else if (error?.message && !error.message.includes('{')) {
                    errorMessage = error.message;
                }
            }
        }
        
        // Throw with clean message for toast display
        throw new Error(errorMessage);
    }
};