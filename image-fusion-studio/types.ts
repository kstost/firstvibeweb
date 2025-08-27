
export type AppState = 'idle' | 'loading' | 'success' | 'error';

export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
}

export interface ApiImagePart {
  mimeType: string;
  base64: string;
}

export interface GenerateImageParams {
  apiKey: string;
  prompt: string;
  images: ApiImagePart[];
}

export interface GeneratedImage {
    base64: string;
    mimeType: string;
}

export interface ApiError {
    message: string;
    hint?: string;
}
