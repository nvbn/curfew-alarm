import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorybookUI, configure } from "@storybook/react-native";

configure(() => {
  require("../src/initialisers/initI18n").default();
  require("./stories");
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage,
});

export default StorybookUIRoot;
