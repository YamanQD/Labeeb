import { Box } from "@mui/material";
import LanguageToggle from "./LanguageToggle";
import HeaderNotifications from "./Notifications";
import HeaderSearch from "./Search";
import ThemeToggle from "./ThemeToggle";

function HeaderButtons() {
	return (
		<Box sx={{ mr: 1 }}>
			<LanguageToggle />
			<ThemeToggle />
			<HeaderSearch />
			<Box sx={{ mx: 0.5 }} component="span">
				<HeaderNotifications />
			</Box>
		</Box>
	);
}

export default HeaderButtons;
