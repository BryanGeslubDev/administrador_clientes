import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text } from "@rneui/themed";

import { SessionStackParamList } from "../../navigations/sessionStack";

import { useSync } from "../../core/sync/hooks/useSync";

type Props = NativeStackScreenProps<
  SessionStackParamList,
  "Sync",
  "SessionStack"
>;

export function Sync({ navigation }: Props) {
  const { isLoading, error } = useSync();

  useEffect(() => {
    if (!isLoading) navigation.replace("SortableTable");
  }, [isLoading]);

  if (error) {
    return console.log("Error", error);
  }

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.containerStatus}>
        <ActivityIndicator size="large" color="#999999" />
        <Text style={styles.status}>Sincronizando...</Text>
      </View>
      <Button title="Cancelar" onPress={handleCancel} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  containerStatus: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    fontSize: 14,
    marginTop: 20,
  },
});
