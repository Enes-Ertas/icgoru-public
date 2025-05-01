// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import tr from "./locales/tr/translation.json";

i18n
  .use(LanguageDetector) // Tarayıcı dili algılasın
  .use(initReactI18next) // React ile entegre
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    fallbackLng: "en",
    detection: {
      // 1) localStorage içindeki “language” anahtarına bak
      // 2) yoksa navigator.language
      order: ["localStorage", "navigator"],
      // Hangi key’i kullanalım?
      lookupLocalStorage: "language",
      // Dili buraya yazalım ki sayfa yenilense de okunabilsin
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
