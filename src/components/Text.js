import { Text } from "react-native";

// Contexts
import { useTheme } from "../contexts/ThemeContext";

const RNText = ({
	children,
	label,
	bold,
	error,
	primary,
	small,
	style,
	...restProps
}) => {
	const { colors } = useTheme();

	return (
		<Text
			style={{
				fontFamily: bold ? "Colfax-Bold" : "Colfax-Regular",
				color: error
					? colors.error
					: primary
					? colors.primary
					: colors.font,
				fontSize: small ? 15 : 18,
				lineHeight: 24,
				...style,
			}}
			{...restProps}
		>
			{children ? children : label}
		</Text>
	);
};

export default RNText;
