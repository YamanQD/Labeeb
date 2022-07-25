import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import LogoutButton from "src/components/Buttons/LogoutButton";
import SwitchLayoutButton from "src/components/Buttons/SwitchLayout";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import AdminSidebarMenu from "./Menu";

const AdminLayout = () => {
    return (
        <>
            <Sidebar
                menu={<AdminSidebarMenu />}
                buttons={
                    <>
                        <SwitchLayoutButton route="/">Go to client</SwitchLayoutButton>
                        <LogoutButton />
                    </>
                }
            ></Sidebar>
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
            </Box>
        </>
    );
};

export default AdminLayout;
