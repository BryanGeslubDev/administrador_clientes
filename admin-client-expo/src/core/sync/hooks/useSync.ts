import { useEffect, useState } from "react";
import allsettled from "promise.allsettled";
import { useClientHook } from "../../client/hooks/useStorage";
import { Alert } from "../../../ui/alert";
import { useApi } from "../../client/hooks/useApi";

export const useSync = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const { getAllClients, createClientApi } = useApi();
  const { createOrUpdateClient, getUnsyncedClients } = useClientHook();
  useEffect(() => {
    sync();
  }, []);

  const syncClients = async () => {
    const response = await getAllClients();
    const syncedResponse = response.map((obj: any) => ({
      ...obj,
      sync: true,
    }));
    createOrUpdateClient(syncedResponse);
  };

  const uploadClients = async () => {
    const data = await getUnsyncedClients();
    const mappedResponse: any = data.map((obj: any) => ({
      id: obj.id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      age: obj.age,
      address: obj.address,
    }));
    await createClientApi(mappedResponse);
  };

  const sync = async () => {
    try {
      const UPLOAD = [uploadClients()];
      await allsettled(UPLOAD);
      const SYNC = [syncClients()];
      const response = await allsettled(SYNC);
      const errors = response
        .map((res) => (res.status === "rejected" ? res.reason : null))
        .filter((res) => res !== null);

      if (errors.length > 0) {
        Alert("Error", String(errors));
        console.log("Error extendido", JSON.stringify(errors, null, 2));
      }

      setIsLoading(true);
      //si hay error poner sync como false
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
  };
};
