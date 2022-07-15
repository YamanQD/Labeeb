import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useStore } from "src/core/infrastructure/store";

const LogoutButton = () => {
    const setUserInfo = useStore((state) => state.setUserInfo);
    const navigate = useNavigate();

    const logout = () => {
        setUserInfo(null);
        navigate("/logout");
    }

    return (
        <Button
            sx={{ mt: "auto", mb: 2, mx: 2 }}
            variant="contained"
            onClick={logout}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
