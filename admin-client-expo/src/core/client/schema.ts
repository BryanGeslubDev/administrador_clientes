import { ObjectSchema } from "realm";

export class ClientSchema {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public age!: number;
  public address!: string;
  public sync!: boolean;

  public static schema: ObjectSchema = {
    name: "Clients",
    primaryKey: "id",
    properties: {
      id: "string",
      firstName: "string",
      lastName: "string",
      age: "int",
      address: "string",
      sync: "bool",
    },
  };

  public static generate({
    id,
    firstName,
    lastName,
    age,
    address,
    sync,
  }: ClientSchema) {
    return {
      id,
      firstName,
      lastName,
      age,
      address,
      sync,
    };
  }
}
