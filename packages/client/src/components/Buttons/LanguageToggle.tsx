import { Button, Tooltip } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "src/theme/ThemeProvider";

const LanguageToggle = () => {
    const { t, i18n } = useTranslation();
    const { toggleDirection, direction } = useContext(ThemeContext);

    // This should be the opposite of the current language
    const locale = direction === "ltr" ? "ar" : "en";
    const language = t(`lang.${locale}`);

    return (
        <Tooltip arrow title={t("actions.switch_language")}>
            <Button
                color="primary"
                onClick={() => {
                    toggleDirection(direction === "ltr" ? "rtl" : "ltr");
                    i18n.changeLanguage(locale);
                }}
            >
                {language}
            </Button>
        </Tooltip>
    );
};

export default LanguageToggle;
