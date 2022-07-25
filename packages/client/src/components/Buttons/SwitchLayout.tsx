import Button from "@mui/material/Button";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface SwitchLayoutButtonProps {
    route: string;
    children: ReactNode;
}

const SwitchLayoutButton = ({ route, children }: SwitchLayoutButtonProps) => {
    const navigate = useNavigate();

    return (
        <Button
            sx={{ mt: "auto", mb: 2, mx: 2 }}
            variant="contained"
            onClick={() => navigate(route)}
        >
            {children}
        </Button>
    );
};

export default SwitchLayoutButton;
