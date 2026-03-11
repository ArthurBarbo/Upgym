import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors, spacing, radius, typography } from "@/theme";
import type { RootStackParamList } from "@/navigation";
import { BODY_GROUPS } from "@/services/LibraryExercises";

type Props = NativeStackScreenProps<RootStackParamList, "Library">;

const SCREEN_BG = require("../../../assets/Library/background.jpg");

export default function LibraryScreen({ navigation }: Props) {
  return (
    <ImageBackground source={SCREEN_BG} style={styles.bg} resizeMode="cover">
      {/* overlay pra manter contraste */}
      <View style={styles.bgOverlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Biblioteca</Text>
          <Text style={styles.subtitle}>Escolha a divisão do corpo</Text>

          <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
            <View style={styles.grid}>
              {BODY_GROUPS.map((g) => (
                <Pressable
                  key={g.id}
                  onPress={() =>
                    navigation.navigate("LibraryGroup", {
                      groupId: g.id,
                      groupLabel: g.label,
                    })
                  }
                  style={({ pressed }) => [
                    styles.tile,
                    pressed && styles.pressed,
                  ]}
                  android_ripple={{ color: "rgba(255,255,255,0.08)" }}
                >
                  <Text style={styles.tileTitle}>{g.label}</Text>
                  <Text style={styles.tileSub}>Ver exercícios</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // fundo da tela
  bg: {
    flex: 1,
    backgroundColor: colors.background, // fallback caso a imagem falhe
  },

  // overlay escuro em cima do background
  bgOverlay: {
    flex: 1,
  },

  container: {
    flex: 1,
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

  grid: {
    marginTop: spacing.lg,
    rowGap: spacing.md,
  },

  tile: {
    width: "100%",
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accentDark,
    padding: spacing.lg,
  },

  tileTitle: {
    ...typography.Alternative,
    color: colors.text,
    fontSize: 23,
  },

  tileSub: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },

  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
});
