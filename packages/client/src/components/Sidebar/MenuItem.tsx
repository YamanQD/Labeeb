import { MouseEvent, ReactNode, useState } from "react";

import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";

interface MenuItemProps {
    children?: ReactNode;
    isActive?: boolean;
    open?: boolean;
    title: string;
    onClick: () => void;
}

const MenuItemTitle = styled("span")(
    ({ theme }) => `
        &:hover {
            border-bottom: 1px dashed ${theme.palette.primary.main};
        }
    `
);

const MenuItemButton = styled(Button)(
    ({ theme }) => `
        color: ${theme.sidebar.menuItemColor};
        background-color: ${theme.sidebar.menuItemBg};
        width: 100%;
        justify-content: space-between;
        font-size: ${theme.typography.pxToRem(13)};
        
        padding-top: ${theme.spacing(0.8)};
        padding-bottom: ${theme.spacing(0.8)};
        margin-bottom: ${theme.spacing(0.8)};

        &.active {
            background-color: ${theme.sidebar.menuItemBgActive};
            color: ${theme.sidebar.menuItemColorActive};
        }
    `
);

const EndIcon = ({ isMenuExpanded = false, onClick = (event: MouseEvent) => {} }) => {
    if (isMenuExpanded) return <ExpandLessTwoToneIcon style={{ fontSize: 24 }} onClick={onClick} />;
    return <ExpandMoreTwoToneIcon style={{ fontSize: 24 }} onClick={onClick} />;
};

const MenuItem = ({
    children,
    open = false,
    title,
    onClick,
    isActive = false,
}: MenuItemProps) => {
    const [isMenuExpanded, setIsMenuExpanded] = useState(open);

    const toggleMenu = (event: MouseEvent) => {
        setIsMenuExpanded((open) => !open);
        event.stopPropagation();
    };

    return (
        <div>
            <MenuItemButton
                className={isActive ? "active" : ""}
                onClick={onClick}
                endIcon={
                    children ? (
                        <EndIcon isMenuExpanded={isMenuExpanded} onClick={toggleMenu} />
                    ) : null
                }
            >
                <MenuItemTitle>{title}</MenuItemTitle>
            </MenuItemButton>
            <Collapse style={{ width: "100%" }} in={isMenuExpanded}>
                {children}
            </Collapse>
        </div>
    );
};

export default MenuItem;
