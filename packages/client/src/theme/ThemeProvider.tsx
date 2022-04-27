import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import React, { useCallback, useState } from "react";
import { themeCreator } from "./base";
import { AvailableThemes } from "./schemes";

interface WrapperProps {
	children: React.ReactNode;
}

interface ThemeContextValue {
	toggleTheme: (themeName: AvailableThemes) => void;
	theme: AvailableThemes;
}

export const ThemeContext = React.createContext({} as ThemeContextValue);

const ThemeProviderWrapper = ({ children }: WrapperProps) => {
	const currentThemeName = (localStorage.getItem("appTheme") ||
		"light") as AvailableThemes;
	const [themeName, setThemeName] = useState(currentThemeName);

	const toggleTheme = useCallback((name: AvailableThemes) => {
		localStorage.setItem("appTheme", name);
		setThemeName(name);
	}, []);

	const MUITheme = themeCreator(themeName);

	return (
		<ThemeContext.Provider
			value={{
				toggleTheme,
				theme: themeName,
			}}
		>
			<MUIThemeProvider theme={MUITheme}>{children}</MUIThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeProviderWrapper;
