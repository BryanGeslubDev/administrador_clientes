import { useState } from "react";
import { createClient, updateClient } from "../api/api";
import { View } from "react-native";

import { ClientFormProps } from "../interfaces/form";
import { styles } from "./styles.form";
import { Input, Button, Text } from "@rneui/themed";

const FormClient = ({ initialValues }: ClientFormProps) => {
  const [form, setForm] = useState({
    firstName: initialValues?.firstName ?? "",
    lastName: initialValues?.lastName ?? "",
    age: initialValues?.age ?? "",
    address: initialValues?.address ?? "",
  });

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();

    if (initialValues) {
      updateClient(initialValues.id, form);
    } else {
      createClient(form);
    }
  };
  return (
    <View style={styles.formRegister}>
      <Text style={styles.text}>Formulario de Registro</Text>
      <Input
        style={styles.controls}
        placeholder="Ingresa Nombre"
        value={form.firstName}
        onChangeText={(e) => setForm({ ...form, firstName: e })}
      />

      <Input
        style={styles.controls}
        placeholder="Ingresa el apellido"
        value={form.lastName}
        onChangeText={(e) => setForm({ ...form, lastName: e })}
      />

      <Input
        style={styles.controls}
        placeholder="Ingresa la edad"
        value={form.age}
        onChangeText={(e) => setForm({ ...form, age: e })}
      />

      <Input
        style={styles.controls}
        placeholder="Ingresa una dirección"
        value={form.address}
        onChangeText={(e) => setForm({ ...form, address: e })}
      />

      <Button
        style={styles.buttonForm}
        title={initialValues ? "Actualizar" : "Crear"}
        onPress={onSubmitHandler}
      />
    </View>
  );
};

export default FormClient;
