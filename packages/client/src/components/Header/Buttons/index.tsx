import { Box } from "@mui/material";
import LogoutButton from "src/components/Buttons/LogoutButton";

import LanguageToggle from "../../Buttons/LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const HeaderButtons = () => {
	return (
		<Box sx={{ mr: 1, display: "flex", gap: 1 }}>
			<LanguageToggle />
			<ThemeToggle />
			<LogoutButton />
		</Box>
	);
}

export default HeaderButtons;
