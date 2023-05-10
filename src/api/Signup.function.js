// Constants
import { API_END_POINT } from "../constants/apiConfiguration";

// Utils
import { setUser } from "../utils";

const SignupFunction = async (
	params,
	setUserLocal,
	setIsLoggedIn,
	setLoading,
	setError,
) => {
	try {
		if (setLoading) setLoading(true);
		fetch(`${API_END_POINT}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === "OK") {
					setUser(
						{
							email: params.email,
							password: params.password,
						},
						setUserLocal,
						setIsLoggedIn,
					);
				}
				if (setLoading) setLoading(false);
			})
			.catch((error) => {
				if (setError)
					setError("Something went wrong. Please try again later.");
				if (setLoading) setLoading(false);
			});
	} catch (error) {
		console.log(error);
		if (setError) setError("Something went wrong. Please try again later.");
		if (setLoading) setLoading(false);
	}
};

export default SignupFunction;
