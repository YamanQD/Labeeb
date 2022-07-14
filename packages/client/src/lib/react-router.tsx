import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import SuspenseLoader from "src/components/SuspenseLoader";
import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import Admin from "src/pages/admin";

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

const RedirectIfUnauthorized = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // TODO: Check on initial load if the user is unauthenticated
        const unsubscribe = httpClient.subscribeToError((error) => {
            if (error.status == 401) {
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
                    <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="*" element={<Status404 />} />
            </Routes>
            <RedirectIfUnauthorized />
        </>
    );
};
