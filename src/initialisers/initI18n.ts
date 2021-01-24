import * as Localization from "expo-localization";
import i18n from "i18n-js";

import translations from "../translations";

/**
 * Initialises translations.
 */
const initI18n = (): void => {
  i18n.translations = translations;
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
};

export default initI18n;
