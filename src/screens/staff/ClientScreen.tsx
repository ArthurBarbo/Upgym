import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { colors, spacing, radius, typography } from "../../theme";

type StaffUser = { role: "staff"; name: string; email: string };

const MOCK_CHECKINS = [
  { id: "c1", name: "Arthur", time: "18:12" },
  { id: "c2", name: "Marina", time: "18:25" },
];

const MOCK_CHECKOUT = [
  { id: "d1", name: "José", time: "15:00" },
  { id: "d2", name: "Eduardo", time: "10:00" },
  { id: "d3", name: "Joana", time: "12:00" },
];

const MOCK_BLOCKED = [
  { id: "b1", name: "Carlos", reason: "Mensalidade em aberto" },
];

const MOCK_REQUESTS = [
  {
    id: "r1",
    student: "Arthur",
    date: "2026-03-31",
    hour: "19:00",
    status: "PENDING",
  },
  {
    id: "r2",
    student: "Marina",
    date: "2026-04-01",
    hour: "18:00",
    status: "PENDING",
  },
];

export default function ClientScreen() {
  const route = useRoute<any>();
  const staff = (route?.params?.user as StaffUser | undefined) ?? {
    role: "staff",
    name: "Professor",
    email: "staff@upgym.com",
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Painel do Professor</Text>
      <Text style={styles.subtitle}>Logado como {staff.name}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Check-ins de hoje</Text>
        <Text style={styles.cardText}>Quem está na academia agora.</Text>

        <View style={{ height: spacing.md }} />

        {MOCK_CHECKINS.map((c) => (
          <View key={c.id} style={styles.row}>
            <Text style={styles.rowMain}>{c.name}</Text>
            <Text style={styles.rowMuted}>{c.time}</Text>
          </View>
        ))}

        <View style={{ height: spacing.md }} />
        <Pressable style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>Ver lista completa</Text>
        </Pressable>
      </View>

      {/* BLOQUEADOS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Usuários bloqueados</Text>
        <Text style={styles.cardText}>Alunos impedidos de treinar.</Text>

        <View style={{ height: spacing.md }} />

        {MOCK_BLOCKED.map((b) => (
          <View key={b.id} style={styles.rowCol}>
            <Text style={styles.rowMain}>{b.name}</Text>
            <Text style={styles.rowMuted}>{b.reason}</Text>
          </View>
        ))}

        <View style={{ height: spacing.md }} />
        <Pressable style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>Gerenciar bloqueios</Text>
        </Pressable>
      </View>

      {/* SOLICITAÇÕES */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Solicitações de marcação</Text>
        <Text style={styles.cardText}>Pedidos aguardando aprovação.</Text>

        <View style={{ height: spacing.md }} />

        {MOCK_REQUESTS.map((r) => (
          <View key={r.id} style={styles.rowCol}>
            <Text style={styles.rowMain}>
              {r.student} • {r.date} {r.hour}
            </Text>
            <Text style={styles.rowMuted}>Status: {r.status}</Text>
          </View>
        ))}

        <View style={{ height: spacing.md }} />
        <View style={styles.btnRow}>
          <Pressable style={styles.btnOutline} onPress={() => {}}>
            <Text style={styles.btnOutlineText}>Rejeitar</Text>
          </Pressable>

          <Pressable style={styles.btn} onPress={() => {}}>
            <Text style={styles.btnText}>Aprovar</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingTop: spacing.xxl },

  title: {
    ...typography.AlternativeLarge,
    color: colors.accentplus,
    fontSize: 40,
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
  cardTitle: { ...typography.Alternative, color: colors.text, fontSize: 28 },
  cardText: {
    ...typography.body,
    color: colors.textMuted,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  rowCol: { paddingVertical: 6 },
  rowMain: { color: colors.text, fontWeight: "900" },
  rowMuted: { color: colors.textMuted, fontWeight: "700", marginTop: 2 },

  btn: {
    height: 46,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.accentDark,
  },
  btnText: { color: colors.text, fontWeight: "900" },

  btnRow: { flexDirection: "row", gap: spacing.md },
  btnOutline: {
    flex: 1,
    height: 46,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnOutlineText: { color: colors.text, fontWeight: "900" },
});
