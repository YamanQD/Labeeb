import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { permissions } from "src/features/users/application/permissions";
import { useStore } from "src/lib/store";

interface ProtectedRouteProps {
    children: JSX.Element;
    peopleWhoCanAccess?: keyof typeof permissions;
}

const ProtectedRoute = ({ children, peopleWhoCanAccess = "ALL_USERS" }: ProtectedRouteProps) => {
    const user = useStore((state) => state.userProfile);
    const roles = permissions[peopleWhoCanAccess];

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles.some((role) => user.role === role)) return children;

    toast.warn("Sorry, you don't have enough permissions", {
        position: toast.POSITION.BOTTOM_LEFT,
        type: "error",
    });
    return <Navigate to="/projects" />;
};

export default ProtectedRoute;
