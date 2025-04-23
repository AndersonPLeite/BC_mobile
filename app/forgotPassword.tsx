import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { TextInput, Button } from "react-native-paper";
import { ScrollView } from "react-native";


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Campo obrigatório"),
});

export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string }) => {
    try {
     await sendPasswordResetEmail(auth, data.email);
     // Removed incorrect call to sendPasswordResetEmail
     alert("Um link de redefinição de senha foi enviado para o seu e-mail.");
    } catch (error) {
        console.error(error);
        if(error.code === 'auth/user-not-found') {
            alert("Usuário não encontrado.");
        }  else {
            alert("Erro ao enviar o e-mail. Tente novamente.");
        }
    }
}

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Esqueci Minha Senha</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              placeholder="Digite seu email"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          Enviar
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#102237",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#20b30d",
    color: "#fff",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});