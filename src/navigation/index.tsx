import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import StudentScreen from "../screens/StudentScreen";
import ClientScreen from "../screens/ClientScreen";

export type RootStackParamList = {
  Login: undefined;
  Student: undefined;
  Client: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Student" component={StudentScreen} />
      <Stack.Screen name="Client" component={ClientScreen} />
    </Stack.Navigator>
  );
}
