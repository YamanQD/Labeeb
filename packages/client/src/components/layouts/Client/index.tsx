import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import LogoutButton from "src/components/Buttons/LogoutButton";
import SwitchLayoutButton from "src/components/Buttons/SwitchLayout";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import ClientSidebarMenu from "./Menu";

const ClientLayout = () => {
    return (
        <>
            <Sidebar
                menu={<ClientSidebarMenu />}
                buttons={
                    <>
                        <SwitchLayoutButton route="/admin">Go to admin</SwitchLayoutButton>
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

export default ClientLayout;
