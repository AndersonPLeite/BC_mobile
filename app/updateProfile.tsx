import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { updateProfile, updateEmail } from "firebase/auth";

export default function UpdateProfile() {
    const { userAuth } = useContext(AuthContext);
    const [nome, setNome] = useState(userAuth?.displayName || "");
    const [email, setEmail] = useState(userAuth?.email || "");
    const [loading, setLoading] = useState(false);

    async function handleUpdateProfile() {
        setLoading(true);
        try {
            if (userAuth) {
                // Atualize o nome do usuário
                await updateProfile(userAuth, { displayName: nome });
                // Atualize o email do usuário
                await updateEmail(userAuth, email);
                alert("Perfil atualizado com sucesso!");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar o perfil.");
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
            <Text style={styles.title}>Atualizar Perfil</Text>
            <TextInput
                label="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <Button
                mode="contained"
                onPress={handleUpdateProfile}
                loading={loading}
                style={styles.button}
            >
                Atualizar
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