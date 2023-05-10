import { TouchableOpacity, StyleSheet } from "react-native";

// Components
import Text from "./Text";
import Icons from "./Icons";

// Contexts
import { useTheme } from "../contexts/ThemeContext";

const Button = ({ label, onPress, secondary, style, textStyle, frontIcon }) => {
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			style={[
				styles.button,
				{
					backgroundColor: secondary
						? colors.backgroundLight
						: colors.logo,
				},
				secondary && styles.secondary,
				secondary && { borderColor: colors.fontLight },
				style,
			]}
			onPress={onPress ? onPress : () => alert("Clicked")}
		>
			{frontIcon && (
				<Icons
					name={frontIcon}
					size={20}
					color={colors.font}
					style={{ marginRight: 10 }}
				/>
			)}
			<Text
				style={{
					color: secondary ? colors.font : colors.background,
					fontSize: 16,
					...textStyle,
				}}
			>
				{label ? label : "Button"}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	label: {},
	primary: {},
	secondary: {
		borderWidth: 0.5,
		backgroundColor: "transparent",
		borderRadius: 3,
	},
});

export default Button;
