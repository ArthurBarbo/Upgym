import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FireIcon } from "@/components/FireIcon";
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

      <Text style={styles.titleUser}>Olá, {userName}</Text>
      <Text style={styles.subtitle}>
        Aqui você acompanha sua rotina na academia
      </Text>

      <View style={styles.registrationCard}>
        <View style={styles.registrationRow}>
          <Text style={styles.statusLabel}>Status da matrícula:</Text>
          <Text style={styles.registrationValue}>ATIVO</Text>
        </View>
      </View>

      {/* TEMPLATE: Grid do painel (2x2) */}
      <View style={styles.panelGrid}>
        <Pressable
          style={({ pressed }) => [
            styles.panelTile,
            pressed && styles.panelTilePressed,
          ]}
          onPress={() => navigation.navigate("TrainingScreen")}
          accessibilityRole="button"
          hitSlop={10}
          android_ripple={{ color: "rgba(255,255,255,0.08)" }}
        >
          <View style={styles.panelTileRow}>
            <FireIcon size={26} style={styles.panelTileIcon} />
            <Text style={styles.panelTileText}>Treinos</Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.panelTile,
            pressed && styles.panelTilePressed,
          ]}
          onPress={() => console.log("TEMPLATE: navegar para Exercícios")}
          accessibilityRole="button"
          hitSlop={10}
          android_ripple={{ color: "rgba(255,255,255,0.08)" }}
        >
          <View style={styles.panelTileRow}>
            <Text style={styles.panelTileEmoji}>🏋️</Text>
            <Text style={styles.panelTileText}>Exercícios</Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.panelTile,
            pressed && styles.panelTilePressed,
          ]}
          onPress={() => console.log("TEMPLATE: navegar para Medições")}
          accessibilityRole="button"
          hitSlop={10}
          android_ripple={{ color: "rgba(255,255,255,0.08)" }}
        >
          <View style={styles.panelTileRow}>
            <Text style={styles.panelTileEmoji}>📏</Text>
            <Text style={styles.panelTileText}>Marcações</Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.panelTile,
            pressed && styles.panelTilePressed,
          ]}
          onPress={() => console.log("TEMPLATE: navegar para Calendário")}
          accessibilityRole="button"
          hitSlop={10}
          android_ripple={{ color: "rgba(255,255,255,0.08)" }}
        >
          <View style={styles.panelTileRow}>
            <Text style={styles.panelTileEmoji}>📅</Text>
            <Text style={styles.panelTileText}>Calendário</Text>
          </View>
        </Pressable>
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
    alignSelf: "center",
    padding: spacing.xl,
    borderRadius: radius.md,
  },
  hamburgerText: { color: colors.text, fontSize: 40, fontWeight: "900" },

  title: {
    ...typography.AlternativeLarge,
    color: colors.text,
    marginTop: spacing.sm,
    fontSize: 34,
  },
  titleUser: {
    ...typography.AlternativeLarge,
    color: colors.accentplus,
    marginTop: spacing.xl,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  registrationCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
  },
  registrationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },

  registrationValue: {
    ...typography.Alternative,
    color: colors.accent,
    fontSize: 19,
    marginTop: 0,
  },

  statusLabel: {
    ...typography.body,
    color: colors.textMuted,
    fontWeight: "600",
  },

  // TEMPLATE: grid do painel
  panelGrid: {
    marginTop: spacing.lg,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.md,
  },

  // TEMPLATE: tile do painel
  panelTile: {
    width: "48%",
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.accentDark,
  },

  // TEMPLATE: feedback de clique
  panelTilePressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },

  // TEMPLATE: linha interna do tile
  panelTileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: spacing.sm,
  },

  // TEMPLATE: texto do tile
  panelTileText: {
    ...typography.body,
    color: colors.text,
    fontSize: 16,
  },

  // TEMPLATE: emoji (troca por ícone depois se quiser)
  panelTileEmoji: {
    fontSize: 20,
  },

  // TEMPLATE: ícone
  panelTileIcon: {
    transform: [{ scale: 0.95 }],
  },
});
