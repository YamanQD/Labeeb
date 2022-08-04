import { Box } from "@mui/material";
import LanguageToggle from "../../Buttons/LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const HeaderButtons = () => {
	return (
		<Box sx={{ mr: 1 }}>
			<LanguageToggle />
			<ThemeToggle />
		</Box>
	);
}

export default HeaderButtons;
