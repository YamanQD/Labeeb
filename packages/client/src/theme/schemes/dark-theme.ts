import { alpha, createTheme, darken } from "@mui/material";
import { commonOptions } from "./common";

const themeColors = {
    primary: "#8C7CF0",
    secondary: "#9EA4C1",
    success: "#44D600",
    warning: "#FFA319",
    error: "#FF1943",
    info: "#33C2FF",
    black: "#CBCCD2",
    white: "#111633",
    primaryAlt: "#111633",
    trueWhite: "#ffffff",
};

const colors = {
    gradients: {
        blue1: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
        blue2: "linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)",
        blue3: "linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%)",
        orange1: "linear-gradient(135deg, #FCCF31 0%, #F55555 100%)",
        orange2: "linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)",
        purple1: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
        pink1: "linear-gradient(135deg, #F6CEEC 0%, #D939CD 100%)",
        pink2: "linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)",
        green1: "linear-gradient(135deg, #FFF720 0%, #3CD500 100%)",
        black1: "linear-gradient(100.66deg, #2B304D 6.56%, #444A6B 93.57%)",
    },
    shadows: {
        success: "0px 1px 4px rgba(68, 214, 0, 0.25), 0px 3px 12px 2px rgba(68, 214, 0, 0.35)",
        error: "0px 1px 4px rgba(255, 25, 67, 0.25), 0px 3px 12px 2px rgba(255, 25, 67, 0.35)",
        info: "0px 1px 4px rgba(51, 194, 255, 0.25), 0px 3px 12px 2px rgba(51, 194, 255, 0.35)",
        primary: "0px 1px 4px rgba(112, 99, 192, 0.25), 0px 3px 12px 2px rgba(112, 99, 192, 0.35)",
        warning: "0px 1px 4px rgba(255, 163, 25, 0.25), 0px 3px 12px 2px rgba(255, 163, 25, 0.35)",
        card: "0px 0px 2px #6A7199",
        cardSm: "0px 0px 2px #6A7199",
        cardLg: "0 0rem 14rem 0 rgb(255 255 255 / 20%), 0 0.8rem 2.3rem rgb(111 130 156 / 3%), 0 0.2rem 0.7rem rgb(17 29 57 / 15%)",
    },
    layout: {
        general: {
            bodyBg: "#070C27",
        },
        sidebar: {
            background: themeColors.primaryAlt,
            textColor: themeColors.secondary,
            dividerBg: "#272C48",
            menuItemColor: "#9EA4C1",
            menuItemColorActive: "#ffffff",
            menuItemBg: "transparent",
            menuItemBgActive: "rgba(43, 48, 77, .6)",
            menuItemHeadingColor: darken(themeColors.secondary, 0.3),
        },
    },
    alpha: {
        white: {
            5: alpha(themeColors.white, 0.02),
            10: alpha(themeColors.white, 0.1),
            30: alpha(themeColors.white, 0.3),
            50: alpha(themeColors.white, 0.5),
            70: alpha(themeColors.white, 0.7),
            100: themeColors.white,
        },
        trueWhite: {
            5: alpha(themeColors.trueWhite, 0.02),
            10: alpha(themeColors.trueWhite, 0.1),
            30: alpha(themeColors.trueWhite, 0.3),
            50: alpha(themeColors.trueWhite, 0.5),
            70: alpha(themeColors.trueWhite, 0.7),
            100: themeColors.trueWhite,
        },
        black: {
            5: alpha(themeColors.black, 0.02),
            10: alpha(themeColors.black, 0.1),
            30: alpha(themeColors.black, 0.3),
            50: alpha(themeColors.black, 0.5),
            70: alpha(themeColors.black, 0.7),
            100: themeColors.black,
        },
    },
    secondary: {
        lighter: alpha(themeColors.secondary, 0.85),
        light: alpha(themeColors.secondary, 0.3),
        main: themeColors.secondary,
        dark: darken(themeColors.secondary, 0.2),
    },
    primary: {
        lighter: alpha(themeColors.primary, 0.85),
        light: alpha(themeColors.primary, 0.3),
        main: themeColors.primary,
        dark: darken(themeColors.primary, 0.2),
    },
    success: {
        lighter: alpha(themeColors.success, 0.85),
        light: alpha(themeColors.success, 0.3),
        main: themeColors.success,
        dark: darken(themeColors.success, 0.2),
    },
    warning: {
        lighter: alpha(themeColors.warning, 0.85),
        light: alpha(themeColors.warning, 0.3),
        main: themeColors.warning,
        dark: darken(themeColors.warning, 0.2),
    },
    error: {
        lighter: alpha(themeColors.error, 0.85),
        light: alpha(themeColors.error, 0.3),
        main: themeColors.error,
        dark: darken(themeColors.error, 0.2),
    },
    info: {
        lighter: alpha(themeColors.info, 0.85),
        light: alpha(themeColors.info, 0.3),
        main: themeColors.info,
        dark: darken(themeColors.info, 0.2),
    },
};

export const DarkTheme = createTheme({
    // direction: i18n.dir(),
    ...commonOptions,
    general: {
        borderRadiusSm: "4px",
        borderRadius: "6px",
        borderRadiusLg: "10px",
        borderRadiusXl: "18px",
    },
    sidebar: {
        background: colors.layout.sidebar.background,
        textColor: colors.layout.sidebar.textColor,
        dividerBg: colors.layout.sidebar.dividerBg,
        menuItemColor: colors.layout.sidebar.menuItemColor,
        menuItemColorActive: colors.layout.sidebar.menuItemColorActive,
        menuItemBg: colors.layout.sidebar.menuItemBg,
        menuItemBgActive: colors.layout.sidebar.menuItemBgActive,
        menuItemHeadingColor: colors.layout.sidebar.menuItemHeadingColor,
        boxShadow: "1px 0 0 #272C48",
        width: "280px",
    },
    header: {
        background: themeColors.primaryAlt,
        boxShadow: "0px 1px 0px #272C48",
        textColor: colors.secondary.main,
    },
    spacing: 8,
    palette: {
        common: {
            black: colors.alpha.black[100],
            white: colors.alpha.white[100],
        },
        mode: "dark",
        primary: {
            light: colors.primary.light,
            main: colors.primary.main,
            dark: colors.primary.dark,
        },
        secondary: {
            light: colors.secondary.light,
            main: colors.secondary.main,
            dark: colors.secondary.dark,
        },
        error: {
            light: colors.error.light,
            main: colors.error.main,
            dark: colors.error.dark,
            contrastText: themeColors.trueWhite,
        },
        success: {
            light: colors.success.light,
            main: colors.success.main,
            dark: colors.success.dark,
            contrastText: themeColors.trueWhite,
        },
        info: {
            light: colors.info.light,
            main: colors.info.main,
            dark: colors.info.dark,
            contrastText: themeColors.trueWhite,
        },
        warning: {
            light: colors.warning.light,
            main: colors.warning.main,
            dark: colors.warning.dark,
            contrastText: themeColors.trueWhite,
        },
        grey: {
            50: "#FBFBFB",
            100: "#F3F5F6",
            200: "#E8EAED",
            300: "#DCE0E5",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
            A100: "#d5d5d5",
            A200: "#aaaaaa",
            A400: "#303030",
            A700: "#616161",
        },
        text: {
            primary: colors.alpha.black[100],
            secondary: colors.alpha.black[70],
            disabled: colors.alpha.black[50],
        },
        background: {
            paper: colors.alpha.white[100],
            default: colors.layout.general.bodyBg,
        },
        action: {
            active: colors.alpha.black[100],
            hover: colors.primary.lighter,
            hoverOpacity: 0.1,
            selected: colors.alpha.black[10],
            selectedOpacity: 0.1,
            disabled: colors.alpha.black[50],
            disabledBackground: colors.alpha.black[5],
            disabledOpacity: 0.38,
            focus: colors.alpha.black[10],
            focusOpacity: 0.05,
            activatedOpacity: 0.12,
        },
    },

    typography: {
        fontFamily: [
            '"Poppins"',
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
        ].join(","),
        fontSize: 16,
        h1: {
            fontWeight: 700,
            fontSize: 30,
        },
        h2: {
            fontWeight: 700,
            fontSize: 25,
        },
        h3: {
            fontWeight: 700,
            fontSize: 21,
            lineHeight: 1.4,
            color: colors.alpha.black[100],
        },
        h4: {
            fontWeight: 700,
            fontSize: 16,
        },
        h5: {
            fontWeight: 700,
            fontSize: 14,
        },
        h6: {
            fontSize: 15,
        },
        body1: {
            fontSize: 16,
        },
        body2: {
            fontSize: 14,
        },
        button: {
            fontSize: 14,
            fontWeight: 700,
        },
        caption: {
            fontSize: 13,
            textTransform: "uppercase",
            color: colors.alpha.black[50],
        },
        subtitle1: {
            fontSize: 14,
            color: colors.alpha.black[70],
        },
        subtitle2: {
            fontWeight: 400,
            fontSize: 15,
            color: colors.alpha.black[70],
        },
        overline: {
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
        },
    },
});
