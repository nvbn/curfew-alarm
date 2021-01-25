import { storiesOf } from "@storybook/react-native";
import React from "react";

import SettingsButton from "./SettingsButton";

storiesOf("<SettingsButton />", module).add("default", () => (
  <SettingsButton onPress={() => alert("pressed!")} />
));
