import { FavoriteListManager } from "../models/favoriteListManager";
import { IController } from "./types";

const favoriteListManager = new FavoriteListManager();

export const getFavorites: IController = async (req, res) => {
  const { user } = req.query as { user: string };
  const favorites = await favoriteListManager.getFavoriteList(user);
  res.json({ success: true, data: favorites });
}

export const addFavorite: IController = async (req, res) => {
  const { user, city, state } = req.body as { user: string, city: string, state: string };
  await favoriteListManager.addFavorite(user, city, state);
  res.json({ success: true });
}

export const deleteFavorite: IController = async (req, res) => {
  const { user, city, state } = req.body as { user: string, city: string, state: string };
  await favoriteListManager.deleteFavorite(user, city, state);
  res.json({ success: true });
}