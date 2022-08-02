import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "src/lib/react-query";
import "./i18";
import "./index.css";
import { ApplicationRoutes } from "./lib/react-router";
import ThemeProvider from "./theme/ThemeProvider";

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
