import { StyleSheet, View } from "react-native";

// Components
import Icons from "./Icons";

// Contexts
import { useTheme } from "../contexts/ThemeContext";
import { useAuthentication } from "../contexts/Authentication";

const MeIcon = () => {
	const { colors } = useTheme();
	const { user } = useAuthentication();

	return (
		<View style={[styles.meIcon, { backgroundColor: colors.primary }]}>
			<Icons name="User" size={24} color={colors.font} />
		</View>
	);
};

const styles = StyleSheet.create({
	meIcon: {
		justifyContent: "center",
		alignItems: "center",
		height: 45,
		width: 45,
		borderRadius: 3,
	},
});

export default MeIcon;
