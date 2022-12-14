import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

const ClientLayout = Loader(lazy(() => import("src/components/layouts/Client")));
const Tasks = Loader(lazy(() => import("src/features/tasks/ui/views/Tasks")));
const Status404 = Loader(lazy(() => import("src/pages/404")));
const Login = Loader(lazy(() => import("src/features/users/ui/Login")));

// Admin pages
const AdminLayout = Loader(lazy(() => import("src/components/layouts/Admin")));

const AdminLayoutPlaceholder = Loader(
    lazy(() => import("src/components/layouts/Admin/Placeholder"))
);

const Users = Loader(lazy(() => import("src/features/users/ui/admin/Users")));
const CreateUser = Loader(lazy(() => import("src/features/users/ui/admin/CreateUser")));
const EditUser = Loader(lazy(() => import("src/features/users/ui/admin/EditUser")));

const Projects = Loader(lazy(() => import("src/features/projects/ui/admin/Projects")));
const CreateProject = Loader(lazy(() => import("src/features/projects/ui/admin/CreateProject")));
const EditProject = Loader(lazy(() => import("src/features/projects/ui/admin/EditProject")));

const Lists = Loader(lazy(() => import("src/features/lists/ui/admin/Lists")));
const CreateList = Loader(lazy(() => import("src/features/lists/ui/admin/CreateList")));
const EditList = Loader(lazy(() => import("src/features/lists/ui/admin/EditList")));

const HandleAPIErrors = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = httpClient.subscribeToError((error) => {
            if (error.status === 401) {
                navigate("/login");
            }

            const errorMessage =
                typeof error.messages === "string" ? error.messages : error.messages[0];

            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
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
                    <Route index element={<Tasks />} />
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
                    <Route index element={<AdminLayoutPlaceholder />} />
                    <Route
                        path="users"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ABOVE_PM"}>
                                <Users />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="users/create"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ABOVE_PM"}>
                                <CreateUser />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="users/edit/:userId"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ABOVE_PM"}>
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
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ABOVE_PM"}>
                                <CreateProject />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="projects/edit/:id"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ONLY"}>
                                <EditProject />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="lists"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ONLY"}>
                                <Lists />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="lists/create"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ONLY"}>
                                <CreateList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="lists/edit/:id"
                        element={
                            <ProtectedRoute peopleWhoCanAccess={"ADMINS_ONLY"}>
                                <EditList />
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
