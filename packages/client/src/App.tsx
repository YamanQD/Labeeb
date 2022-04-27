import "./index.css";
import { CssBaseline } from "@mui/material";
import { ApplicationRoutes } from "./router";
import ThemeProvider from "./theme/ThemeProvider";

const App = () => {
	return (
		<ThemeProvider>
			<CssBaseline />
			<ApplicationRoutes />
		</ThemeProvider>
	);
};
export default App;
