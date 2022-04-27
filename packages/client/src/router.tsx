import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SuspenseLoader from "src/components/SuspenseLoader";
import SidebarLayout from "src/layouts/SidebarLayout";

const Loader = (Component: React.FC) => (props: any) =>
	(
		<Suspense fallback={<SuspenseLoader />}>
			<Component {...props} />
		</Suspense>
	);

// Pages
const Tasks = Loader(lazy(() => import("src/pages/tasks")));
const Status404 = Loader(lazy(() => import("src/pages/404")));

export const ApplicationRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<SidebarLayout />}>
				<Route path="tasks" element={<Tasks />} />
			</Route>
			<Route path="*" element={<Status404 />} />
		</Routes>
	);
};
