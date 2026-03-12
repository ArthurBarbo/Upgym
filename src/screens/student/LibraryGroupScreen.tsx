import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors, spacing, radius, typography } from "@/theme";
import type { RootStackParamList } from "@/navigation";
import {
  EXERCISES_BY_GROUP,
  type BodyGroupId,
} from "@/services/LibraryExercises";

type Props = NativeStackScreenProps<RootStackParamList, "LibraryGroup">;

export default function LibraryGroupScreen({ route, navigation }: Props) {
  const groupId = route.params.groupId as BodyGroupId;
  const groupLabel = route.params.groupLabel ?? "Exercícios";

  const exercises = useMemo(() => {
    return EXERCISES_BY_GROUP[groupId] ?? [];
  }, [groupId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{groupLabel}</Text>
      <Text style={styles.subtitle}>Escolha um exercício</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
          {exercises.map((e) => (
            <Pressable
              key={e.id}
              onPress={() => console.log("Abrir detalhe depois:", e.id)}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
              android_ripple={{ color: "rgba(255,255,255,0.08)" }}
            >
              <Text style={styles.name}>{e.name}</Text>
              <Text style={styles.meta}>
                {e.equipment} • {e.level}
              </Text>
            </Pressable>
          ))}

          {exercises.length === 0 ? (
            <Text style={styles.emptyText}>
              Sem exercícios para este grupo.
            </Text>
          ) : null}
        </View>

        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
        >
          <Text style={styles.backTxt}>Voltar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    ...typography.AlternativeLarge,
    color: colors.accentplus,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  name: {
    ...typography.Alternative,
    color: colors.text,
    fontSize: 18,
  },
  meta: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  backBtn: {
    marginTop: spacing.lg,
    height: 48,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  backTxt: { ...typography.body, color: colors.text, fontWeight: "900" },
  pressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
});
