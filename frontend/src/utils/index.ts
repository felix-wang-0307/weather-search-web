import { v4 as uuidv4 } from 'uuid';
import states from '../data/states.json';

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

export function convertDate(ISODate: string): string {
  const date = new Date(ISODate);
  // Transfer the ISODate to "Wednesday, 1 Jan 2020" format
  const localeString = date.toLocaleDateString("en-US", {weekday: "long", day: "2-digit", month: "short", year: "numeric"});
  // Remove the 2nd comma between the Month and Year
  const secondCommaIndex = localeString.indexOf(",", localeString.indexOf(",") + 1);
  return localeString.slice(0, secondCommaIndex) + localeString.slice(secondCommaIndex + 1);
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

export const stateToAbbreviation = (stateName: string): string => {
  return states[stateName] || '';
}

export const abbreviationToState = (stateAbbreviation: string): string => {
  return Object.keys(states).find(key => states[key] === stateAbbreviation) || '';
}