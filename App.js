import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";

import Login from "./screens/Login";
import Projects from "./screens/Projects";
import Standards from "./screens/Standards";
import SubStandards from "./screens/SubStandards";
import Form from "./screens/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Vehiculos from "./screens/Vehiculos";

const Stack = createStackNavigator();

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();

				// Load fonts
				await Font.loadAsync({
					...Ionicons.font,
					"space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hide();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				{/* {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />} */}
				<Header />
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerShown: false
						}}
					>
						<Stack.Screen name="Vehiculos" component={Vehiculos} />
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="Projects" component={Projects} />
						<Stack.Screen name="Standards" component={Standards} />
						<Stack.Screen
							name="SubStandards"
							component={SubStandards}
						/>
						<Stack.Screen
							name="Form"
							component={Form}
						/>
					</Stack.Navigator>
				</NavigationContainer>
				<Footer />
			</View>
		);
	}
	p;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
