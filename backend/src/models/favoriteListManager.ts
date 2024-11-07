import { client } from './mongoDbClient'
import { Collection } from 'mongodb';

interface IFavoriteList {
  userId: string;
  cities: { city: string, state: string }[];
}

export class FavoriteListManager {
  collection: Collection<IFavoriteList>;

  constructor() {
    this.collection = client.database.collection<IFavoriteList>('favoriteList');
  }

  async getFavoriteList(userId: string): Promise<IFavoriteList | null> {
    const favoriteList = await this.collection.findOne({ userId });
    return favoriteList;
  }

  async addFavorite(userId: string, city: string, state: string): Promise<void> {
    const favoriteList = await this.getFavoriteList(userId);
    if (!favoriteList) {
      await this.collection.insertOne({ userId, cities: [{ city, state }] });
    } else {
      await this.collection.updateOne({ userId }, { $push: { cities: { city, state } } });
    }
  }

  async deleteFavorite(userId: string, city: string, state: string): Promise<void> {
    await this.collection.updateOne({ userId }, { $pull: { cities: { city, state } } });
  }
}
