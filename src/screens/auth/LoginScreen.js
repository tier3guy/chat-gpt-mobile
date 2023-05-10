// Internal Imports
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

// Components
import { Text, Button, Input, Loader } from "../../components";

// Contexts
import { useTheme } from "../../contexts/ThemeContext";
import { useAuthentication } from "../../contexts/Authentication";

const LoginScreen = ({ navigation }) => {
	const { colors } = useTheme();
	const { login } = useAuthentication();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const slideToSignup = () => navigation.navigate("Signup");

	const loginFunctionHandler = async () => {
		setLoading(true);
		const response = await login({ email, password });
		if (response === 404) {
			setError("Invalid email or password");
		} else if (response === 505) {
			setError("Internal Server error. Please try again later.");
		}
		setLoading(false);
	};

	return (
		<View style={[styles.login, { backgroundColor: colors.background }]}>
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
					<Text>Log in with your OpenAI account to continue.</Text>
				</View>
				<View style={styles.inputContainer}>
					<Input
						placeholder={"Email Address"}
						value={email}
						onChangeText={setEmail}
					/>
					<Input
						placeholder={"Password"}
						value={password}
						onChangeText={setPassword}
					/>
				</View>
				{error && <Text error style={styles.error} label={error} />}
				{loading && <Loader />}
			</View>
			<View>
				<TouchableOpacity onPress={slideToSignup}>
					<Text
						small
						style={{ color: colors.fontLight, marginBottom: 10 }}
					>
						Don't have an account ? Sign Up
					</Text>
				</TouchableOpacity>
				<Button
					label="Log in with OpenAI"
					onPress={loginFunctionHandler}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	login: {
		flex: 1,
		padding: 20,
		justifyContent: "space-between",
	},
	textContainer: {
		marginTop: 20,
		height: 80,
		justifyContent: "space-between",
	},
	inputContainer: {
		marginTop: 20,
		height: 110,
		justifyContent: "space-between",
		marginBottom: 10,
	},
	error: {
		fontSize: 15,
	},
});

export default LoginScreen;
