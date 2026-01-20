import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "../../theme";
import { Button } from "../../components/Button";
import { useRoute } from "@react-navigation/native";

const route = useRoute<any>();
const staffName = route?.params?.user?.name ?? "staff";

export default function ClientScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel da Academia</Text>
      <Text style={styles.subtitle}>Gestão e acompanhamento do dia a dia</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Check-ins</Text>
        <Text style={styles.cardText}>
          Veja quem já fez check-in hoje e acompanhe o movimento.
        </Text>
        <View style={{ height: spacing.md }} />
        <Button title="Ver check-ins de hoje" onPress={() => {}} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Alunos</Text>
        <Text style={styles.cardText}>
          Acesse informações, situação cadastral e ações rápidas.
        </Text>
        <View style={{ height: spacing.md }} />
        <Button title="Gerenciar alunos" onPress={() => {}} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Acessos</Text>
        <Text style={styles.cardText}>
          Controle de permissões e bloqueios (simulado).
        </Text>
        <View style={{ height: spacing.md }} />
        <Button title="Abrir controle de acessos" onPress={() => {}} />
      </View>
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
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    ...typography.title,
    color: colors.text,
    fontSize: 16,
  },
  cardText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
});
