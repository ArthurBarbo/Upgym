import { createDrawerNavigator } from "@react-navigation/drawer";
import StudentScreen from "../screens/student/StudentScreen";
import ClientScreen from "../screens/staff/ClientScreen";
import TrainingScreen from "../screens/student/TrainingScreen";
import ProfileScreen from "../screens/student/ProfileScreen";
import { colors } from "../theme";

export type AppDrawerParamList = {
  Student: { user?: { name: string; email: string } };
  Trainings: undefined;
  Profile: undefined;
  Client: undefined;
};

const Drawer = createDrawerNavigator<AppDrawerParamList>();

export default function AppDrawer({ route }: any) {
  const user = route?.params?.user;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: colors.background },
        drawerActiveTintColor: colors.accent,
        drawerInactiveTintColor: colors.text,
        drawerContentStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="Student"
        component={StudentScreen}
        initialParams={{ user }}
        options={{ title: "Início" }}
      />

      {/* <Drawer.Screen
        name="Trainings"
        component={TrainingScreen}
        options={{ title: "Meus treinos" }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Meu perfil" }}
      /> */}

      <Drawer.Screen
        name="Client"
        component={ClientScreen}
        options={{ title: "Área do staff" }}
      />
    </Drawer.Navigator>
  );
}
