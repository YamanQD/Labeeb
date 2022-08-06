import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useStore } from "src/core/infrastructure/store";

const LogoutButton = () => {
    const { t } = useTranslation();
    const setUserInfo = useStore((state) => state.setUserProfile);
    const navigate = useNavigate();

    const logout = () => {
        setUserInfo(null);
        navigate("/login");
    };

    return (
        <Button sx={{ mb: 2, mx: 2 }} variant="contained" onClick={logout}>
            {t("actions.logout", { ns: "common" })}
        </Button>
    );
};

export default LogoutButton;
