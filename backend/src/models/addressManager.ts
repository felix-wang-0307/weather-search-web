import { client } from "./mongoDbClient";

export class AddressManager {
   async getAddress(address: string): Promise<any> {
      const result = await client.database.collection("addresses").findOne({});
   }
}