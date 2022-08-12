import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useStore } from "src/lib/store";

const LogoutButton = () => {
    const { t } = useTranslation();
    const setUserInfo = useStore((state) => state.setUserProfile);
    const navigate = useNavigate();

    const logout = () => {
        setUserInfo(null);
        navigate("/login");
    };

    return (
        <Tooltip arrow title={t("actions.logout")}>
            <IconButton color="primary" onClick={logout}>
                <LogoutIcon />
            </IconButton>
        </Tooltip>
    );
};

export default LogoutButton;
