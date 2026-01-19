import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "../theme";
import { Button } from "../components/Button";

export default function RestrictedScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Acesso restrito</Text>
        <Text style={styles.text}>
          Consulte imediatamente a recepção da academia para regularizar sua
          situação.
        </Text>

        <View style={{ height: spacing.lg }} />
        <Button title="Voltar" onPress={() => {}} />
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
