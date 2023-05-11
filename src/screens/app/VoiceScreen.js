import { Text } from "../../components";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import * as Speech from "expo-speech";
import { Audio } from "expo-av";

import { useTheme } from "../../contexts/ThemeContext";

async function startVoiceSearch() {
	try {
		// Ask for microphone permission if not already granted
		const { status } = await Audio.requestPermissionsAsync();
		if (status !== "granted") {
			alert("Microphone permission required to use voice search");
			return;
		}

		// Start capturing voice input
		await Speech.stop();
		const { uri, transcription } = await Speech.recognizeAsync({
			language: "en-US",
		});

		console.log(uri);
		console.log(transcription);
		return uri;
	} catch (error) {
		console.error(error);
		alert("An error occurred while using voice search");
	}
}

const VoiceScreen = () => {
	let [results, setResults] = useState([]);
	const { colors } = useTheme();

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: colors.background,
				},
			]}
		>
			<TouchableOpacity onPress={startVoiceSearch}>
				<Text label={"Start Voice Recognizaton"} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default VoiceScreen;
