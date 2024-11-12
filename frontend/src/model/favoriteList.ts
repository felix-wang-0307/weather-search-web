import { ICityInfo } from "@/types";
import { getUserId } from "@/utils";

const BACKEND = "https://weather-search-web-571.wn.r.appspot.com/";

export async function getFavorites(): Promise<ICityInfo[]> {
  const userId = getUserId();
  const url = `${BACKEND}favorites?user=${userId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

export async function addFavorite({ city, state }: ICityInfo): Promise<boolean> {
  const userId = getUserId();
  const url = `${BACKEND}favorite`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: userId, city, state }),
  });
  return response.ok;
}

export async function deleteFavorite({ city, state }: ICityInfo): Promise<boolean> {
  const userId = getUserId();
  const url = `${BACKEND}favorite`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: userId, city, state }),
  });
  return response.ok;
}