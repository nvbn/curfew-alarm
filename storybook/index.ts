import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getStorybookUI,
  configure,
  addDecorator,
} from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import "./rn-addons";

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  require("../src/initialisers/initI18n").default();
  require("./stories");
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage,
});

export default StorybookUIRoot;
