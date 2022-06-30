import { BrowserRouter } from "react-router-dom";
import { ApplicationRoutes } from "./router";

import { CssBaseline } from "@mui/material";
import "./index.css";
import "nprogress/nprogress.css";

import "./i18";
import SidebarProvider from "./contexts/SidebarContext";
import ThemeProvider from "./theme/ThemeProvider";

import { QueryClientProvider } from "react-query";
import { queryClient } from "src/lib/react-query";

const App = () => {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>
                        <CssBaseline />
                        <ApplicationRoutes />
                    </ThemeProvider>
                </QueryClientProvider>
            </SidebarProvider>
        </BrowserRouter>
    );
};
export default App;
