import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import StudentScreen from "../screens/student/StudentScreen";
import TrainingsScreen from "../screens/student/TrainingScreen";
import ProfileScreen from "../screens/student/ProfileScreen";
import ClientScreen from "../screens/staff/ClientScreen";
import MarkingsScreen from "../screens/student/MarkingsScreen";

export type RootStackParamList = {
  Login: undefined;
  Student: { user: { name: string; email: string } };
  Trainings: undefined;
  Profile: undefined;
  Client: undefined;
  Markings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Student" component={StudentScreen} />
      <Stack.Screen name="Markings" component={MarkingsScreen} />
      {/* <Stack.Screen name="Trainings" component={TrainingsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      {/* <Stack.Screen name="Client" component={ClientScreen} /> */}
    </Stack.Navigator>
  );
}
