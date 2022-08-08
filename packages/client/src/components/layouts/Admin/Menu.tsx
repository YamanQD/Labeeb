import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import MenuItem from "src/components/Sidebar/MenuItem";

const AdminSidebarMenu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const items = [
        {
            id: 1,
            title: t("sidebar.users"),
            route: "/admin/users",
        },
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
                <MenuItem key={item.id} title={item.title} onClick={() => navigate(item.route)} />
            ))}
        </Box>
    );
};

export default AdminSidebarMenu;
