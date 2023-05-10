import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";

// Components
import Icons from "./Icons";

// Contexts
import { useTheme } from "../contexts/ThemeContext";

const Input = (props) => {
	const { colors } = useTheme();
	const {
		style,
		containerStyle,
		value,
		onChangeText,
		icon,
		onIconPress,
		placeholder,
	} = props;
	return (
		<View
			style={[
				styles.container,
				containerStyle,
				{ backgroundColor: colors.backgroundLight },
			]}
		>
			<TextInput
				placeholder={placeholder ? placeholder : "Enter your text ..."}
				placeholderTextColor={colors.fontLight}
				value={value}
				onChangeText={onChangeText}
				style={[
					styles.input,
					{
						color: colors.font,
						fontSize: 16,
						flex: 1,
						...style,
					},
				]}
			/>
			{icon && (
				<TouchableOpacity
					onPress={onIconPress}
					style={{ marginLeft: 10 }}
				>
					<Icons name={icon} size={24} color={colors.fontLight} />
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		paddingVertical: 12,
		fontFamily: "Colfax-Regular",
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		elevation: 3,
	},
});

export default Input;
