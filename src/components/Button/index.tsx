import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "../../theme";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.accentDark,
  },
  text: {
    ...typography.body,
    color: colors.text,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
