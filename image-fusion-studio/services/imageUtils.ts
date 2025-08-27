/**
 * Converts a File object to a base64 encoded string, without the data URL prefix.
 * @param file The file to convert.
 * @returns A promise that resolves with the base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // The result is in the format "data:image/jpeg;base64,LzlqLz...".
      // We only need the part after the comma.
      const base64 = result.split(',')[1];
      if (base64) {
        resolve(base64);
      } else {
        reject(new Error('Failed to extract base64 from data URL.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
