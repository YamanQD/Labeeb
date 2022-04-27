import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const SidebarLayout = () => {
	return (
		<>
			<Sidebar />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					flex: "1 1 auto",
					height: "100%",
				}}
			>
				<Header />

				<Box sx={{ overflow: "auto", flex: "1 1 auto" }}>
					<Outlet />
				</Box>

				<Footer />
			</Box>
		</>
	);
};

export default SidebarLayout;
