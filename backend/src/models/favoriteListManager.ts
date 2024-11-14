import { client } from './mongoDbClient'
import { Collection, UpdateResult, InsertOneResult } from 'mongodb';

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

  async addFavorite(userId: string, city: string, state: string): Promise<boolean> {
    const favoriteList = await this.getFavoriteList(userId);
    let result: InsertOneResult<IFavoriteList> | UpdateResult;
    if (!favoriteList) {
      result = await this.collection.insertOne({ userId, cities: [{ city, state }] });
      return result.acknowledged;
    } else {
      result = await this.collection.updateOne({ userId }, { $push: { cities: { city, state } } });
      return result.modifiedCount > 0;
    }
  }

  async deleteFavorite(userId: string, city: string, state: string): Promise<boolean> {
    const result = await this.collection.updateOne({ userId }, { $pull: { cities: { city, state } } });
    return result.modifiedCount > 0;
  }
}
