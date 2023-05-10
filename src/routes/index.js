import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

// Contexts
import { useAuthentication } from "../contexts/Authentication";

const Routes = () => {
	const { isLoggedIn } = useAuthentication();

	return isLoggedIn ? <AppStack /> : <AuthStack />;
};

export default Routes;
