import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import AdminLayout from "src/components/layouts/Admin";
import ClientLayout from "src/components/layouts/Client";
import SuspenseLoader from "src/components/SuspenseLoader";
import { HTTPClient } from "src/lib/http/httpClient";

import ProtectedRoute from "./ProtectedRoute";

const httpClient = HTTPClient.getInstance();

const Loader = (Component: React.FC) => (props: any) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

const Tasks = Loader(lazy(() => import("src/features/tasks/ui/views/Tasks")));
const Status404 = Loader(lazy(() => import("src/pages/404")));
const Login = Loader(lazy(() => import("src/features/users/views/Login")));

// Admin pages
const Users = Loader(lazy(() => import("src/features/users/views/admin/Users")));
const CreateUser = Loader(lazy(() => import("src/features/users/views/admin/CreateUser")));

const RedirectToLoginOnAPIError = () => {
    const navigate = useNavigate();

    useEffect(() => {
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
                <Route
                    path="/"
                    element={
                        <ProtectedRoute peopleWhoCanAccess="ALL_USERS">
                            <ClientLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="projects" element={<Tasks />} />
                    <Route path="projects/:projectId" element={<Tasks />} />
                    <Route path="projects/:projectId/lists/:listId" element={<Tasks />} />
                </Route>

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute peopleWhoCanAccess={"ADMINS_ONLY"}>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="users"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ONLY"}>
                                <Users />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="users/create"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ONLY"}>
                                <CreateUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="projects" />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Status404 />} />
            </Routes>
            <RedirectToLoginOnAPIError />
        </>
    );
};
