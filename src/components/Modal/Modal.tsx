import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { colors, typography, spacing, radius } from "@/theme";

type ModalBaseProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  primaryText?: string;
  onPrimaryPress?: () => void;
};

export function ModalBase({
  open,
  title = "Título",
  onClose,
  children,
  primaryText,
  onPrimaryPress,
}: ModalBaseProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>

            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeTxt}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.body}>{children}</View>

          {primaryText ? (
            <Pressable
              style={styles.primaryBtn}
              onPress={onPrimaryPress ?? onClose}
            >
              <Text style={styles.primaryTxt}>{primaryText}</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: spacing.lg,
  },
  sheet: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accentDark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  title: {
    ...typography.body,
    color: colors.text,
    fontWeight: "700",
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  closeTxt: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  body: {
    gap: spacing.md,
  },
  primaryBtn: {
    marginTop: spacing.lg,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryTxt: {
    ...typography.body,
    color: "#0B0B0B",
    fontWeight: "800",
  },
});
