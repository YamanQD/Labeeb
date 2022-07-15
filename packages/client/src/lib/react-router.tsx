import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import SuspenseLoader from "src/components/SuspenseLoader";
import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { useStore } from "src/core/infrastructure/store";

const httpClient = HTTPClient.getInstance();

const Loader = (Component: React.FC) => (props: any) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

// Pages
const Tasks = Loader(lazy(() => import("src/features/tasks/ui/views/Tasks")));
const Status404 = Loader(lazy(() => import("src/pages/404")));
const Login = Loader(lazy(() => import("src/features/users/views/Login")));

const RedirectIfUnauthorized = () => {
    const navigate = useNavigate();
    const user = useStore((state) => state.user);

    useEffect(() => {
        if (!user) navigate("/login");
        const unsubscribe = httpClient.subscribeToError((error) => {
            if (error.status === 401) {
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return null;
};

export const ApplicationRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SidebarLayout />}>
                    <Route path="" element={<Tasks />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Status404 />} />
            </Routes>
            <RedirectIfUnauthorized />
        </>
    );
};
