import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import LogoutButton from "src/components/Buttons/LogoutButton";
import SwitchLayoutButton from "src/components/Buttons/SwitchLayout";
import { useStore } from "src/lib/store";
import { canUserAccessAdminPanel } from "src/features/users/domain/user";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import ClientSidebarMenu from "./Menu";

const ClientLayout = () => {
    const { t } = useTranslation();
    const user = useStore((state) => state.userProfile);

    return (
        <>
            <Sidebar
                menu={<ClientSidebarMenu />}
                buttons={
                    <>
                        {canUserAccessAdminPanel(user) && (
                            <SwitchLayoutButton route="/admin">
                                {t("actions.switch_to_admin")}
                            </SwitchLayoutButton>
                        )}
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

                <Box sx={{ overflow: "auto", flex: "1 1 auto", p: 4 }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default ClientLayout;
