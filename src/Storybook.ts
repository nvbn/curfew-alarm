/* eslint-disable @typescript-eslint/no-var-requires */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configure, getStorybookUI } from "@storybook/react-native";

configure(() => {
  require("./initialisers/initI18n").default();

  // Import all stories here:
  require("./components/Clock/Clock.story");
  require("./components/SettingsButton/SettingsButton.story");
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage,
});

export default StorybookUIRoot;
