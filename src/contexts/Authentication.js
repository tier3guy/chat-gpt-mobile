// Internal Imports
import { useContext, createContext, useState, useEffect } from "react";

// Authentication Context
const AuthenticationContext = createContext();
export const useAuthentication = () => useContext(AuthenticationContext);

// External Imports
import AsyncStorage from "@react-native-async-storage/async-storage";

// Contants
import { API_END_POINT } from "../constants/apiConfiguration";
import { RN_ASYNC_STORAGE_KEY } from "../constants/storage";

const AuthenticationProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
			}}
		>
			{!loading && children}
		</AuthenticationContext.Provider>
	);
};

export default AuthenticationProvider;
