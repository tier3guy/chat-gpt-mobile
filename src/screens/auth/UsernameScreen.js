import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

// Components
import { Text, Button, Input, Loader } from "../../components";

// Contexts
import { useTheme } from "../../contexts/ThemeContext";
import { useAuthentication } from "../../contexts/Authentication";

// apis
import { SignupFunction } from "../../api";

const UsernameScreen = ({ navigation, route }) => {
	const { colors } = useTheme();
	const { signup } = useAuthentication();

	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const SignupFunctionHandler = async () => {
		if (!username) {
			setError("Please enter a username.");
			return;
		}
		const creadentials = {
			username,
			email: route.params.email,
			password: route.params.password,
		};
		setLoading(true);
		const response = await signup(creadentials);
		if (response === 505) {
			setError("Something went wrong. Please try again later.");
		}
		setLoading(false);
	};

	return (
		<View style={[styles.username, { backgroundColor: colors.background }]}>
			<View style={styles.upper}>
				<Image
					source={require("../../assets/images/Logo.png")}
					style={{
						width: 50,
						height: 50,
						objectFit: "contain",
					}}
				/>
				<View style={styles.textContainer}>
					<Text>Welcome to ChatGPT Mobile !</Text>
					<View style={{ marginTop: 10 }}>
						<Text>Create your account</Text>
						<Text
							small
							style={{ color: colors.fontLight, marginTop: 5 }}
						>
							Please note that phone verification is required for
							signup. Your number will only be used to verify your
							identity for security purposes.
						</Text>
					</View>
				</View>
				<View style={styles.inputContainer}>
					<Input
						placeholder={"Enter your Username"}
						value={username}
						onChangeText={setUsername}
					/>
					{error && <Text error label={error} style={styles.error} />}
					{loading && <Loader />}
				</View>
			</View>

			<View>
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text
						small
						style={{ color: colors.fontLight, marginBottom: 10 }}
					>
						Already have an account ? Log in
					</Text>
				</TouchableOpacity>
				<Button label="Signup" onPress={SignupFunctionHandler} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	username: {
		flex: 1,
		padding: 20,
		justifyContent: "space-between",
	},
	upper: {},
	textContainer: {
		marginTop: 20,
		height: 140,
		justifyContent: "space-between",
	},
	inputContainer: {
		marginTop: 20,
	},
	error: {
		marginTop: 10,
		fontSize: 15,
	},
});

export default UsernameScreen;
