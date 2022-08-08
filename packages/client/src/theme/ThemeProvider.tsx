import React, { useCallback, useEffect, useMemo, useState } from "react";
import rtlPlugin from "stylis-plugin-rtl";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import { ThemeProvider as MUIThemeProvider } from "@mui/material";

import { WrapperProps } from "src/utils/wrapperProps";

import { themeCreator } from "./base";
import { AvailableThemes } from "./schemes";

type ThemeDirection = "ltr" | "rtl";

interface ThemeContextValue {
    toggleTheme: (themeName: AvailableThemes) => void;
    toggleDirection: (direction: ThemeDirection) => void;
    theme: AvailableThemes;
    direction: ThemeDirection;
}

const getCurrentThemeName = () => (localStorage.getItem("appTheme") || "light") as AvailableThemes;

export const ThemeContext = React.createContext({} as ThemeContextValue);

const RTLCache = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
});
const LTRCache = createCache({
    key: "css",
});

const ThemeProviderWrapper = ({ children }: WrapperProps) => {
    const [theme, setTheme] = useState(getCurrentThemeName());
    const [direction, setDirection] = useState<ThemeDirection>("ltr");

    const emotionCache = useMemo(() => {
        return direction === "rtl" ? RTLCache : LTRCache;
    }, [direction]);

    const toggleTheme = useCallback((name: AvailableThemes) => {
        localStorage.setItem("appTheme", name);
        setTheme(name);
    }, []);

    const toggleDirection = useCallback((direction: ThemeDirection) => {
        setDirection(direction);
    }, []);

    useEffect(() => {
        document.documentElement.dir = direction;
    }, [direction]);

    const MUITheme = useMemo(() => {
        return themeCreator(theme);
    }, [theme]);

    MUITheme.direction = direction;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeContext.Provider
                value={{
                    toggleTheme,
                    toggleDirection,
                    theme,
                    direction,
                }}
            >
                <MUIThemeProvider theme={MUITheme}>{children}</MUIThemeProvider>
            </ThemeContext.Provider>
        </CacheProvider>
    );
};

export default ThemeProviderWrapper;
