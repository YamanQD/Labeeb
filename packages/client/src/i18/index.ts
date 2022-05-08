import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n.use(HttpBackend)
	.use(initReactI18next)
	.init({
		lng: "en",
		fallbackLng: "en",
		ns: ["app", "common"],
		defaultNS: "app",
		interpolation: {
			escapeValue: false,
		},
		backend: {
			// TODO: Should we keep this static or use env files?
			loadPath: "http://localhost:3000/locales/{{lng}}/{{ns}}.json",
		},
	});
