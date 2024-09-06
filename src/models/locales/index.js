//locales>index.js
import arStrings from "./ar/translation.json";
import enStrings from "./en/translation.json";
import arBook from "./ar/book.js";
import enBook from "./en/book.js";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

export default {
  ar: {
    translation: {
      ...arStrings,
      book: arBook,
    },
  },
  en: {
    translation: {
      ...enStrings,
      book: enBook,
    },
  },
};
