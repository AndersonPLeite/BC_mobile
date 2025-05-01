// eslint-disable-next-line import/no-unresolved
import { AuthContext } from "../../context/AuthProvider";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Dialog, Divider, List, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Menu() {
	const theme = useTheme();
	const { sair } = useContext<any>(AuthContext);
	const [dialogVisivel, setDialogVisivel] = useState(false);

	async function handleSair() {
		if (await sair()) {
			router.replace("/signIn"); //Veja a branch modulo1_preload para ver como isso está funcionando
		} else {
			setDialogVisivel(true);
		}
	}

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: "#102237",}}
		>
			<Image
				source={require("../../assets/images/logo.png")}
				style={{
					width: 320,
					height: 200,
					alignSelf: "center",
					borderRadius: 50,
					marginTop: 20,
				}}
			/>
			
			<List.Item
				title="Perfil"
				style= {{ marginLeft: 30 }}
				titleStyle={{ color: "#fff" }}
				descriptionStyle={{ color: "#fff" }}
				description="Atualize seu perfil ou exclua sua conta"
				left={() => (
					<List.Icon color={"#fff"} icon="smart-card-outline" />
				)}
				onPress={() => router.push("../updateProfile")}
			/>
			<Divider />
			<List.Item
				style={{ marginRight: 110 }}
				title="Alterar Senha"
				titleStyle={{ color: "#fff" }}
				descriptionStyle={{ color: "#fff" }}
				description="Altere sua senha"
				left={() => <List.Icon color={"#fff"} icon="eye-arrow-right-outline" />}
				onPress={() => router.push("../changePassword")} // Navega para a tela de Alterar Senha
			/>
			<Divider />
			<List.Item
				title="Sair"
				style= {{ marginRight: 14 }}
				description="Finaliza sua sessão no aplicativo"
				titleStyle={{ color: "#fff" }}
				descriptionStyle={{ color: "#fff" }}
				left={() => <List.Icon color={"#fff"} icon="exit-run" />}
				onPress={handleSair}
				
			/>
			<Dialog
				visible={dialogVisivel}
				onDismiss={() => {
					setDialogVisivel(false);
				}}
			>
				<Dialog.Icon icon={"alert-circle-outline"} size={60} />
				<Dialog.Title style={styles.textDialog}>'Ops!'</Dialog.Title>
				<Dialog.Content>
					<Text style={styles.textDialog} variant="bodyLarge">
						{`Estamos com problemas para realizar essa operação.\nPor favor,
            contate o administrador.`}
					</Text>
				</Dialog.Content>
			</Dialog>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
	},
	textDialog: {
		textAlign: "center",
	},
});
