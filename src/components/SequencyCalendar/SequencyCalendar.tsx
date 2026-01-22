import React, { useMemo, useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { colors, radius, spacing, typography } from "../../theme";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CalendarToggleModal({ open, onClose }: Props) {
  const [selectedDates, setSelectedDates] = useState<Record<string, boolean>>(
    {}
  );

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};

    Object.keys(selectedDates).forEach((date) => {
      marks[date] = {
        selected: true,
        selectedColor: colors.accent,
        selectedTextColor: "#0B0B0B",
      };
    });

    return marks;
  }, [selectedDates]);

  function toggleDate(dayString: string) {
    setSelectedDates((prev) => {
      const next = { ...prev };
      if (next[dayString]) delete next[dayString];
      else next[dayString] = true;
      return next;
    });
  }

  const totalSelecionados = Object.keys(selectedDates).length;

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
            <Text style={styles.title}>Escolha os dias</Text>

            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeTxt}>✕</Text>
            </Pressable>
          </View>

          <Calendar
            onDayPress={(day) => toggleDate(day.dateString)}
            markedDates={markedDates}
            theme={{
              calendarBackground: colors.surfaceSoft,
              monthTextColor: colors.text,
              dayTextColor: colors.text,
              textDisabledColor: "rgba(255,255,255,0.25)",
              todayTextColor: colors.accent,
              arrowColor: colors.accent,
            }}
          />

          <View style={styles.footer}>
            <Text style={styles.counter}>Sequência: {totalSelecionados}</Text>

            <Pressable style={styles.primaryBtn} onPress={onClose}>
              <Text style={styles.primaryTxt}>Confirmar</Text>
            </Pressable>
          </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    ...typography.Alternative,
    color: colors.text,
    fontWeight: "700",
    fontSize: 20,
  },
  closeBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  closeTxt: { color: colors.text, fontSize: 16 },
  footer: {
    marginTop: spacing.md,
    gap: spacing.md,
  },
  counter: {
    ...typography.Alternative,
    color: colors.textMuted,
  },
  primaryBtn: {
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryTxt: {
    ...typography.Alternative,
    color: colors.text,
    fontWeight: "800",
    fontSize: 20,
  },
});
