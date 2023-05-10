import { StyleSheet, View, Image } from "react-native";
import { useEffect, useState } from "react";

// Components
import Text from "./Text";
import MeIcon from "./MeIcon";

// Contexts
import { useTheme } from "../contexts/ThemeContext";

const MessageBox = ({ message, variant, error }) => {
	const { colors } = useTheme();
	const [showCursor, setShowCursor] = useState(true);

	const toggleCursor = () => {
		setShowCursor((prevState) => !prevState);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			toggleCursor();
		}, 500);

		// Clear the interval when the component unmounts
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<View
			style={[
				styles.messageBox,
				{
					backgroundColor:
						variant === "user"
							? colors.backgroundLight
							: colors.background,
					borderWidth: error ? 0.5 : 0,
					borderColor: error ? colors.error : colors.background,
				},
			]}
		>
			{variant === "user" ? (
				<MeIcon />
			) : (
				<Image
					source={require("../assets/images/Logo.png")}
					style={styles.botLogo}
				/>
			)}
			{message === "Loading ..." ? (
				showCursor && (
					<Text
						style={{ width: "100%", marginLeft: 15, marginTop: 5 }}
					>
						<View
							style={[
								styles.cursor,
								{ backgroundColor: colors.font },
							]}
						/>
					</Text>
				)
			) : (
				<Text
					label={message}
					style={{
						width: "80%",
						fontSize: 16,
					}}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	messageBox: {
		padding: 15,
		paddingVertical: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		elevation: 1,
	},
	botLogo: {
		width: 45,
		height: 45,
		justifyContent: "center",
		alignItems: "center",
		objectFit: "contain",
	},
	cursor: {
		width: 3,
		height: 20,
	},
});

export default MessageBox;
