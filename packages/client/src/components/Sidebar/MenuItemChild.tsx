import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface MenuItemChildProps {
    id: number;
    badge?: string | number;
    title: string;
    onClick: () => void;
    isActive: boolean;
}

const MenuItemChildButton = styled(Button)(
    ({ theme }) => `
        justify-content: space-between;
        width: 100%;
        font-weight: 600;
        color: ${theme.sidebar.menuItemColor};

        &.active {
            color: ${theme.sidebar.menuItemColorActive};
            background-color: ${theme.sidebar.menuItemBgActive};
        }
    `
);

const MenuItemChild = ({ id, onClick, title, badge = 5, isActive = false }: MenuItemChildProps) => {
    return (
        <MenuItemChildButton onClick={onClick} className={isActive ? "active" : ""}>
            {title}
            {badge && <Badge color="primary" badgeContent={badge} sx={{ right: "8px" }} />}
        </MenuItemChildButton>
    );
};

export default MenuItemChild;
