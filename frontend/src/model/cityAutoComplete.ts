import { ICityInfo } from "@/types";

const BACKEND = "https://weather-search-web-571.wn.r.appspot.com/";

export async function getAutoCompleteList(input: string): Promise<ICityInfo[]> {
  try {
    const response = await fetch(`${BACKEND}autocomplete?input=${input}`, {
      mode: 'cors'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}