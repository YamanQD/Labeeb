import { ReactNode } from "react";

import { styled } from "@mui/material/styles";

import Logo from "src/components/Logo";

const SidebarWrapper = styled("div")(
    ({ theme }) => `
		display: flex;
		flex-direction: column;
		
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

const TopSection = styled("div")(
    ({ theme }) => `
        display: flex;
        height: 88px;
        align-items: center;
        margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);

const ButtonsContainer = styled("div")(
    ({ theme }) => `
        display: flex;
        flex-direction: column;

        margin-top: auto;
    `
);

interface SidebarProps {
    menu: ReactNode;
    buttons: ReactNode;
}

const Sidebar = ({ menu, buttons }: SidebarProps) => {
    return (
        <div>
            <SidebarWrapper>
                <TopSection>
                    <Logo />
                </TopSection>
                {menu}
                <ButtonsContainer>{buttons}</ButtonsContainer>
            </SidebarWrapper>
        </div>
    );
};

export default Sidebar;
