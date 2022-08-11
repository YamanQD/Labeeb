import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminLayout from "src/components/layouts/Admin";
import ClientLayout from "src/components/layouts/Client";
import SuspenseLoader from "src/components/SuspenseLoader";
import { HTTPClient } from "src/lib/http/httpClient";
import ProtectedRoute from "./ProtectedRoute";
import { toast } from "react-toastify";

const httpClient = HTTPClient.getInstance();

const Loader = (Component: React.FC) => (props: any) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

const Tasks = Loader(lazy(() => import("src/features/tasks/ui/views/Tasks")));
const Status404 = Loader(lazy(() => import("src/pages/404")));
const Login = Loader(lazy(() => import("src/features/users/ui/Login")));

// Admin pages
const Users = Loader(lazy(() => import("src/features/users/ui/admin/Users")));
const CreateUser = Loader(lazy(() => import("src/features/users/ui/admin/CreateUser")));
const EditUser = Loader(lazy(() => import("src/features/users/ui/admin/EditUser")));

const Projects = Loader(lazy(() => import("src/features/projects/ui/admin/Projects")));
const CreateProject = Loader(lazy(() => import("src/features/projects/ui/admin/CreateProject")));

const HandleAPIErrors = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = httpClient.subscribeToError((error) => {
            if (error.status === 401) {
                navigate("/login");
            }

            toast.error(error.messages[0], {
                position: toast.POSITION.BOTTOM_LEFT
            })
        });

        return () => unsubscribe();
    }, [navigate]);

    return null;
};

export const ApplicationRoutes = () => {
    return (
        <>
            <Routes>
                {/* Client */}
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

                {/* Admin` */}
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

                    <Route
                        path="users/edit/:userId"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ONLY"}>
                                <EditUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="projects"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ONLY"}>
                                <Projects />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="projects/create"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ONLY"}>
                                <CreateProject />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Status404 />} />
            </Routes>
            <HandleAPIErrors />
        </>
    );
};
