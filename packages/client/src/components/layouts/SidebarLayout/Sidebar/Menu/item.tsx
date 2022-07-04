import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import { ReactNode, useState } from "react";

interface SidebarMenuItemProps {
    children?: ReactNode;
    icon?: any;
    badge?: string;
    open?: boolean;
    title: string;
    onClick: () => void;
}

const SidebarMenuItem = ({
    children,
    icon: Icon,
    open = false,
    badge,
    title,
    onClick,
}: SidebarMenuItemProps) => {
    const [menuToggle, setMenuToggle] = useState(open);

    const toggleMenu = (): void => {
        setMenuToggle((open) => !open);
    };

    if (children) {
        return (
            <ListItem component="div" className="Mui-children" key={title} sx={{ p: 0}}>
                <Button
                    className={`${menuToggle ? "Mui-active" : ""}`}
                    startIcon={Icon && <Icon />}
                    endIcon={menuToggle ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
                    onClick={toggleMenu}
                >
                    <Box
                        component="span"
                        sx={{
                            "&:hover": {
                                borderBottom: 1,
                                borderBottomStyle: "dashed",
                            },
                        }}
                        onClick={onClick}
                    >
                        {title}
                    </Box>
                </Button>
                <Collapse in={menuToggle}>{children}</Collapse>
            </ListItem>
        );
    }

    return (
        <ListItem component="div" key={title}>
            <Button startIcon={Icon && <Icon />} onClick={onClick}>
                {title}
                {badge && <Badge badgeContent={badge} />}
            </Button>
        </ListItem>
    );
};

export default SidebarMenuItem;
