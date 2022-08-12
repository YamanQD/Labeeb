import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MenuItem from "src/components/Sidebar/MenuItem";
import MenuItemChild from "src/components/Sidebar/MenuItemChild";

const AdminSidebarMenu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const items = [
        {
            id: 1,
            title: t("sidebar.users"),
            route: "/admin/users",
        },

        {
            id: 2,
            title: t("sidebar.projects"),
            route: "/admin/projects",
            children: [
                {
                    id: 3,
                    title: t("sidebar.lists"),
                    route: "/admin/lists",
                },
            ],
        }
    ];

    return (
        <Box
            sx={{
                px: 2,
            }}
        >
            <Typography variant="h4" sx={{ textTransform: "uppercase", mb: 2 }}>
                {t("sidebar.management")}
            </Typography>
            {items.map((item) => (
                <MenuItem key={item.id} title={item.title} onClick={() => navigate(item.route)}>
                    {item.children?.map((child) => (
                        <MenuItemChild
                            key={child.id}
                            id={child.id}
                            title={child.title}
                            onClick={() => navigate(child.route)}                            
                        />
                    ))}
                </MenuItem>
            ))}
        </Box>
    );
};

export default AdminSidebarMenu;
