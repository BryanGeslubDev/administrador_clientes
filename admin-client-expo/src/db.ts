import { Realm, createRealmContext } from "@realm/react";
import { ClientSchema } from "./core/client/schema";

const config: Realm.Configuration = {
  schema: [ClientSchema.schema],
};

export const RealmContext = createRealmContext(config);
