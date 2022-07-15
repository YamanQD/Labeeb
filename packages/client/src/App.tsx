import { BrowserRouter } from "react-router-dom";
import { ApplicationRoutes } from "./lib/react-router";

import { CssBaseline } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

import SidebarProvider from "./contexts/SidebarContext";
import ThemeProvider from "./theme/ThemeProvider";
import "./i18";

import { QueryClientProvider } from "react-query";
import { queryClient } from "src/lib/react-query";

import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>
                        <CssBaseline />
                        <ApplicationRoutes />
                        <ToastContainer />
                    </ThemeProvider>
                </QueryClientProvider>
            </SidebarProvider>
        </BrowserRouter>
    );
};
export default App;
