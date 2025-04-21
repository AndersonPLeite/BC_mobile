import { useContext, useEffect, useState } from "react";
// eslint-disable-next-line import/no-unresolved
// Corrected path to the module
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text, Image } from "react-native";
import { TextInput } from "react-native-paper";
import * as yup from "yup";
import { AuthContext } from "../context/AuthProvider";

export default function ForgotPassword() {
    const { signIn } = useContext<any>(AuthContext);
    const theme = useTheme();
    const router = useRouter();
    const [exibirSenha, setExibirSenha] = useState(true);
    const [logando, setLogando] = useState(false);
    const [dialogVisivel, setDialogVisivel] = useState(false);
    const [mensagemDialog, setMensagemDialog] = useState("");
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        defaultValues: {
            email: "",
            senha: "",
        },
        resolver: yupResolver(
            yup.object().shape({
                email: yup
                    .string()
                    .email("Email inválido")
                    .required("Campo obrigatório"),
                senha: yup.string().required("Campo obrigatório"),
            })
        ),
    });
    useEffect(() => {
        console.log("Renderizou");
    });
    type Credential = {
        email: string;
        senha: string;
    };
    
    async function entrar(credencial: Credential) {
        const response = await signIn({
            email: credencial.email,
            senha: credencial.senha,
        });
        if (response === "ok") {
            setLogando(false);
            router.replace("/(tabs)/home");
        } else {
            setMensagemDialog(response);
            setDialogVisivel(true);
            setLogando(false);
        }
    }
    return (
        <SafeAreaView
            style={{ ...styles.container, backgroundColor: theme.colors.background }}
        >
            <ScrollView>
                <>
                    <Text>
                        Email de recuperação
                    </Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            
                            <TextInput
                                style={styles.textinput}
                                placeholder="Digite seu email"
                                mode="outlined"
                                outlineColor={theme.colors.primary}
                                activeOutlineColor={theme.colors.primary}
                                theme={{
                                    colors: {
                                        primary: theme.colors.primary,
                                    },
                                }}
                                onBlur={onBlur}
                                onChangeText={(value) => {
                                    onChange(value);
                                }}
                            />
                        )}
                        name="email"
                        rules={{
                            required: "Campo obrigatório",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Email inválido",
                            },
                        }}
                        
                    />
                  
                    {errors.email && (
                        <Text style={{ color: "red", fontSize: 12 }}>
                            {errors.email?.message?.toString()}
                        </Text>
                    )}
                </>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#102237",
    },
 
    textinput: {
       marginTop: 20,
       width: "100%",
       backgroundColor: "#fff",
    alignItems: "center",
    },

    button: {
        width: 350,
        backgroundColor: "#102237",
        color: "#fff",
        borderRadius: 10,
        fontFamily: "SpaceMono",
        fontSize: 16,
        padding: 10,
    },
    textDialog: {
        textAlign: "center",
        fontFamily: "SpaceMono",
        fontSize: 16,
        color: "#000",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    divCadastro: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textCadastro: {
        fontFamily: "SpaceMono",
        fontSize: 16,
        color: "#000",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
});