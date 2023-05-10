// Screens
import { HomeScreen, SettingsScreen } from "../screens";

// Components
import { CustomDrawer } from "../components";

// Navigation
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

const AppStack = () => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
			}}
			drawerContent={(props) => <CustomDrawer {...props} />}
			initialRouteName="Home"
		>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Settings" component={SettingsScreen} />
		</Drawer.Navigator>
	);
};

export default AppStack;
