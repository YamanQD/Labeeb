import { CssBaseline } from "@mui/material";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import { ApplicationRoutes } from "./lib/react-router";
import ThemeProvider from "./theme/ThemeProvider";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import "./lib/react-i18n";

const queryClient = new QueryClient();

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <CssBaseline />
                    <ApplicationRoutes />
                    <ToastContainer />
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
};
export default App;
