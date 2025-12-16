export const STORAGE_KEY_MODEL_CONFIG = 'ai_hub_model_config';
export const STORAGE_KEY_CHAT_HISTORY = 'seekcompass_chat_history';

export const getGoogleAiKey = (): string => {
  // 1. Try Environment Variable (Vite replaced)
  if (process.env.GEMINI_API_KEY) {
      return process.env.GEMINI_API_KEY;
  }
  if (process.env.API_KEY) {
      return process.env.API_KEY;
  }

  // 2. Try Local Storage (User BYOK)
  try {
    const saved = localStorage.getItem(STORAGE_KEY_MODEL_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKeys && parsed.apiKeys.google) {
        return parsed.apiKeys.google;
      }
    }
  } catch (e) {
    console.error('Failed to read AI config from local storage', e);
  }

  return '';
};