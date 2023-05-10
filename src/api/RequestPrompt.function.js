// Constants
import { API_END_POINT } from "../constants/apiConfiguration";

const RequestPromptFunction = async (query, setAnswer, setLoading) => {
	if (setLoading) setLoading(true);
	try {
		fetch(`${API_END_POINT}/request-prompt`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: query,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data?.status === "OK") {
					setAnswer(data?.message?.output);
				} else {
					setAnswer(
						"Sorry, we are facing high traffic. Please try again later.",
					);
				}
				if (setLoading) setLoading(false);
			})
			.catch(() => {
				setAnswer(
					"Sorry, we are facing high traffic. Please try again later.",
				);
				if (setLoading) setLoading(false);
			});
	} catch (error) {
		setAnswer("Sorry, we are facing high traffic. Please try again later.");
		if (setLoading) setLoading(false);
	}
};

export default RequestPromptFunction;
