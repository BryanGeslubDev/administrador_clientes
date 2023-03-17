import React, { useState, useEffect } from "react";
import { View, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Input, Button, Text } from "@rneui/themed";

import { deleteClient } from "../api/api";
import { ShowClients } from "../interfaces/api";
import FormClient from "../components/formClient";
import { styles } from "./styles";
import { Table, Row, Rows } from "react-native-table-component";

const compareData = (a: string, b: string) => {
  return a.toLowerCase().indexOf(b.toString().toLowerCase()) >= 0;
};

const SortableTable = ({ data }: { data: ShowClients[] }) => {
  const [clients, setClients] = useState(data);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [form, setForm] = useState<ShowClients>();

  const showEditClientModal = (form: ShowClients) => {
    setForm(form);
    setEditModal(true);
  };
  const showCreateClientModal = () => {
    setCreateModal(true);
  };
  const filtClientsByInput = (value: string) => {
    if (value) {
      const findClient = data.filter((client) => {
        const findName = compareData(client.firstName, value);
        const findLastName = compareData(client.lastName, value);
        const findAge = compareData(client.age, value);
        const findAddress = compareData(client.address, value);
        return findName || findLastName || findAge || findAddress;
      });
      setClients(findClient);
    } else {
      setClients(data);
    }
  };

  useEffect(() => {
    setClients(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Bienvenido</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Input
          placeholder="Ingresa tu busqueda"
          onChangeText={(e) => filtClientsByInput(e)}
        />
        <Button
          color="rgb(15, 120, 7)"
          title="Crear nuevo cliente"
          onPress={() => showCreateClientModal()}
        />
      </View>

      <Table borderStyle={{ borderWidth: 1, borderColor: "black" }}>
        <Row
          data={["ID", "Nombre", "Apellido", "Edad", "Direcciones", "Acciones"]}
          style={styles.headerRow}
          textStyle={styles.headerCell}
        />
        <Rows
          data={clients.map((person: ShowClients) => [
            person.id,
            person.firstName,
            person.lastName,
            person.age,
            person.address,
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => showEditClientModal(person)}
                style={{
                  backgroundColor: "rgb(24, 140, 249)",
                  borderRadius: 5,
                  padding: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: "#000", fontSize: 16 }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteClient(person.id)}
                style={{
                  backgroundColor: "rgb(252, 37, 37)",
                  borderRadius: 5,
                  padding: 10,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Eliminar</Text>
              </TouchableOpacity>
            </View>,
          ])}
          style={styles.dataRow}
          textStyle={styles.dataCell}
        />
      </Table>

      <Modal
        animationType="slide"
        transparent={false}
        visible={editModal}
        onRequestClose={() => setEditModal(!editModal)}
      >
        {" "}
        <FormClient initialValues={form} />{" "}
        <Button onPress={() => setEditModal(!editModal)} title="Cerrar" />
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={createModal}
        onRequestClose={() => setCreateModal(!createModal)}
      >
        {" "}
        <FormClient />{" "}
        <Button onPress={() => setCreateModal(!createModal)} title="Cerrar" />
      </Modal>
    </View>
  );
};

export default SortableTable;
