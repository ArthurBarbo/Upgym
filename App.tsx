import "react-native-gesture-handler";
import "./src/config/calendarLocale";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { BlackOpsOne_400Regular } from "@expo-google-fonts/black-ops-one";
import { Staatliches_400Regular } from "@expo-google-fonts/staatliches";

import { UserProvider } from "@/context/UserContext";
import AppNavigator from "./src/navigation";
import { colors } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    BlackOpsOne_400Regular,
    Staatliches_400Regular,
  });
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
