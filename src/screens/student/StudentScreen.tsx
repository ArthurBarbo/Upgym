import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors, spacing, radius, typography } from "../../theme";
import { SideMenu } from "../../components/SideMenu";
import { Dumbbell, BookOpen, Flame, CalendarDays } from "lucide-react-native";
import { CalendarToggleModal } from "@/components/SequencyCalendar/SequencyCalendar";
import { QrModal } from "@/components/Modal/QrModal/QrModal";

export default function StudentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const userName = route?.params?.user?.name ?? "aluno";

  const [menuOpen, setMenuOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

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
            <Dumbbell size={22} color={colors.accent} />
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
            <BookOpen size={22} color={colors.accent} />
            <Text style={styles.panelTileText}>Biblioteca</Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.panelTile,
            pressed && styles.panelTilePressed,
          ]}
          onPress={() => setCalendarOpen(true)}
          accessibilityRole="button"
          hitSlop={10}
          android_ripple={{ color: "rgba(255,255,255,0.08)" }}
        >
          <View style={styles.panelTileRow}>
            <Flame size={22} color={colors.accent} />
            <Text style={styles.panelTileText}>Sequência</Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.panelTile,
            pressed && styles.panelTilePressed,
          ]}
          onPress={() =>
            navigation.navigate("Markings", { user: route?.params?.user })
          }
          accessibilityRole="button"
          hitSlop={10}
          android_ripple={{ color: "rgba(255,255,255,0.08)" }}
        >
          <View style={styles.panelTileRow}>
            <CalendarDays size={22} color={colors.accent} />
            <Text style={styles.panelTileText}>Marcações</Text>
          </View>
        </Pressable>
      </View>

      <CalendarToggleModal
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />

      <QrModal open={qrOpen} onClose={() => setQrOpen(false)} />

      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="UPGYM"
        titleStyle={typography.SideMenuTitle}
        subtitle={`Logado como ${userName}`}
        items={[
          {
            label: "Check-in (QR)",
            onPress: () => setQrOpen(true),
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
            label: "Minhas Marcações",
            onPress: () => navigation.navigate("Markings"),
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.xxl,
  },
  hamburger: {
    position: "absolute",
    top: spacing.lg + 20,
    left: spacing.lg - 10,
    zIndex: 20,
    padding: spacing.sm,
    borderRadius: radius.md,
  },
  hamburgerText: {
    color: colors.accent,
    fontSize: 50,
    fontWeight: "900",
  },
  title: {
    ...typography.AlternativeLarge,
    color: colors.text,
    fontSize: 34,
  },
  titleUser: {
    ...typography.AlternativeLarge,
    color: colors.accentplus,
    marginTop: spacing.xxl,
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

  panelGrid: {
    marginTop: spacing.lg,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.md,
  },

  panelTile: {
    width: "48%",
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.accentDark,
  },

  panelTilePressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },

  panelTileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: spacing.sm,
  },

  panelTileText: {
    ...typography.Alternative,
    color: colors.text,
    fontSize: 19,
  },

  panelTileIcon: {
    transform: [{ scale: 0.95 }],
  },
});
