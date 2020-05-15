import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import * as Network from 'expo-network'
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	AsyncStorage,
	Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { MonoText } from "../components/StyledText";
import Header from "../components/Header";

export default function Form(props) {
	const saveData = async () => {
		await AsyncStorage.setItem("foo", "bar");
		const result = await AsyncStorage.getItem("foo");
		const networkStatus = await Network.getNetworkStateAsync();
		if (networkStatus.isConnected) {
			Alert.alert("Esta conectado");
		} else {
			Alert.alert("No esta conectado");
		}

	};
	return (
		<View style={styles.container}>
			<Header {...props} />
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				<View>
					<Text style={styles.title}>Norma ISO 14001</Text>
					<Text style={styles.subtitle}>
						Disposición de residuos (Incluir en la descripcion de
						activiades):
					</Text>

					<Text style={styles.label}>Peligrosos:</Text>
					<TextInput style={styles.inputs} placeholder="Kg" />

					<Text style={styles.label}>Orgánicos</Text>
					<TextInput style={styles.inputs} placeholder="Kg" />

					<Text style={styles.label}>Plásticos</Text>
					<TextInput style={styles.inputs} placeholder="Kg" />

					<Text style={styles.label}>Otros</Text>
					<TextInput style={styles.inputs} placeholder="Kg" />

					<Text style={styles.label}>
						Describa el impacto ambiental de las activiades
						realizadas
					</Text>
					<TextInput
						style={[styles.inputs, styles.inputArea]}
						multiline={true}
						placeholder="Description"
					/>

					<View style={styles.padreButtom}>
						<TouchableOpacity
							style={styles.buttomPequeno}
							onPress={() => saveData()}
						>
							<Text style={styles.textButton}>Guardar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

Form.navigationOptions = {
	name: "Form",
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	contentContainer: {
		paddingTop: 30,
		paddingHorizontal: 35,
		paddingBottom:130,
	},
	title: {
		fontSize: 25,
		textAlign: "center",
	},
	subtitle: {
		color: "rgba(0,0,0,0.6)",
	},
	inputs: {
		borderRadius: 15,
		borderColor: "rgba(0,0,0,0.3)",
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	inputArea: {
		minHeight: 140,
	},
	label: {
		color: "rgba(0,0,0,0.6)",
		paddingLeft: 10,
		marginTop: 15,
		marginBottom: 5,
	},
	padreButtom: {
		alignItems: "flex-end",
	},
	buttomPequeno: {
		backgroundColor: "#b7c62f",
		borderRadius: 20,
		padding: 10,
		width: 150,
		marginVertical: 10,
	},
	textButton: {
		color: "white",
		textAlign: "center",
	},
	
});
