import { ThemeProvider } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { RealmContext } from "./src/db";
import SessionStack from "./src/navigations/sessionStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import theme from "./src/utils/theme";

export default function App() {
  const { RealmProvider } = RealmContext;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <RealmProvider>
          <NavigationContainer>
            <SessionStack />
          </NavigationContainer>
        </RealmProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
