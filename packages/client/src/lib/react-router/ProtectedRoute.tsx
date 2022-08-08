import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useStore } from "src/lib/store";
import { permissions } from "src/features/users/domain/permissions";

interface ProtectedRouteProps {
    children: JSX.Element;
    peopleWhoCanAccess?: keyof typeof permissions;
}

const ProtectedRoute = ({ children, peopleWhoCanAccess = "ALL_USERS" }: ProtectedRouteProps) => {
    const user = useStore((state) => state.userProfile);
    const roles = permissions[peopleWhoCanAccess];

    if (!user) {
        toast("Sorry, you have to log in first", {
            position: toast.POSITION.BOTTOM_LEFT,
            type: "error",
        });
        return <Navigate to="/login" />;
    }

    if (roles.some((role) => user.role === role)) return children;

    toast("Sorry, you don't have enough permissions", {
        position: toast.POSITION.BOTTOM_LEFT,
        type: "error",
    });
    return <Navigate to="/" />;
};

export default ProtectedRoute;
