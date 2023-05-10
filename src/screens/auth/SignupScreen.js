import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

// Components
import { Text, Button, Input } from "../../components";

// Contexts
import { useTheme } from "../../contexts/ThemeContext";

// Utils
import { isValidEmail } from "../../utils";

const SignupScreen = ({ navigation }) => {
	const { colors } = useTheme();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const slideBack = () => {
		navigation.goBack();
	};

	const goToUsernmameScreen = () => {
		if (!email || !password) {
			setError("Please fill in all the fields.");
			return;
		}

		if (!isValidEmail(email)) {
			setError("Please enter a valid email address");
			return;
		}

		navigation.navigate({
			name: "Username",
			params: { email, password },
		});
	};

	return (
		<View style={[styles.signup, { backgroundColor: colors.background }]}>
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
				{error && <Text error label={error} style={styles.error} />}
			</View>

			<View>
				<TouchableOpacity onPress={slideBack}>
					<Text
						small
						style={{ color: colors.fontLight, marginBottom: 10 }}
					>
						Already have an account ? Log in
					</Text>
				</TouchableOpacity>
				<Button label="Continue" onPress={goToUsernmameScreen} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	signup: {
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
		height: 110,
		justifyContent: "space-between",
	},
	error: {
		marginTop: 10,
		fontSize: 15,
	},
});

export default SignupScreen;
