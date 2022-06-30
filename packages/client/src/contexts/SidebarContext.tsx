import { createContext, useState } from "react";
type SidebarContextType = {
	isSidebarVisible: boolean;
	toggleSidebar: () => void;
};

interface WrapperProps {
	children: React.ReactNode;
}

const defaultConfig = { isSidebarVisible: false, toggleSidebar: () => {} };
export const SidebarContext = createContext<SidebarContextType>(defaultConfig);

const SidebarProvider = ({ children }: WrapperProps) => {
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

export default SidebarProvider;