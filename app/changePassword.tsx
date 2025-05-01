import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { AuthContext } from "../context/AuthProvider";
import { updatePassword } from "firebase/auth";

export default function ChangePassword() {
    const { userAuth } = useContext(AuthContext); // Obtem o usuário autenticado
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleChangePassword() {
        if (!newPassword) {
            alert("Por favor, insira a nova senha.");
            return;
        }

        setLoading(true);
        try {
            if (userAuth) {
                // Atualiza a senha do usuário
                await updatePassword(userAuth, newPassword);
                alert("Senha alterada com sucesso!");
            } else {
                alert("Usuário não autenticado.");
            }
        } catch (error: any) {
            console.error(error);
            if (error.code === "auth/requires-recent-login") {
                alert("Por favor, faça login novamente para alterar sua senha.");
            } else {
                alert("Erro ao alterar a senha.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require("../assets/images/logo.png")}
                style={{
                    width: 320,
                    height: 200,
                    alignSelf: "center",
                    borderRadius: 50,
                    marginTop: 20,
                }}
            />
            <Text style={styles.title}>Alterar Senha</Text>
            <TextInput
                label="Nova Senha"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button
                mode="contained"
                onPress={handleChangePassword}
                loading={loading}
                style={styles.button}
            >
                Alterar Senha
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#102237",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#20b30d",
    },
});