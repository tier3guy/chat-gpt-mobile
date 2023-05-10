// Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import { LoginScreen, SignupScreen, UsernameScreen } from "../screens";

// Constants
import ScreenOptions from "../constants/StackScreenOptions";

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={ScreenOptions}>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
			<Stack.Screen name="Username" component={UsernameScreen} />
		</Stack.Navigator>
	);
};

export default AuthStack;
