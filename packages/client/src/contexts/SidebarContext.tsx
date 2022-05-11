import { createContext, useState } from "react";
type SidebarContextType = {
	isSidebarVisible: boolean;
	toggleSidebar: () => void;
};

interface WrapperProps {
	children: React.ReactNode;
}

const config = { isSidebarVisible: false, toggleSidebar: () => {} };
export const SidebarContext = createContext<SidebarContextType>(config);

export const SidebarProvider = ({ children }: WrapperProps) => {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const toggleSidebar = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};

	return (
		<SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
};
