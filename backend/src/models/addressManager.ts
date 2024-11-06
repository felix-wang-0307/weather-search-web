import { client } from "./mongoDbClient";

export class AddressManager {
  /**
   * find one address 
   * @param address 
   */
  async getAddress(address: string): Promise<any> {
    const result = await client.database.collection("addresses").findOne({});
  }
}