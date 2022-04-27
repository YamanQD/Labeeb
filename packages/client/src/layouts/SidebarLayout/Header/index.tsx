import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { Box, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { SidebarContext } from "src/contexts/SidebarContext";
import HeaderButtons from "./Buttons";
import HeaderUserbox from "./Userbox";

const HeaderWrapper = styled(Box)(
	({ theme }) => `
		display: flex;
		align-items: center;
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: sticky;
        justify-content: space-between;
`
);

function Header() {
	const { isSidebarVisible, toggleSidebar } = useContext(SidebarContext);

	return (
		<HeaderWrapper>
			<Box display="flex" alignItems="center" ml="auto">
				<HeaderButtons />
				<HeaderUserbox />
				<Box
					sx={{
						display: {
							lg: "none",
							xs: "block",
						},
					}}
				>
					<Tooltip arrow title="Toggle Menu">
						<IconButton color="primary" onClick={toggleSidebar}>
							{!isSidebarVisible ? (
								<MenuTwoToneIcon />
							) : (
								<CloseTwoToneIcon />
							)}
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
		</HeaderWrapper>
	);
}

export default Header;
