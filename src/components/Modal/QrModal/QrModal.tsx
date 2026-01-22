import React from "react";
import { Modal, View, Text, Pressable, StyleSheet, Image } from "react-native";
import { colors, spacing, radius, typography } from "@/theme";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function QrModal({ open, onClose }: Props) {
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
            <Text style={styles.title}>Check-in (QR)</Text>

            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeTxt}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.subtitle}>Utilize no Leitor para Entrar</Text>

          <View style={styles.qrBox}>
            <Image
              source={require("../../../../assets/QRcode.jpeg")}
              style={styles.qrImage}
              resizeMode="contain"
            />
          </View>

          <Pressable style={styles.primaryBtn} onPress={onClose}>
            <Text style={styles.primaryTxt}>Fechar</Text>
          </Pressable>
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
    ...typography.Alternative,
    color: colors.text,
    fontSize: 23,
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
    fontWeight: "800",
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  qrBox: {
    height: 240,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  qrText: {
    ...typography.AlternativeLarge,
    color: colors.accent,
    fontSize: 42,
  },
  qrImage: {
    width: 200,
    height: 200,
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
    ...typography.Alternative,
    color: colors.text,
    fontSize: 23,
  },
});
