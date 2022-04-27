import "nprogress/nprogress.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SidebarProvider } from "./contexts/SidebarContext";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<SidebarProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</SidebarProvider>
);
