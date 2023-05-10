import { TransitionPresets } from "@react-navigation/stack";

const ScreenOptions = {
	headerShown: false,
	...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};

export default ScreenOptions;
