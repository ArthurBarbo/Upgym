import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { colors, spacing, radius, typography } from "../../theme";
import { Button } from "../../components/Button";
import { Dumbbell } from "../../components/Dumbbell";
import { useNavigation } from "@react-navigation/native";

const MockUser = {
  name: "Arthur",
  email: "aluno@upgym.com",
  password: "123456",
};

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const normalizedEmail = email.trim().toLowerCase();

    const ok =
      normalizedEmail === MockUser.email && password === MockUser.password;

    if (!ok) {
      alert("E-mail ou senha inválidos");
      return;
    }

    navigation.replace("App", { user: MockUser });
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.brandRow}>
          <Text style={styles.brand}>UPGYM</Text>
          <Dumbbell size={44} style={styles.dumbbellIcon} />
        </View>

        <Text style={styles.tagline}>Your wellness place</Text>
        <Text style={styles.subline}>Entre para continuar</Text>
        <View style={styles.accentLine} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Insira seu E-mail"
          placeholderTextColor={colors.placeholder}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <Text style={[styles.label, { marginTop: spacing.md }]}>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Insira sua senha"
          placeholderTextColor={colors.placeholder}
          secureTextEntry
          style={styles.input}
        />

        <View style={{ height: spacing.lg }} />

        <Button title="Entrar" onPress={handleLogin} />

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
  tagline: {
    ...typography.body,
    color: colors.text,
    opacity: 0.85,
    marginTop: spacing.xs,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontSize: 20,
  },
  top: {
    marginBottom: spacing.xl,
    alignItems: "flex-start",
  },
  subline: {
    ...typography.title,
    marginTop: spacing.md,
    fontSize: 15,
    color: colors.accent,
    alignItems: "flex-start",
  },
  brand: {
    ...typography.Logintitle,
    color: colors.accent,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  accentLine: {
    marginTop: spacing.sm,
    height: 4,
    width: 100,
    backgroundColor: colors.accent,
    borderRadius: 999,
  },
  form: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    ...typography.body,
    color: colors.text,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  input: {
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  forgot: {
    marginTop: spacing.md,
    alignSelf: "flex-start",
    width: "100%",
  },
  forgotText: {
    ...typography.body,
    color: colors.textMuted,
    fontWeight: "600",
    textAlign: "left",
  },
  signup: {
    marginTop: spacing.lg,
    alignItems: "center",
  },
  signupText: {
    ...typography.body,
    color: colors.textMuted,
  },
  signupAccent: {
    color: colors.accent,
    fontWeight: "700",
  },
  dumbbellIcon: { transform: [{ scale: 2.8 }], marginTop: 6 },
});
