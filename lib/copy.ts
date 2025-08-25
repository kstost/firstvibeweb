
export async function copyToClipboard(text: string): Promise<{ success: boolean; method: 'clipboard_api' | 'fallback' | 'none' }> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return { success: true, method: 'clipboard_api' };
    }
  } catch (err) {
    console.warn('Clipboard API failed, falling back.', err);
  }

  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Make the textarea out of sight
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  textArea.setAttribute('readonly', '');
  textArea.style.opacity = '0';

  document.body.appendChild(textArea);
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful) {
      return { success: true, method: 'fallback' };
    }
  } catch (err) {
    console.error('Fallback copy failed', err);
    document.body.removeChild(textArea);
  }

  return { success: false, method: 'none' };
}
