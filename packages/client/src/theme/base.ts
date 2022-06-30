import { Theme } from "@mui/material";
import { AvailableThemes, DarkTheme, LightTheme } from "./schemes";

export function themeCreator(theme: AvailableThemes): Theme {
	return themeMap[theme];
}

const themeMap: { [key in AvailableThemes]: Theme } = {
	light: LightTheme,
	dark: DarkTheme,
};

interface baseTheme {
	general: {
		borderRadiusSm: string;
		borderRadius: string;
		borderRadiusLg: string;
		borderRadiusXl: string;
	};
	sidebar: {
		background: React.CSSProperties["color"];
		boxShadow: React.CSSProperties["color"];
		width: string;
		textColor: React.CSSProperties["color"];
		dividerBg: React.CSSProperties["color"];
		menuItemColor: React.CSSProperties["color"];
		menuItemColorActive: React.CSSProperties["color"];
		menuItemBg: React.CSSProperties["color"];
		menuItemBgActive: React.CSSProperties["color"];
		menuItemIconColor: React.CSSProperties["color"];
		menuItemIconColorActive: React.CSSProperties["color"];
		menuItemHeadingColor: React.CSSProperties["color"];
	};
	header: {
		height: string;
		background: React.CSSProperties["color"];
		boxShadow: React.CSSProperties["color"];
		textColor: React.CSSProperties["color"];
	};
}

declare module "@mui/material/styles" {
	interface Theme extends baseTheme {}
	interface ThemeOptions extends baseTheme {}
}
