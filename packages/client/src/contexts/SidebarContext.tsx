import { createContext, useState } from "react";
type SidebarContextType = {
	isSidebarVisible: boolean;
	toggleSidebar: () => void;
};

const config = { isSidebarVisible: false, toggleSidebar: () => {} };
export const SidebarContext = createContext<SidebarContextType>(config);

export const SidebarProvider = ({ children }) => {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const toggleSidebar = () => {
		console.log("nigga");
		setIsSidebarVisible(!isSidebarVisible);
	};

	return (
		<SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
};
