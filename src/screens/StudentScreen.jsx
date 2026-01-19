import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "../theme";
import { Button } from "../components/Button";

export default function StudentScreen() {
  const status = "Ativo"; // depois você troca por estado real/simulado

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, aluno 👋</Text>
      <Text style={styles.subtitle}>
        Aqui você acompanha sua rotina na academia
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status da matrícula</Text>
        <Text style={styles.statusValue}>{status}</Text>
      </View>

      <View style={{ height: spacing.lg }} />

      <Button title="Exibir meu QR de check-in" onPress={() => {}} />
      <View style={{ height: spacing.md }} />
      <Button title="Ver meus treinos" onPress={() => {}} />
      <View style={{ height: spacing.md }} />
      <Button title="Meu perfil" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.Logintitle,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  statusCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusLabel: {
    ...typography.body,
    color: colors.textMuted,
    fontWeight: "600",
  },
  statusValue: {
    ...typography.title,
    color: colors.accent,
    marginTop: spacing.sm,
    fontSize: 18,
  },
});
