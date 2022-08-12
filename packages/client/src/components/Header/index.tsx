import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useStore } from "src/lib/store";

import HeaderButtons from "./Buttons";

const HeaderWrapper = styled(Box)(
    ({ theme }) => `
		display: flex;
		align-items: center;
        height: 88px;
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

const Header = () => {
    const user = useStore((state) => state.userProfile);

    return (
        <HeaderWrapper>
            <Box>
                <Typography>Welcome {user?.username}!</Typography>
            </Box>
            <Box display="flex" alignItems="center" ml="auto">
                <HeaderButtons />
            </Box>
        </HeaderWrapper>
    );
};

export default Header;
