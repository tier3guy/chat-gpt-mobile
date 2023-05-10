import { useContext, createContext } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

// constansts/colors.js
import { COLORS } from "../constants";

const ThemeContextProvider = ({ children }) => {
	const colors = COLORS.dark;

	return (
		<ThemeContext.Provider
			value={{
				colors,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
