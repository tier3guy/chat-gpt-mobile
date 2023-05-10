// Extrernal Dependencies
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
import { RN_ASYNC_STORAGE_KEY } from "../constants/storage";

export const getUser = async (setUser, setIsLoggedIn, setLoading) => {
	if (setLoading) setLoading(true);
	try {
		const user = await AsyncStorage.getItem(RN_ASYNC_STORAGE_KEY);
		if (user) {
			setUser(JSON.parse(user));
			setIsLoggedIn(true);
		}
	} catch (error) {}
	if (setLoading) setLoading(false);
};

export const setUser = async (user, setUserLocal, setIsLoggedIn) => {
	try {
		await AsyncStorage.setItem(RN_ASYNC_STORAGE_KEY, JSON.stringify(user));
		setUserLocal(user);
		setIsLoggedIn(true);
	} catch (error) {}
};

export const deleteUser = async (setUser, setIsLoggedIn) => {
	try {
		await AsyncStorage.removeItem(RN_ASYNC_STORAGE_KEY);
		setUser(null);
		setIsLoggedIn(false);
	} catch (error) {}
};
