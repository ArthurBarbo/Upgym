import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";

import { TRAINERS } from "../../services/Trainers";
import { colors, spacing, radius, typography } from "@/theme";
import { createBookingRequest } from "@/services/bookingRequests";

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function buildSlots() {
  return [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "19:00",
    "20:00",
  ];
}

// mock de indisponíveis por personal + data
const MOCK_BLOCKED: Record<string, Record<string, string[]>> = {
  staff_personal_01: {
    // "2026-01-22": ["10:00", "18:00"],
  },
  staff_personal_02: {},
  staff_personal_03: {},
};

export default function MarkingsScreen({ navigation, route }: any) {
  const userName = route?.params?.user?.name ?? "aluno";

  const [trainerSelected, setTrainerSelected] = useState<any>(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    toISODate(new Date())
  );
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const allSlots = useMemo(() => buildSlots(), []);

  const availableSlots = useMemo(() => {
    if (!trainerSelected) return [];
    const blocked = MOCK_BLOCKED[trainerSelected.id]?.[selectedDate] ?? [];
    return allSlots.filter((h) => !blocked.includes(h));
  }, [trainerSelected, selectedDate, allSlots]);

  function onPickTrainer(t: any) {
    if (t.status === "SOLD_OUT") return;
    setTrainerSelected(t);
    setSelectedHour(null);
    setCalendarOpen(true);
  }

  function confirmBooking() {
    if (!trainerSelected || !selectedHour) return;

    const req = createBookingRequest({
      studentName: userName,
      trainerId: trainerSelected.id,
      date: selectedDate,
      hour: selectedHour,
    });

    console.log("SOLICITAÇÃO CRIADA:", req);
    navigation.goBack();
  }

  const markedDates = useMemo(() => {
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: colors.accent,
        selectedTextColor: "#0B0B0B",
      },
    };
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marcações</Text>
      <Text style={styles.subtitle}>Escolha um personal para agendar</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <View style={styles.list}>
          {TRAINERS.map((t) => {
            const soldOut = t.status === "SOLD_OUT";

            return (
              <Pressable
                key={t.id}
                disabled={soldOut}
                onPress={() => onPickTrainer(t)}
                style={({ pressed }) => [
                  styles.trainerCard,
                  soldOut && styles.trainerCardDisabled,
                  pressed && !soldOut && styles.pressed,
                ]}
                android_ripple={{ color: "rgba(255,255,255,0.08)" }}
              >
                <View style={styles.trainerTopRow}>
                  <Text style={styles.trainerName}>{t.name}</Text>

                  <View
                    style={[
                      styles.badge,
                      soldOut ? styles.badgeOff : styles.badgeOn,
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {soldOut ? "Esgotado" : "Disponível"}
                    </Text>
                  </View>
                </View>

                <Text style={styles.trainerSpec}>{t.specialty}</Text>

                <Text
                  style={[styles.trainerCTA, soldOut && styles.trainerCTAOff]}
                >
                  {soldOut ? "Sem horários" : "Ver calendário"}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {!!trainerSelected && (
          <View style={styles.selectionBox}>
            <View style={styles.selectionRow}>
              <Text style={styles.selectionLabel}>Personal:</Text>
              <Text style={styles.selectionValue}>{trainerSelected.name}</Text>
            </View>

            <View style={styles.selectionRow}>
              <Text style={styles.selectionLabel}>Data:</Text>
              <Pressable
                onPress={() => setCalendarOpen(true)}
                style={({ pressed }) => [
                  styles.dateBtn,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.dateBtnText}>{selectedDate}</Text>
              </Pressable>
            </View>

            <Text style={styles.hoursTitle}>Horários disponíveis</Text>

            <View style={styles.hoursGrid}>
              {availableSlots.length === 0 ? (
                <Text style={styles.emptyText}>
                  Sem horários disponíveis para esse dia.
                </Text>
              ) : (
                availableSlots.map((h) => {
                  const active = selectedHour === h;
                  return (
                    <Pressable
                      key={h}
                      onPress={() => setSelectedHour(h)}
                      style={({ pressed }) => [
                        styles.hourChip,
                        active && styles.hourChipActive,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.hourChipText,
                          active && styles.hourChipTextActive,
                        ]}
                      >
                        {h}
                      </Text>
                    </Pressable>
                  );
                })
              )}
            </View>

            <Pressable
              onPress={confirmBooking}
              disabled={!selectedHour}
              style={({ pressed }) => [
                styles.confirmBtn,
                !selectedHour && styles.confirmBtnDisabled,
                pressed && selectedHour && styles.pressed,
              ]}
            >
              <Text style={styles.confirmBtnText}>Confirmar marcação</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={calendarOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setCalendarOpen(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Registre sua Marcação</Text>

              <Pressable
                onPress={() => setCalendarOpen(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeTxt}>✕</Text>
              </Pressable>
            </View>

            <Calendar
              onDayPress={(d) => setSelectedDate(d.dateString)}
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

            <Pressable
              style={styles.primaryBtn}
              onPress={() => setCalendarOpen(false)}
            >
              <Text style={styles.primaryTxt}>Confirmar dia</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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

  list: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },

  trainerCard: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accentDark,
    padding: spacing.lg,
  },

  trainerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  trainerName: {
    ...typography.Alternative,
    color: colors.text,
    fontSize: 18,
  },

  trainerSpec: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  trainerCTA: {
    ...typography.body,
    color: colors.accent,
    marginTop: spacing.md,
    fontWeight: "800",
  },

  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },

  badgeOn: {
    borderColor: colors.accent,
    backgroundColor: "rgba(255,45,45,0.18)",
  },

  badgeOff: {
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  badgeText: {
    ...typography.body,
    color: colors.text,
    fontWeight: "800",
    fontSize: 12,
  },

  trainerCardDisabled: {
    opacity: 0.45,
  },

  trainerCTAOff: {
    color: colors.textMuted,
  },

  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  selectionBox: {
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },

  selectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  selectionLabel: {
    ...typography.body,
    color: colors.textMuted,
    fontWeight: "700",
  },

  selectionValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: "800",
  },

  dateBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.accentDark,
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  dateBtnText: {
    ...typography.body,
    color: colors.text,
    fontWeight: "800",
  },

  hoursTitle: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontWeight: "900",
  },

  hoursGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },

  hourChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  hourChipActive: {
    borderColor: colors.accent,
    backgroundColor: "rgba(255,45,45,0.18)",
  },

  hourChipText: {
    ...typography.body,
    color: colors.text,
    fontWeight: "800",
  },

  hourChipTextActive: {
    color: colors.accentplus,
  },

  confirmBtn: {
    marginTop: spacing.lg,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  confirmBtnDisabled: {
    opacity: 0.45,
  },

  confirmBtnText: {
    ...typography.Alternative,
    color: colors.text,
    fontSize: 21,
  },

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

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  modalTitle: {
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
    fontWeight: "900",
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
