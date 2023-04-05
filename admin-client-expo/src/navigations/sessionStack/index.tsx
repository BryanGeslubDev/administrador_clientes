import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SortableTable from "../../screens/client/table";

import { Sync } from "../../screens/sync";
import { View } from "react-native";

export type SessionStackParamList = {
  SortableTable: undefined;
  Home: undefined;
  RecoveryPassword: undefined;
  TaskScreen: undefined;
  Sync: undefined;
  Root: undefined;
};

const Stack = createNativeStackNavigator<SessionStackParamList>();

export default function SessionStack() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator
        initialRouteName="SortableTable"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SortableTable" component={SortableTable} />
        <Stack.Screen name="Sync" component={Sync} />
      </Stack.Navigator>
    </View>
  );
}
