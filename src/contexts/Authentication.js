// Internal Imports
import { useContext, createContext, useState, useEffect } from "react";

// Authentication Context
const AuthenticationContext = createContext();
export const useAuthentication = () => useContext(AuthenticationContext);

// External Imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Contants
import { API_END_POINT } from "../constants/apiConfiguration";
import { RN_ASYNC_STORAGE_KEY } from "../constants/storage";

const AuthenticationProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigation = useNavigation();

	const checkLoggedIn = async () => {
		setLoading(true);
		const token = await AsyncStorage.getItem(RN_ASYNC_STORAGE_KEY);
		if (token) {
			setUser(JSON.parse(token));
			setIsLoggedIn(true);
			setLoading(false);
		} else {
			setIsLoggedIn(false);
			setLoading(false);
		}
	};

	const login = async ({ email, password }) => {
		try {
			const response = await fetch(`${API_END_POINT}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email.trim(),
					password: password.trim(),
				}),
			});

			const data = await response.json();
			if (data.status === "OK") {
				await AsyncStorage.setItem(
					RN_ASYNC_STORAGE_KEY,
					JSON.stringify(data.user),
				);
				setUser(data.user);
				setIsLoggedIn(true);
				return 202;
			} else {
				return 404;
			}
		} catch (err) {
			console.log(err);
			return 505;
		}
	};

	const logout = async () => {
		setUser(null);
		setIsLoggedIn(false);
		await AsyncStorage.removeItem(RN_ASYNC_STORAGE_KEY);
	};

	const signup = async ({ email, password, username }) => {
		try {
			const response = await fetch(`${API_END_POINT}/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email.trim(),
					password: password.trim(),
					username: username.trim(),
				}),
			});

			const data = await response.json();
			if (data.status === "OK") {
				navigation.navigate("Login");
				return 202;
			} else {
				return 404;
			}
		} catch (err) {
			console.log(err);
			return 505;
		}
	};

	const updateChat = async (chat) => {
		let found = false;
		let chatHistory = user.chatHistory.map((item) => {
			if (item.__id === chat.__id) {
				found = true;
				return chat;
			} else {
				return item;
			}
		});
		if (!found) {
			chatHistory.push(chat);
		}

		setUser((prev) => ({
			...prev,
			chatHistory,
		}));

		AsyncStorage.setItem(
			RN_ASYNC_STORAGE_KEY,
			JSON.stringify({
				...user,
				chatHistory,
			}),
		);

		try {
			const response = await fetch(`${API_END_POINT}/add-chat`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: user.email,
					password: user.password,
					chat: chat,
				}),
			});

			const data = await response.json();
			if (data.status === "OK") {
				return 202;
			} else {
				return 404;
			}
		} catch (err) {
			console.log(err);
			return 505;
		}
	};

	const clearChatHistory = async () => {
		setUser((prev) => ({
			...prev,
			chatHistory: [],
		}));

		AsyncStorage.setItem(
			RN_ASYNC_STORAGE_KEY,
			JSON.stringify({
				...user,
				chatHistory: [],
			}),
		);

		try {
			const response = await fetch(`${API_END_POINT}/clear-chats`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: user.email,
					password: user.password,
				}),
			});

			const data = await response.json();
			if (data.status === "OK") {
				return 202;
			} else {
				return 404;
			}
		} catch (err) {
			console.log(err);
			return 505;
		}
	};

	useEffect(() => {
		checkLoggedIn();
	}, []);

	return (
		<AuthenticationContext.Provider
			value={{
				user,
				setUser,
				isLoggedIn,
				setIsLoggedIn,
				checkLoggedIn,
				login,
				logout,
				signup,
				updateChat,
				clearChatHistory,
			}}
		>
			{!loading && children}
		</AuthenticationContext.Provider>
	);
};

export default AuthenticationProvider;
