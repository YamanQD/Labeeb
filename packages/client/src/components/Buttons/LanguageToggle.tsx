import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import { Button, Tooltip } from "@mui/material";

import { ThemeContext } from "src/theme/ThemeProvider";

const LanguageToggle = () => {
    const { t, i18n } = useTranslation();
    const { toggleDirection, direction } = useContext(ThemeContext);

    // This should be the opposite of the current language
    const locale = direction === "ltr" ? "ar" : "en";
    const language = t(`lang.${locale}`);

    const toggleLocale = useCallback(() => {
        toggleDirection(direction === "ltr" ? "rtl" : "ltr");
        i18n.changeLanguage(locale);
        localStorage.setItem('lang', locale);
    }, [i18n, direction, toggleDirection, locale]);

    return (
        <Tooltip arrow title={t("actions.switch_language")}>
            <Button
                color="primary"
                onClick={toggleLocale}
            >
                {language}
            </Button>
        </Tooltip>
    );
};

export default LanguageToggle;
