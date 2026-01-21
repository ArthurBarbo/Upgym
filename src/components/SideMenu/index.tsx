import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";

import { colors, spacing, radius, typography } from "../../theme";
import { useEffect, useRef } from "react";

type MenuItem = { label: string; onPress: () => void };

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  items: MenuItem[];
};

export function SideMenu({
  visible,
  onClose,
  title = "Menu",
  subtitle,
  items,
}: Props) {
  const screenW = Dimensions.get("window").width;
  const menuW = Math.min(320, Math.floor(screenW * 0.82));

  const overlay = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(menuW)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(overlay, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(slide, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(overlay, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(slide, {
          toValue: menuW,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, menuW, overlay, slide]);

  if (!visible) return null;

  return (
    <View style={styles.root}>
      <Pressable onPress={onClose} style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.overlay, { opacity: overlay }]} />
      </Pressable>

      <Animated.View
        style={[
          styles.panel,
          { width: menuW, transform: [{ translateX: slide }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <View style={styles.list}>
          {items.map((item) => (
            <Pressable
              key={item.label}
              style={styles.item}
              onPress={() => {
                onClose();
                item.onPress();
              }}
            >
              <Text style={styles.itemText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>Fechar</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    flexDirection: "row",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  panel: {
    height: "100%",
    backgroundColor: colors.background,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    padding: spacing.lg,
  },
  header: {
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
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
  itemText: {
    color: colors.text,
    fontWeight: "700",
  },
  closeBtn: {
    marginTop: "auto",
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
  },
  closeText: {
    color: colors.text,
    fontWeight: "800",
  },
});
