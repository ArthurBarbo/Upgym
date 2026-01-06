import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { colors, spacing, radius, typography } from "../theme";
import { Button } from "../components/Button";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.brand}>UPGYM</Text>
        <Text style={styles.tagline}>Your wellness place</Text>
        <Text style={styles.subtitle}>Entre para continuar</Text>
        <View style={styles.accentLine} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Insira seu E-mail"
          placeholderTextColor={colors.gray}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <Text style={[styles.label, { marginTop: spacing.md }]}>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Insira sua senha"
          placeholderTextColor={colors.gray}
          secureTextEntry
          style={styles.input}
        />

        <View style={{ height: spacing.lg }} />

        <Button title="Entrar" onPress={() => {}} />

        <Pressable onPress={() => {}} style={styles.forgot}>
          <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: "center",
  },
  top: {
    marginBottom: spacing.xl,
  },
  brand: {
    ...typography.title,
    color: colors.primary,
    letterSpacing: 2,
  },
  subtitle: {
    ...typography.body,
    color: colors.gray,
    marginTop: spacing.sm,
  },
  accentLine: {
    marginTop: spacing.md,
    height: 4,
    width: 56,
    backgroundColor: colors.accent,
    borderRadius: 999,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  label: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  input: {
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: spacing.md,
    color: colors.primary,
    backgroundColor: "#FFFFFF",
  },
  forgot: {
    marginTop: spacing.md,
    alignSelf: "flex-end",
  },
  forgotText: {
    ...typography.body,
    color: colors.gray,
    fontWeight: "600",
  },
  signup: {
    marginTop: spacing.lg,
    alignItems: "center",
  },
  signupText: {
    ...typography.body,
    color: colors.gray,
  },
  signupAccent: {
    color: colors.accent,
    fontWeight: "700",
  },
});
