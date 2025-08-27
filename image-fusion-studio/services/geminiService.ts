import { GoogleGenAI, Modality, GenerateContentResponse, Part } from "@google/genai";
import type { GenerateImageParams, GeneratedImage, ApiError } from "../types";
import { MODEL_NAME } from "../constants";

const mapErrorToApiError = (error: any): ApiError => {
    console.error("Gemini API Error:", error);

    const message = error.message || '';
    if (message.includes('API key not valid')) {
        return { message: "Invalid API Key", hint: "Please check your API key and ensure it's correct." };
    }
    if (message.includes('quota')) {
        return { message: "Quota Exceeded", hint: "You have exceeded your request quota. Please check your Google AI Studio account." };
    }
     if (message.includes('SAFETY')) {
        return { message: "Content Policy Violation", hint: "Your prompt or images may have violated the safety policy. Please adjust your input and try again." };
    }
    if (error instanceof TypeError && message.includes('fetch')) {
        return { message: "Network Error", hint: "Failed to connect to the Gemini API. Please check your internet connection." };
    }

    return { message: "An Unknown Error Occurred", hint: "Something went wrong. Please check the console for more details." };
}

export const generateImage = async (params: GenerateImageParams): Promise<GeneratedImage> => {
  const { apiKey, prompt, images } = params;

  if (!apiKey) {
    throw { message: "API Key is missing.", hint: "Please enter your Gemini API key to proceed." } as ApiError;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const imageParts: Part[] = images.map(image => ({
        inlineData: {
            mimeType: image.mimeType,
            data: image.base64,
        },
    }));

    const textPart: Part = { text: prompt };

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: {
            parts: [textPart, ...imageParts],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    
    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePart && imagePart.inlineData) {
      return {
        base64: imagePart.inlineData.data,
        mimeType: imagePart.inlineData.mimeType,
      };
    }

    const textResponse = response.text?.trim();
    if (textResponse) {
      throw { message: "Generation Failed", hint: textResponse } as ApiError;
    }
    
    throw { message: "No Image Generated", hint: "The model did not return an image. Please try modifying your prompt." } as ApiError;
  } catch (err) {
    if ((err as ApiError).message && (err as ApiError).hint !== undefined) {
        throw err; 
    }
    throw mapErrorToApiError(err);
  }
};
