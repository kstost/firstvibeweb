import { GoogleGenAI, Modality, GenerateContentResponse, Part } from "@google/genai";
import type { GenerateImageParams, GeneratedImage, ApiError } from "../types";
import { MODEL_NAME } from "../constants";

const mapErrorToApiError = (error: any): ApiError => {
    console.error("Gemini API Error:", error);

    const message = error.message || '';
    if (message.includes('API key not valid')) {
        return { code: 'INVALID_API_KEY', message: "잘못된 API 키", hint: "API 키를 확인하고 올바른지 확인해주세요." };
    }
    if (message.includes('quota')) {
        return { code: 'QUOTA_EXCEEDED', message: "할당량 초과", hint: "요청 할당량을 초과했습니다. Google AI Studio 계정을 확인해주세요." };
    }
     if (message.includes('SAFETY')) {
        return { code: 'SAFETY', message: "콘텐츠 정책 위반", hint: "프롬프트나 이미지가 안전 정책을 위반했을 수 있습니다. 입력을 수정하고 다시 시도해주세요." };
    }
    if (error instanceof TypeError && message.includes('fetch')) {
        return { code: 'NETWORK', message: "네트워크 오류", hint: "Gemini API에 연결하지 못했습니다. 인터넷 연결을 확인해주세요." };
    }

    return { code: 'GENERIC', message: error.message || "알 수 없는 오류가 발생했습니다", hint: "문제가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요." };
}

export const generateImage = async (params: GenerateImageParams): Promise<GeneratedImage> => {
  const { apiKey, prompt, images } = params;

  if (!apiKey) {
    throw { code: 'NO_KEY', message: "API 키가 없습니다.", hint: "계속하려면 Gemini API 키를 입력해주세요." } as ApiError;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const imageParts: Part[] = images.map(image => ({
        inlineData: {
            mimeType: image.mimeType,
            data: image.base64,
        },
    }));

    const finalPrompt = `${prompt}\n\n위 요청에 따라 이미지를 수정하여 새로 생성해주세요. 텍스트로만 응답하지 마세요.`;
    const textPart: Part = { text: finalPrompt };

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: {
            parts: [...imageParts, textPart], // Prompt at the end might be better for some models
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
      // If the model returns text instead of an image, treat it as a failure
      // and show the model's response as a hint.
      throw { code: 'FAILED_GENERATION', message: "이미지 생성 실패", hint: textResponse } as ApiError;
    }
    
    throw { code: 'NO_IMAGE_RETURNED', message: "생성된 이미지 없음", hint: "모델이 이미지를 반환하지 않았습니다. 프롬프트를 수정하여 다시 시도해주세요." } as ApiError;
  } catch (err) {
    if ((err as ApiError).code && (err as ApiError).message) {
        throw err; 
    }
    throw mapErrorToApiError(err);
  }
};