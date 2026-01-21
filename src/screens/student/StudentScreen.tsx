import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { colors, spacing, radius, typography } from "../../theme";
import { SideMenu } from "../../components/SideMenu";

export default function StudentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const userName = route?.params?.user?.name ?? "aluno";

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setMenuOpen(true)} style={styles.hamburger}>
        <Text style={styles.hamburgerText}>☰</Text>
      </Pressable>

      <Text style={styles.title}>Olá, {userName} 👋</Text>
      <Text style={styles.subtitle}>
        Aqui você acompanha sua rotina na academia
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status da matrícula</Text>
        <Text style={styles.statusValue}>Ativo</Text>
      </View>

      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="UPGYM"
        subtitle={`Logado como ${userName}`}
        items={[
          {
            label: "Check-in (QR)",
            onPress: () => console.log("abrir modal qr depois"),
          },
          {
            label: "Meus treinos",
            onPress: () => navigation.navigate("Trainings"),
          },
          {
            label: "Meu perfil",
            onPress: () => navigation.navigate("Profile"),
          },
          {
            label: "Área do staff",
            onPress: () => navigation.navigate("Client"),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  hamburger: {
    alignSelf: "flex-start",
    padding: spacing.sm,
    borderRadius: radius.md,
  },
  hamburgerText: { color: colors.text, fontSize: 22, fontWeight: "900" },
  title: {
    ...typography.Logintitle,
    color: colors.text,
    marginTop: spacing.md,
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
