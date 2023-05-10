import { StyleSheet, View, StatusBar } from "react-native";

// Styles
import { useFonts } from "expo-font";

// Contexts
import AuthenticationContextProvider from "./src/contexts/Authentication";
import ThemeContextProvider from "./src/contexts/ThemeContext";

// Navigation
import { NavigationContainer } from "@react-navigation/native";

// Routes
import Routes from "./src/routes";

// Constants
import { COLORS } from "./src/constants";

const App = () => {
	const [fontsLoaded] = useFonts({
		"Colfax-Regular": require("./src/assets/fonts/ColfaxAIRegular.otf"),
		"Colfax-Bold": require("./src/assets/fonts/ColfaxAIBold.otf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<ThemeContextProvider>
				<AuthenticationContextProvider>
					<View style={styles.app}>
						<StatusBar
							backgroundColor={COLORS.dark.background}
							barStyle={"light-content"}
						/>
						<Routes />
					</View>
				</AuthenticationContextProvider>
			</ThemeContextProvider>
		</NavigationContainer>
	);
};

export default App;

const styles = StyleSheet.create({
	app: {
		flex: 1,
	},
});
