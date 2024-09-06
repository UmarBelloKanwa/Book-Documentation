import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from './locales'; 

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ar',
    lng: 'ar', 
    resources: {...translations}, 
    supportedLngs: ['ar', 'en'], 
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
    debug: true, 
  });

export default i18n;
