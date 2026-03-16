import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import {
  Clock3,
  CalendarDays,
  Search,
  Check,
  TrendingUp,
} from "lucide-react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";

import { colors, spacing, radius, typography } from "../../theme";

import {
  EXERCISES_BY_GROUP,
  type Exercise as LibraryExercise,
  type BodyGroupId,
} from "../../services/LibraryExercises";

type Props = NativeStackScreenProps<RootStackParamList, "Trainings">;

type TrainingExercise = {
  exerciseId: LibraryExercise["id"];
  sets: number;
  reps: string;
};

type Training = {
  id: string;
  title: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  focus: string;
  durationMin: number;
  days: string;
  trainer: string;
  exercises: TrainingExercise[];
};

function getExerciseById(id: string): LibraryExercise | undefined {
  const groups = Object.keys(EXERCISES_BY_GROUP) as BodyGroupId[];
  for (const g of groups) {
    const found = EXERCISES_BY_GROUP[g].find((ex) => ex.id === id);
    if (found) return found;
  }
  return undefined;
}

const MOCK_TRAININGS: Training[] = [
  {
    id: "t0",
    title: "Mobilidade",
    level: "Iniciante",
    focus: "Corpo inteiro",
    durationMin: 10,
    days: "Todos os Dias",
    trainer: "Richard",
    exercises: [
      { exerciseId: "mobilidade-cervical-controlada", sets: 2, reps: "1m" },
      { exerciseId: "circulos-ombros-escapula", sets: 2, reps: "1m" },
    ],
  },
  {
    id: "t1",
    title: "Treino A",
    level: "Intermediário",
    focus: "Peito + Tríceps",
    durationMin: 55,
    days: "Seg/Qui",
    trainer: "Richard",
    exercises: [
      { exerciseId: "supino-reto", sets: 4, reps: "8-10" },
      { exerciseId: "crucifixo", sets: 3, reps: "10-12" },
      { exerciseId: "corda", sets: 3, reps: "10-12" },
    ],
  },
  {
    id: "t2",
    title: "Treino B",
    level: "Avançado",
    focus: "Costas + Bíceps + Cardio",
    durationMin: 60,
    days: "Ter/Sex",
    trainer: "Richard",
    exercises: [
      { exerciseId: "puxada-frente", sets: 4, reps: "10-12" },
      { exerciseId: "remada-baixa", sets: 3, reps: "10-12" },
      { exerciseId: "rosca-direta", sets: 3, reps: "10-12" },
      { exerciseId: "Cardio", sets: 1, reps: "40m" },
    ],
  },
  {
    id: "t3",
    title: "Treino C",
    level: "Avançado",
    focus: "Pernas + Ombro",
    durationMin: 50,
    days: "Qua/Sáb",
    trainer: "Richard",
    exercises: [
      { exerciseId: "Desenvolvimento", sets: 3, reps: "10-12" },
      { exerciseId: "Elevação Lateral", sets: 3, reps: "10-12" },
      { exerciseId: "Elevação Frontal", sets: 3, reps: "10-12" },
      { exerciseId: "Mesa flexora", sets: 3, reps: "10-15" },
      { exerciseId: "Agachamento com Halter", sets: 3, reps: "10-12" },
    ],
  },
];

export default function TrainingsScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");

  type SetKey = string;
  const [doneSets, setDoneSets] = useState<Record<SetKey, boolean>>({});

  function toggleSet(key: SetKey) {
    setDoneSets((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const totalSets = useMemo(() => {
    return MOCK_TRAININGS.reduce(
      (sumT, t) => sumT + t.exercises.reduce((sumE, ex) => sumE + ex.sets, 0),
      0
    );
  }, []);

  const completedSets = useMemo(() => {
    return Object.values(doneSets).filter(Boolean).length;
  }, [doneSets]);

  const progress = useMemo(() => {
    if (!totalSets) return 0;
    return completedSets / totalSets;
  }, [completedSets, totalSets]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_TRAININGS;
    return MOCK_TRAININGS.filter((t) =>
      `${t.title} ${t.focus} ${t.level} ${t.trainer}`.toLowerCase().includes(q)
    );
  }, [query]);

  function openTrainingDetails(t: Training) {
    const lines = t.exercises
      .map((te, idx) => {
        const ex = getExerciseById(te.exerciseId);
        const name = ex?.name ?? te.exerciseId;
        const equip = ex?.equipment ? ` (${ex.equipment})` : "";
        const howTo = (ex as any)?.howTo
          ? `\n   Como fazer: ${(ex as any).howTo}`
          : "";
        return `${idx + 1}. ${name}${equip} — ${te.sets}x ${te.reps}${howTo}`;
      })
      .join("\n\n");

    Alert.alert(
      `${t.title} (${t.level})`,
      `Personal: ${t.trainer}\n\nExercícios:\n${lines}`,
      [{ text: "Fechar" }]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Treinos</Text>

        <View style={{ width: 44 }} />
      </View>

      <View style={styles.searchWrap}>
        <View style={styles.searchRow}>
          <Search size={18} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar treino (ex: peito, pernas...)"
            placeholderTextColor={colors.placeholder}
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
        {filtered.map((t) => (
          <View key={t.id} style={styles.card}>
            <Pressable
              onPress={() => openTrainingDetails(t)}
              style={({ pressed }) => [
                styles.cardTopPress,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{t.title}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{t.level}</Text>
                </View>
              </View>

              <Text style={styles.cardSubtitle}>{t.focus}</Text>
              <Text style={styles.cardTrainer}>Personal: {t.trainer}</Text>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Clock3 size={16} color={colors.textMuted} />
                  <Text style={styles.metaText}>{t.durationMin} min</Text>
                </View>

                <View style={styles.metaItem}>
                  <CalendarDays size={16} color={colors.textMuted} />
                  <Text style={styles.metaText}>{t.days}</Text>
                </View>
              </View>
            </Pressable>

            <View style={styles.exerciseList}>
              {t.exercises.map((te) => {
                const ex = getExerciseById(te.exerciseId);
                const name = ex?.name ?? te.exerciseId;

                return (
                  <View
                    key={`${t.id}-${te.exerciseId}`}
                    style={styles.exerciseCard}
                  >
                    <View style={styles.exerciseTop}>
                      <Text style={styles.exerciseName}>{name}</Text>
                      <Text style={styles.exerciseReps}>
                        {te.sets}x {te.reps}
                      </Text>
                    </View>

                    <View style={styles.setRow}>
                      {Array.from({ length: te.sets }).map((_, idx) => {
                        const key = `${t.id}|${te.exerciseId}|${idx}`;
                        const checked = !!doneSets[key];

                        return (
                          <Pressable
                            key={key}
                            onPress={() => toggleSet(key)}
                            style={[
                              styles.checkbox,
                              checked && styles.checkboxChecked,
                            ]}
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked }}
                          >
                            {checked ? (
                              <Check size={16} color={colors.background} />
                            ) : null}
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nada encontrado</Text>
            <Text style={styles.emptyText}>
              Tenta buscar por “peito”, “pernas” ou “costas”.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressTop}>
          <View style={styles.progressTitleRow}>
            <TrendingUp size={18} color={colors.textMuted} />
            <Text style={styles.progressTitle}>Progresso da semana</Text>
          </View>
          <Text style={styles.progressNumbers}>
            {completedSets}/{totalSets}
          </Text>
        </View>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.round(progress * 100)}%` },
            ]}
          />
        </View>

        <Text style={styles.progressHint}>
          Marque suas séries para subir o progresso.
        </Text>
      </View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  backText: { color: colors.text, fontSize: 18, fontWeight: "900" },
  headerTitle: {
    ...typography.AlternativeLarge,
    color: colors.accent,
    fontSize: 30,
  },

  searchWrap: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  card: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  cardTopPress: {
    padding: spacing.lg,
  },

  cardPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    ...typography.title,
    color: colors.text,
    fontSize: 18,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  badgeText: { color: colors.accent, fontWeight: "900", fontSize: 12 },

  cardSubtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  cardTrainer: {
    marginTop: spacing.xs,
    color: colors.textMuted,
    fontWeight: "700",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  metaText: {
    color: colors.textMuted,
    fontWeight: "700",
  },

  exerciseList: {
    padding: spacing.lg,
    paddingTop: 0,
    gap: spacing.md,
  },
  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  exerciseTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  exerciseName: {
    color: colors.text,
    fontWeight: "900",
  },
  exerciseReps: {
    color: colors.textMuted,
    fontWeight: "800",
  },
  setRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  checkbox: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },

  progressCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  progressTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  progressTitle: {
    color: colors.text,
    fontWeight: "900",
  },
  progressNumbers: {
    color: colors.textMuted,
    fontWeight: "900",
  },
  progressBarBg: {
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.accent,
  },
  progressHint: {
    marginTop: spacing.md,
    color: colors.textMuted,
    fontWeight: "700",
  },

  empty: {
    padding: spacing.lg,
    alignItems: "center",
  },
  emptyTitle: {
    color: colors.text,
    fontWeight: "900",
    marginBottom: spacing.xs,
  },
  emptyText: { color: colors.textMuted, textAlign: "center" },
});
