import { createContext, useState } from "react";
import { WrapperProps } from "src/utils/wrapperProps";

type SidebarContextType = {
    isSidebarVisible: boolean;
    toggleSidebar: () => void;
};

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
