import {
	View,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";

// Components
import { Text, Input, MessageBox, Icons } from "../../components";

// Contexts
import { useTheme } from "../../contexts/ThemeContext";
import { useAuthentication } from "../../contexts/Authentication";

// apis
import { RequestPromptFunction } from "../../api";

const HomeScreen = ({ navigation, route }) => {
	const parameters = route?.params;

	const { colors } = useTheme();
	const scrollViewRef = useRef();

	const TEXT_RENDER_TIME = 50;
	const [query, setQuery] = useState("");
	const [chats, setChats] = useState([]);
	const [answer, setAnswer] = useState("");
	const [loading, setLoading] = useState(false);
	const [displayText, setDisplayText] = useState("");

	const handleContentSizeChange = () => {
		scrollViewRef.current.scrollToEnd({ animated: true });
	};

	const updateDisplayText = (text) => {
		let i = 0;
		const timer = setInterval(() => {
			if (i < text.length) {
				setDisplayText(text.slice(0, i + 1));
				i++;
			} else {
				clearInterval(timer);
				setDisplayText("");
				setChats((prevChats) => [
					...prevChats,
					{
						message: text,
						variant: "bot",
						error:
							text ===
							"Sorry, we are facing high traffic. Please try again later.",
					},
				]);
			}
		}, TEXT_RENDER_TIME);
	};

	const askQuery = async () => {
		if (query === "") return;
		setChats((prevChats) => [
			...prevChats,
			{
				message: query,
				variant: "user",
				error: false,
			},
		]);
		setQuery("");
		await RequestPromptFunction(query, setAnswer, setLoading);
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	useEffect(() => {
		if (answer !== "") {
			updateDisplayText(answer);
			setAnswer("");
		}
	}, [answer]);

	useEffect(() => {
		setChats(parameters?.chat?.chats || []);
	}, [parameters]);

	return (
		<View style={[styles.home, { backgroundColor: colors.background }]}>
			<View
				style={[styles.header, { borderBottomColor: colors.fontLight }]}
			>
				<TouchableOpacity onPress={openDrawer}>
					<Icons name="Bar" size={24} color={colors.font} />
				</TouchableOpacity>
				<View style={styles.center}>
					<Text
						label={parameters?.chat?.__id || "New Chat"}
						style={{
							textAlign: "center",
							fontSize: 24,
							width: "40%",
						}}
						numberOfLines={1}
					/>
				</View>
			</View>
			<View style={styles.messageContainer}>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={styles.scrollView}
					ref={scrollViewRef}
					onContentSizeChange={handleContentSizeChange}
				>
					<View>
						{chats.map((chat, index) => {
							return (
								<MessageBox
									key={index}
									message={chat.message}
									variant={chat.variant}
									error={chat.error}
								/>
							);
						})}
						{displayText && (
							<MessageBox
								message={displayText}
								variant={"bot"}
								error={false}
							/>
						)}
						{loading && (
							<MessageBox
								message={"Loading ..."}
								variant={"bot"}
								error={false}
							/>
						)}
					</View>
				</ScrollView>
			</View>
			<View
				style={[
					styles.inputContainer,
					{ borderTopColor: colors.fontLight },
				]}
			>
				<Input
					placeholder="Send a message ..."
					icon="Plane"
					style={{ paddingVertical: 15 }}
					onIconPress={askQuery}
					value={query}
					onChangeText={setQuery}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	home: {
		flex: 1,
		justifyContent: "space-between",
	},
	messageContainer: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	inputContainer: {
		borderTopWidth: 0.5,
	},
	header: {
		height: 50,
		width: Dimensions.get("screen").width,
		paddingHorizontal: 20,
		alignItems: "center",
		borderBottomWidth: 0.5,
		flexDirection: "row",
	},
	center: {
		width: Dimensions.get("screen").width,
		height: "100%",
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		zIndex: -1,
	},
});

export default HomeScreen;
