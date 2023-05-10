// Utils
import { isValidEmail, setUser } from "../utils";

// Constants
import { API_END_POINT } from "../constants/apiConfiguration";

const LoginFunction = async (
	email,
	password,
	setError,
	setLoading,
	setIsLoggedIn,
) => {
	if (!email || !password) {
		if (setError) setError("Please fill all the fields.");
		if (setLoading) setLoading(false);
		return;
	}
	if (!isValidEmail(email)) {
		if (setError) setError("Please enter a valid email.");
		if (setLoading) setLoading(false);
		return;
	}
	if (setLoading) setLoading(true);

	try {
		fetch(`${API_END_POINT}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email.trim(),
				password: password.trim(),
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === "OK")
					setUser(
						{
							email: email.trim(),
							password: password.trim(),
						},
						setUser,
						setIsLoggedIn,
					);
				if (setLoading) setLoading(false);
			})
			.catch(() => {
				if (setError)
					setError("Something went wrong. Please try again later.");
				if (setLoading) setLoading(false);
			});
	} catch (error) {
		if (setError) setError("Something went wrong. Please try again later.");
	}
};

export default LoginFunction;
