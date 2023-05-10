// Path: src\assets\icons.js

// Icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

export const icons = {
	Home: {
		name: "home-variant",
		component: MaterialCommunityIcons,
	},
	User: {
		name: "user",
		component: AntDesign,
	},
	Search: {
		name: "magnify",
		component: MaterialCommunityIcons,
	},
	Bar: {
		name: "bars",
		component: FontAwesome5,
	},
	Plane: {
		name: "paper-plane",
		component: Ionicons,
	},
	Settings: {
		name: "settings-outline",
		component: Ionicons,
	},
	Delete: {
		name: "delete",
		component: AntDesign,
	},
	Link: {
		name: "external-link",
		component: Feather,
	},
	Logout: {
		name: "logout",
		component: MaterialIcons,
	},
	Plus: {
		name: "plus",
		component: AntDesign,
	},
	Message: {
		name: "message",
		component: Entypo,
	},
};

const Icon = ({ name, size, color, style }) => {
	const Icon = icons[name].component;
	const SIZE = size || 24;
	const COLOR = color || "black";
	return (
		<Icon name={icons[name].name} size={SIZE} color={COLOR} style={style} />
	);
};

export default Icon;
