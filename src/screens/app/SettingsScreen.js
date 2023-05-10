import { View, StyleSheet } from "react-native";

// Components
import { Text } from "../../components";

// Contexts
import { useTheme } from "../../contexts/ThemeContext";

const SettingsScreen = ({ navigation }) => {
	const { colors } = useTheme();

	return (
		<View style={[styles.settings, { backgroundColor: colors.background }]}>
			<Text>Settings</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	settings: {
		flex: 1,
		justifyContent: "space-between",
	},
});

export default SettingsScreen;
