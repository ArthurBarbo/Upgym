import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, radius, typography } from "../../theme";
import type { AppDrawerParamList } from "@/navigation/AppDrawer";
import { DrawerScreenProps } from "@react-navigation/drawer";

type Props = DrawerScreenProps<AppDrawerParamList, "Student">;

export default function StudentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const status = "Ativo";
  const userName = route?.params?.user?.name ?? "aluno";
  const initial = (userName?.[0] ?? "A").toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={styles.iconBtn}
        >
          <Ionicons name="menu" size={26} color={colors.text} />
        </Pressable>

        <View style={styles.headerCenter}>
          <Text style={styles.headerHello}>Olá, {userName}</Text>
          <Text style={styles.headerSub}>Bem-vindo de volta</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
      </View>

      {/* Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Status da matrícula</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{status}</Text>
          </View>
        </View>

        <Text style={styles.statusHint}>
          Tudo certo por aqui. Seu acesso está liberado para check-in.
        </Text>
      </View>

      {/* Atalhos */}
      <Text style={styles.sectionTitle}>Acesso rápido</Text>

      <View style={styles.grid}>
        <Pressable style={styles.tile} onPress={() => {}}>
          <Ionicons name="qr-code-outline" size={24} color={colors.accent} />
          <Text style={styles.tileTitle}>Check-in</Text>
          <Text style={styles.tileDesc}>Exibir QR</Text>
        </Pressable>

        <Pressable
          style={styles.tile}
          onPress={() => navigation.navigate("Trainings")}
        >
          <Ionicons name="barbell-outline" size={24} color={colors.accent} />
          <Text style={styles.tileTitle}>Treinos</Text>
          <Text style={styles.tileDesc}>Ver rotina</Text>
        </Pressable>

        <Pressable
          style={styles.tile}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={24} color={colors.accent} />
          <Text style={styles.tileTitle}>Perfil</Text>
          <Text style={styles.tileDesc}>Dados</Text>
        </Pressable>

        <Pressable
          style={styles.tile}
          onPress={() => navigation.navigate("Client")}
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={24}
            color={colors.accent}
          />
          <Text style={styles.tileTitle}>Staff</Text>
          <Text style={styles.tileDesc}>Área restrita</Text>
        </Pressable>
      </View>

      {/* Card extra (mock) */}
      <View style={styles.nextCard}>
        <Text style={styles.nextTitle}>Próximo treino</Text>
        <Text style={styles.nextSub}>
          Hoje, 18:00 • Treino A (Peito/Tríceps)
        </Text>

        <View style={{ height: spacing.md }} />

        <Pressable
          style={styles.nextBtn}
          onPress={() => navigation.navigate("Trainings")}
        >
          <Text style={styles.nextBtnText}>Ver detalhes</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.text} />
        </Pressable>
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  iconBtn: {
    padding: spacing.sm,
    borderRadius: radius.md,
  },
  headerCenter: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  headerHello: {
    ...typography.Logintitle,
    color: colors.text,
    fontSize: 18,
  },
  headerSub: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.text,
    fontWeight: "800",
  },

  statusCard: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLabel: {
    ...typography.body,
    color: colors.textMuted,
    fontWeight: "600",
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: 12,
  },
  statusHint: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },

  sectionTitle: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    fontSize: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  tile: {
    width: "48%",
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tileTitle: {
    color: colors.text,
    fontWeight: "800",
    marginTop: spacing.sm,
  },
  tileDesc: {
    color: colors.textMuted,
    marginTop: 2,
  },

  nextCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nextTitle: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 16,
  },
  nextSub: {
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  nextBtnText: {
    color: colors.text,
    fontWeight: "700",
  },
});
