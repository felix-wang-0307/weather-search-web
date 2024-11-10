import { v4 as uuidv4 } from 'uuid';

function toUrlParams(params: Record<string, any>): string {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export function appendParams(url: string, params: Record<string, any>): string {
  return url + (url.includes('?') ? '&' : '?') + toUrlParams(params);
}

export function parseJsonSafely(json: string): any {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export const getUserId = () => {
  let userId = localStorage.getItem('userId');
  // If no user ID is found, generate a new one and store it
  if (!userId) {
    userId = uuidv4();  // Generate a unique identifier
    localStorage.setItem('userId', userId);
  }
  return userId;
};
