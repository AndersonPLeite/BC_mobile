import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
	return (
		<SafeAreaView style={styles.container}>
			<Image
				style={styles.image}
				source={require("../../assets/images/logo.jpeg")}
			/>
			<Text>Home</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#102237"
	},
	image: {
		width: 400,
		height: 203,
		alignSelf: "center",
		marginTop: 100,
	}
});
