import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  Easing,
} from "react-native";

import { colors, spacing, radius, typography } from "../../theme";
import React, { useEffect, useMemo, useRef, useState } from "react";

type MenuItem = { label: string; onPress: () => void };

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  items: MenuItem[];
  onLogout?: () => void;
  titleStyle?: any;
};

export function SideMenu({
  visible,
  onClose,
  title = "Menu",
  subtitle,
  items,
  onLogout,
  titleStyle,
}: Props) {
  const screenH = Dimensions.get("window").height;

  const menuH = useMemo(() => {
    const base = 210;
    const extra = items.length * 54;
    return Math.min(base + extra, Math.floor(screenH * 0.78));
  }, [items.length, screenH]);

  const [shouldRender, setShouldRender] = useState(visible);

  const overlay = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);

      overlay.setValue(0);
      slide.setValue(-menuH);

      Animated.parallel([
        Animated.timing(overlay, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slide, {
          toValue: 0,
          duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    Animated.parallel([
      Animated.timing(overlay, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: -menuH,
        duration: 260,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) setShouldRender(false);
    });
  }, [visible, menuH, overlay, slide]);

  if (!shouldRender) return null;

  return (
    <View style={styles.root} pointerEvents="box-none">
      <Pressable
        onPress={onClose}
        style={StyleSheet.absoluteFill}
        pointerEvents="auto"
      >
        <Animated.View style={[styles.overlay, { opacity: overlay }]} />
      </Pressable>

      <Animated.View
        style={[
          styles.panel,
          {
            height: menuH,
            transform: [{ translateY: slide }],
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>

          <Pressable onPress={onClose} hitSlop={12} style={styles.xBtn}>
            <Text style={styles.xText}>✕</Text>
          </Pressable>
        </View>

        <View style={styles.list}>
          {items.map((item) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.item,
                pressed && styles.itemPressed,
              ]}
              onPress={() => {
                onClose();
                item.onPress();
              }}
              android_ripple={{ color: "rgba(255,255,255,0.08)" }}
            >
              <Text style={styles.itemText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={() => {
            onClose();
            if (onLogout) onLogout();
            else console.log("TEMPLATE: logout");
          }}
          style={({ pressed }) => [
            styles.logoutBtn,
            pressed && styles.itemPressed,
          ]}
          android_ripple={{ color: "rgba(0,0,0,0.15)" }}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    justifyContent: "flex-start",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },

  panel: {
    width: "100%",
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerText: { flex: 1 },

  title: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 18,
  },

  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  xBtn: {
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },

  xText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 16,
  },

  list: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },

  item: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },

  itemPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  itemText: {
    color: colors.text,
    fontWeight: "700",
  },

  logoutBtn: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.accentDark,
  },

  logoutText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 16,
  },
});
