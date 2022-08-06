import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import localeAR from "../locales/ar.json";
import localeEN from "../locales/en.json";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources: {
        en: {
            translation: localeEN,
        },
        ar: {
            translation: localeAR,
        },
    },
    interpolation: {
        escapeValue: false,
    },
});
