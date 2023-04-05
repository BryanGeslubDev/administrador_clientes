import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Button, Text } from "@rneui/themed";

import FormClient from "../../core/client/forms/formClient";
import { Table, Row, Rows } from "react-native-table-component";

import { useApi } from "../../core/client/hooks/useApi";
import { ShowClients } from "../../core/client/type";
import { useClientHook } from "../../core/client/hooks/useStorage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SessionStackParamList } from "../../navigations/sessionStack";
import { Overlay } from "../../ui/overlays";

type Props = NativeStackScreenProps<
  SessionStackParamList,
  "SortableTable",
  "SessionStack"
>;

const SortableTable = ({ navigation }: Props) => {
  const { clients } = useClientHook();
  const { deleteClient } = useApi();

  const [clientsFound, setClients] = useState(clients);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [form, setForm] = useState<ShowClients>();
  const [searchTerm, setSearchTerm] = useState("");

  const showEditClientModal = (form: ShowClients) => {
    setForm(form);
    setEditModal(true);
  };
  const showCreateClientModal = () => {
    setCreateModal(true);
  };
  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const filteredClients = clients.filter((client) => {
      const firstNameMatch = client.firstName
        .toLowerCase()
        .includes(text.toLowerCase());
      const lastNameMatch = client.lastName
        .toLowerCase()
        .includes(text.toLowerCase());
      const ageMatch = client.age.toString().includes(text);
      const addressMatch = client.address
        .toLowerCase()
        .includes(text.toLowerCase());
      return firstNameMatch || lastNameMatch || ageMatch || addressMatch;
    });
    setClients(filteredClients);
  };
  const syncData = () => {
    navigation.navigate("Sync");
  };

  useEffect(() => {
    setClients(clientsFound);
  }, [clientsFound]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => syncData()}
        style={{
          backgroundColor: "red",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          alignSelf: "flex-end",
          width: 90,
          height: 20,
          borderRadius: 30,
        }}
      >
        <Text style={{ alignSelf: "center", alignItems: "center" }}>
          Sincronizar
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Bienvenido</Text>
      <TextInput
        placeholder="Busqueda de clientes"
        value={searchTerm}
        onChangeText={handleSearch}
        style={{ borderWidth: 1, borderRadius: 10, minHeight: 40 }}
      />
      <View style={styles.searchContainer}>
        <Button
          style={styles.button}
          color="rgb(15, 120, 7)"
          title="Crear nuevo cliente"
          onPress={() => showCreateClientModal()}
        />
      </View>
      <View>
        <ScrollView horizontal={true}>
          <View style={styles.tableContainer}>
            <Table
              style={styles.table}
              borderStyle={{ borderWidth: 2, borderColor: "#000" }}
            >
              <Row
                data={["Nombre", "Apellido", "Edad", "Direcciones", "Acciones"]}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows
                data={clientsFound.map((person) => [
                  person.firstName,
                  person.lastName,
                  person.age,
                  person.address,
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      onPress={() => showEditClientModal(person)}
                    >
                      <Text style={styles.editButton}>Editar</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => deleteClient(person.id)}>
                      <Text style={styles.deleteButton}>Eliminar</Text>
                    </TouchableOpacity> */}
                  </View>,
                ])}
                textStyle={styles.text}
              />
            </Table>
          </View>
        </ScrollView>
      </View>

      <Overlay
        title="Editar cliente"
        width="90%"
        isVisible={editModal}
        onClose={() => setEditModal(false)}
      >
        <FormClient
          initialValues={form}
          onSubmit={() => {
            setEditModal(false);
          }}
        />
      </Overlay>
      <Overlay
        title="Crear cliente"
        width="90%"
        isVisible={createModal}
        onClose={() => setCreateModal(false)}
      >
        <FormClient
          onSubmit={() => {
            setCreateModal(false);
          }}
        />
      </Overlay>
    </View>
  );
};

export default SortableTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  tableContainer: {
    width: "100%",
    overflowX: "scroll",
    flex: 1,

    paddingTop: 30,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 15,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    marginLeft: 10,
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    color: "blue",
  },
  deleteButton: {
    color: "red",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
