import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, Tooltip } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "src/theme/ThemeProvider";

const ThemeToggle = () => {
	const { toggleTheme, theme } = useContext(ThemeContext);
	return (
		<Tooltip arrow title="Switch theme">
			<IconButton
				color="primary"
				onClick={() =>
					toggleTheme(theme === "light" ? "dark" : "light")
				}
			>
				{theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
			</IconButton>
		</Tooltip>
	);
};

export default ThemeToggle;
