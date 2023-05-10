import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

// Components
import Text from "./Text";
import Icons from "./Icons";
import Button from "./Button";

// Contexts
import { useTheme } from "../contexts/ThemeContext";
import { useAuthentication } from "../contexts/Authentication";

// Navigation
import { useNavigation } from "@react-navigation/native";

const Link = ({ text, onPress, icon, style }) => {
	const { colors } = useTheme();

	return (
		<TouchableOpacity onPress={onPress ? onPress : () => {}}>
			<View style={[styles.link, style]}>
				<Icons
					name={icon}
					size={20}
					color={colors.fontLight}
					style={styles.linkIconStyle}
				/>
				<Text numberOfLines={1} label={text} style={styles.linkText} />
			</View>
		</TouchableOpacity>
	);
};

const Drawer = () => {
	const { colors } = useTheme();
	const { logout, user } = useAuthentication();
	const navigation = useNavigation();

	const links = [
		{
			text: "Clear Conversations",
			icon: "Delete",
		},
		{
			text: "Settings",
			icon: "Settings",
			navigateTo: "Settings",
		},
		{
			text: "Get Help",
			icon: "Link",
		},
		{
			text: "Logout",
			icon: "Logout",
			event: logout,
		},
	];

	return (
		<View style={[styles.drawer, { backgroundColor: colors.background }]}>
			<View style={styles.top}>
				<Button
					secondary
					label="New Chat"
					style={{ margin: 15 }}
					frontIcon="Plus"
					onPress={() => navigation.navigate("Home")}
				/>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={[styles.chatList]}
				>
					{user?.chatHistory?.map((chat, index) => {
						return (
							<Link
								key={index}
								secondary
								text={chat.__id}
								icon="Message"
								onPress={() =>
									navigation.navigate("Home", { chat })
								}
							/>
						);
					})}
				</ScrollView>
			</View>
			<View style={[styles.bottom, { borderTopColor: colors.fontLight }]}>
				{links.map((link, index) => {
					return (
						<Link
							key={index}
							text={link.text}
							icon={link.icon}
							onPress={
								link.navigateTo
									? () => navigation.navigate(link.navigateTo)
									: link.event
									? link.event
									: () => {}
							}
						/>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	drawer: {
		flex: 1,
		justifyContent: "space-between",
	},
	top: {
		flex: 1,
	},
	bottom: {
		padding: 15,
		borderTopWidth: 0.5,
	},
	link: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 15,
	},
	linkIconStyle: {
		marginRight: 15,
	},
	chatList: {
		flex: 1,
		paddingHorizontal: 15,
	},
});

export default Drawer;
