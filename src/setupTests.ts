import i18n from "i18n-js";

import translations from "./translations";

i18n.locale = "en";
i18n.translations = translations;

// The actual mock isn't used, but without it it will be impossible to import the package
jest.mock("@react-native-async-storage/async-storage", () => ({}));
