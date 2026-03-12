import { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    Alert,
    ScrollView,
} from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";

import { colors, spacing, radius, typography } from "../../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation, route }: Props) {
    const user = route.params?.user;

    // ✅ fallback só quando NÃO tiver user
    if (!user) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackTitle}>Perfil indisponível</Text>
                <Text style={styles.fallbackText}>
                    Abra o perfil a partir da área do aluno.
                </Text>

                <Pressable onPress={() => navigation.goBack()} style={styles.secondaryBtn}>
                    <Text style={styles.secondaryText}>Voltar</Text>
                </Pressable>
            </View>
        );
    }

    // ✅ hooks dentro do componente
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user.name);

    const mensalidade = 89.9;
    const ultimoPagamento = "05/03/2026";
    const proximoVencimento = "05/04/2026";
    const status = "Ativo";

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const mensalidadeBRL = useMemo(() => {
        return mensalidade.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }, [mensalidade]);

    function handleSaveName() {
        if (!name.trim()) {
            Alert.alert("Atenção", "Digite um nome válido.");
            return;
        }
        setEditing(false);
        Alert.alert("Pronto", "Nome atualizado.");
    }

    function handleChangePassword() {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert("Atenção", "Preencha todos os campos.");
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert("Atenção", "A nova senha precisa ter pelo menos 6 caracteres.");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Atenção", "As senhas não conferem.");
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        Alert.alert("Feito", "Senha alterada");
    }

    // ✅ return principal dentro do componente
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backText}>{"<"}</Text>
                </Pressable>

                <Text style={styles.headerTitle}>Perfil</Text>

                <Pressable
                    onPress={() => (editing ? handleSaveName() : setEditing(true))}
                    style={styles.actionBtn}
                >
                    <Text style={styles.actionText}>{editing ? "Salvar" : "Editar"}</Text>
                </Pressable>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Dados do aluno</Text>

                <Text style={styles.label}>Nome</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    editable={editing}
                    style={[styles.input, !editing && styles.inputDisabled]}
                    placeholder="Seu nome"
                    placeholderTextColor={colors.placeholder}
                />

                <Text style={[styles.label, { marginTop: spacing.md }]}>E-mail</Text>

                {/* Email cinza e não clicável */}
                <TextInput
                    value={user.email}
                    editable={false}
                    selectTextOnFocus={false}
                    style={[styles.input, styles.emailDisabled]}
                />

                <View style={styles.divider} />

                <View style={styles.rowBetween}>
                    <Text style={styles.metaLabel}>Status</Text>
                    <Text style={styles.metaStatus}>{status}</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Mensalidade e pagamentos</Text>

                <View style={styles.rowBetween}>
                    <Text style={styles.metaLabel}>Valor mensal</Text>
                    <Text style={styles.metaValue}>{mensalidadeBRL}</Text>
                </View>

                <View style={[styles.rowBetween, { marginTop: spacing.sm }]}>
                    <Text style={styles.metaLabel}>Último pagamento</Text>
                    <Text style={styles.metaValue}>{ultimoPagamento}</Text>
                </View>

                <View style={[styles.rowBetween, { marginTop: spacing.sm }]}>
                    <Text style={styles.metaLabel}>Próximo vencimento</Text>
                    <Text style={styles.metaValue}>{proximoVencimento}</Text>
                </View>

                <Pressable
                    onPress={() => Alert.alert("Em breve", "Checkout/PIX")}
                    style={styles.primaryBtn}
                >
                    <Text style={styles.primaryText}>Pagar agora</Text>
                </Pressable>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Trocar senha</Text>

                <Text style={styles.label}>Senha atual</Text>
                <TextInput
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry
                    style={styles.input}
                    placeholder="Digite sua senha atual"
                    placeholderTextColor={colors.placeholder}
                />

                <Text style={[styles.label, { marginTop: spacing.md }]}>Nova senha</Text>
                <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    style={styles.input}
                    placeholder="Digite sua nova senha"
                    placeholderTextColor={colors.placeholder}
                />

                <Text style={[styles.label, { marginTop: spacing.md }]}>
                    Confirmar nova senha
                </Text>
                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    style={styles.input}
                    placeholder="Confirme a nova senha"
                    placeholderTextColor={colors.placeholder}
                />

                <Pressable onPress={handleChangePassword} style={styles.secondaryBtn}>
                    <Text style={styles.secondaryText}>Atualizar senha</Text>
                </Pressable>
            </View>

            <View style={{ height: spacing.xl }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.lg },

    fallbackContainer: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
        justifyContent: "center",
    },
    fallbackTitle: {
        ...typography.title,
        color: colors.text,
        marginBottom: spacing.sm,
    },
    fallbackText: {
        ...typography.body,
        color: colors.textMuted,
        marginBottom: spacing.lg,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.lg,
        marginTop: spacing.xl,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: radius.md,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surfaceSoft,
        borderWidth: 1,
        borderColor: colors.border,
    },
    backText: { color: colors.text, fontSize: 18, fontWeight: "900" },
    headerTitle: {
        ...typography.AlternativeLarge,
        color: colors.accent,
        fontSize: 35,
    },
    actionBtn: {
        height: 44,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surfaceSoft,
        borderWidth: 1,
        borderColor: colors.accent,
    },
    actionText: { color: colors.text, fontWeight: "900" },

    card: {
        backgroundColor: colors.surfaceSoft,
        borderRadius: radius.lg,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.lg,
    },
    cardTitle: {
        ...typography.title,
        color: colors.text,
        fontSize: 16,
        marginBottom: spacing.md,
    },

    label: {
        ...typography.body,
        color: colors.textMuted,
        fontWeight: "700",
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
    inputDisabled: { opacity: 0.8 },

    emailDisabled: {
        backgroundColor: colors.surfaceSoft,
        color: colors.textMuted,
        opacity: 0.95,
    },

    divider: {
        marginTop: spacing.lg,
        marginBottom: spacing.md,
        height: 1,
        backgroundColor: colors.border,
        opacity: 0.7,
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    metaLabel: { color: colors.textMuted, fontWeight: "800" },
    metaValue: { color: colors.text, fontWeight: "900" },
    metaStatus: { color: colors.green, fontWeight: "900" },

    primaryBtn: {
        marginTop: spacing.lg,
        height: 52,
        borderRadius: radius.lg,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.accent,
    },
    primaryText: { color: colors.text, fontWeight: "900" },

    secondaryBtn: {
        marginTop: spacing.lg,
        height: 52,
        borderRadius: radius.lg,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surfaceSoft,
        borderWidth: 1,
        borderColor: colors.accent,
    },
    secondaryText: { color: colors.text, fontWeight: "900" },
});