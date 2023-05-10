import { StyleSheet, ActivityIndicator, View } from "react-native";

// Contexts
import { useTheme } from "../contexts/ThemeContext";

const Loader = ({ size, color }) => {
	const { colors } = useTheme();

	return (
		<View
			style={[
				styles.loaderContainer,
				{
					width: size ? size : 50,
					height: size ? size : 50,
				},
			]}
		>
			<ActivityIndicator
				size={size ? size : "large"}
				color={color ? color : colors.logo}
				style={[
					styles.loader,
					{
						width: size ? size : 50,
						height: size ? size : 50,
					},
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	loaderContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	loader: {},
});

export default Loader;
