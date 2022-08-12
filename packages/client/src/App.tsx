import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "src/lib/react-query";
import MotivationModal from "./components/MotivationModal";
import "./index.css";
import "./lib/i18n";
import { ApplicationRoutes } from "./lib/router";
import ThemeProvider from "./theme/ThemeProvider";

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <CssBaseline />
                    <ApplicationRoutes />
                    <ToastContainer />
                    <MotivationModal />
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
};
export default App;
