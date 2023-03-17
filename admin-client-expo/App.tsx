import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SortableTable from "./src/pages/table";
import { useState, useEffect } from "react";
import { getAllClients } from "./src/api/api";

export default function App() {
  const [data, setData] = useState([]);

  const getClients = async () => {
    const response = await getAllClients();
    setData(response);
  };
  useEffect(() => {
    getClients();
  }, []);
  return (
    <>
      <SortableTable data={data} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
