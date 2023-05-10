// Utils
import { deleteUser } from "../utils";

const LogoutFunction = async (setUser, setIsLoggedIn) => {
	try {
		deleteUser(setUser, setIsLoggedIn);
	} catch (error) {
		console.log(error);
	}
};

export default LogoutFunction;
