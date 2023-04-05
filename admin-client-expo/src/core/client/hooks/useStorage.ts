import { UpdateMode } from "realm";
import { RealmContext } from "../../../db";
import { ClientSchema } from "../schema";
import { ShowClients } from "../type";

const { useRealm, useQuery } = RealmContext;

export const useClientHook = () => {
  const db = useRealm();
  const clients = useQuery<ClientSchema>(ClientSchema.schema.name);

  const allClients = (): ClientSchema[] => {
    return clients.map((client) => client);
  };

  const createOrUpdateClient = async (clients: ClientSchema[]) => {
    for (const client of clients) {
      console.log(client);
      db.write(() => {
        db.create(
          ClientSchema.schema.name,
          ClientSchema.generate(client),
          UpdateMode.Modified
        );
      });
    }
  };
  const createClient = (client: ClientSchema) => {
    try {
      db.write(() => {
        db.create(ClientSchema.schema.name, ClientSchema.generate(client));
      });
    } catch (error) {
      throw error;
    }
  };

  const getUnsyncedClients = async () => {
    const unsyncedClients = db
      .objects<ClientSchema>(ClientSchema.schema.name)
      .filtered("sync == false");

    return unsyncedClients;
  };

  const updateStorage = async (client: ShowClients) => {
    const exists = db.objectForPrimaryKey<ClientSchema>(
      ClientSchema.schema.name,
      client.id
    );
    if (exists) {
      db.write(() => {
        exists.firstName = client.firstName;
        exists.lastName = client.lastName;
        exists.age = Number(client.age);
        exists.address = client.address;
        exists.sync = false;
      });
    }
  };

  return {
    clients,
    allClients,
    createOrUpdateClient,
    createClient,
    getUnsyncedClients,
    updateStorage,
  };
};
