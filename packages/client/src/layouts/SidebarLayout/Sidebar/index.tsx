import { Box, Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import Logo from "src/components/Logo";
import { SidebarContext } from "src/contexts/SidebarContext";
import SidebarMenu from "./Menu";

const SidebarWrapper = styled(Box)(
	({ theme }) => `
        width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: ${theme.sidebar.background};
        box-shadow: ${theme.sidebar.boxShadow};
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
        }
`
);

const TopSection = styled(Box)(
	({ theme }) => `
        display: flex;
        height: 88px;
        align-items: center;
        margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);

function Sidebar() {
	const { isSidebarVisible, toggleSidebar } = useContext(SidebarContext);

	return (
		<>
			<Box
				sx={{
					display: {
						lg: "block",
						xs: "none",
					},
				}}
			>
				<SidebarWrapper>
					<TopSection>
						<Logo />
					</TopSection>
					<SidebarMenu />
				</SidebarWrapper>
			</Box>

			<Box
				sx={{
					display: {
						lg: "none",
						xs: "none",
					},
				}}
			>
				<Drawer
					anchor="left"
					open={isSidebarVisible}
					onClose={toggleSidebar}
					variant="temporary"
					elevation={9}
				>
					<SidebarWrapper>
						<TopSection>
							<Logo />
						</TopSection>
						<SidebarMenu />
					</SidebarWrapper>
				</Drawer>
			</Box>
		</>
	);
}

export default Sidebar;
