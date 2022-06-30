import { BrowserRouter } from "react-router-dom";
import { ApplicationRoutes } from "./router";

import { CssBaseline } from "@mui/material";
import "./index.css";
import "nprogress/nprogress.css";

import "./i18";
import SidebarProvider from "./contexts/SidebarContext";
import ThemeProvider from "./theme/ThemeProvider";

const App = () => {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <ThemeProvider>
                    <CssBaseline />
                    <ApplicationRoutes />
                </ThemeProvider>
            </SidebarProvider>
        </BrowserRouter>
    );
};
export default App;
