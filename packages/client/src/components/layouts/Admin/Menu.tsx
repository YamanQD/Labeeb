import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import MenuItem from "src/components/Sidebar/MenuItem";
import { useTranslation } from "react-i18next";

const AdminSidebarMenu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const items = [
        {
            id: 1,
            title: "Users",
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
