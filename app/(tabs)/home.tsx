import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={require("../../assets/images/logo.png")}
				style={styles.image}
			/>
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
	image: {
		width: 320,
		height: 200,
		alignSelf: "center",
		borderRadius: 50,
	}
});
