import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "../../theme";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@/context/UserContext";

export default function RestrictedScreen() {
  const navigation = useNavigation<any>();
  const { user, logout } = useUser();
  const userName = user?.name ?? "aluno";

  function handleBack() {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.greeting}>
          Olá, {userName}
        </Text>

        <Text style={styles.title}>Acesso restrito</Text>

        <Text style={styles.text}>
          Consta algo de errado. Compareça à recepção da academia para
          regularizar sua situação.
        </Text>

        <View style={{ height: spacing.lg }} />
        <Button title="Voltar" onPress={handleBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  greeting: {
    ...typography.AlternativeLarge,
    color: colors.accentplus,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.Logintitle,
    color: colors.text,
    fontSize: 20,
  },
  text: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
    lineHeight: 22,
  },
});
