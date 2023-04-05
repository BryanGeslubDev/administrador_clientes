import { useState } from "react";

import { ScrollView, StyleSheet, View } from "react-native";

import { ClientFormProps } from "../type";
import { Input, Button } from "@rneui/themed";
import { useApi } from "../hooks/useApi";
import { useClientHook } from "../hooks/useStorage";
import { v4 as uuid } from "uuid";

const FormClient = ({ initialValues, onSubmit }: ClientFormProps) => {
  const { updateClient } = useApi();
  const { updateStorage, createClient } = useClientHook();
  const [form, setForm] = useState({
    id: initialValues?.id ?? uuid(),
    firstName: initialValues?.firstName ?? "",
    lastName: initialValues?.lastName ?? "",
    age: initialValues?.age ?? "",
    address: initialValues?.address ?? "",
    sync: initialValues?.sync ?? false,
  });

  const onSubmitHandler = async (data: any) => {
    initialValues ? await updateStorage(data) : createClient(data);
  };
  return (
    <View>
      <ScrollView>
        <Input
          placeholder="Ingresa Nombre"
          value={form.firstName}
          onChangeText={(e) => setForm({ ...form, firstName: e })}
        />

        <Input
          placeholder="Ingresa el apellido"
          value={form.lastName}
          onChangeText={(e) => setForm({ ...form, lastName: e })}
        />

        <Input
          placeholder="Ingresa la edad"
          value={String(form.age)}
          onChangeText={(e) => setForm({ ...form, age: e })}
        />

        <Input
          placeholder="Ingresa una dirección"
          value={form.address}
          onChangeText={(e) => setForm({ ...form, address: e })}
        />

        <Button
          title={initialValues ? "Actualizar" : "Crear"}
          onPress={() => {
            onSubmit(), onSubmitHandler(form);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default FormClient;

const styles = StyleSheet.create({
  formRegister: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  controls: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  buttonForm: {
    marginTop: 20,
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
  },
});
