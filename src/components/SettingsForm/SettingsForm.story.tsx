import { storiesOf } from "@storybook/react-native";
import React from "react";
import { Platform } from "react-native";

import { formatTime, Time } from "../../utils/time";
import SettingsForm from "./SettingsForm";

storiesOf("<SettingsForm />", module)
  .add("boolean true and time", () => (
    <SettingsForm
      options={[
        {
          id: "boolean",
          title: "boolean",
          type: "boolean",
          value: true,
          onChange: (enabled: boolean) => alert(`boolean is ${enabled}`),
        },
        {
          id: "time",
          title: "time",
          type: "time",
          value: { hour: 20, minute: 45 },
          onChange: (time: Time) => alert(`time is ${formatTime(time)}`),
        },
      ]}
      os={Platform.OS}
    />
  ))
  .add("boolean false and time", () => (
    <SettingsForm
      options={[
        {
          id: "boolean",
          title: "boolean",
          type: "boolean",
          value: false,
          onChange: (enabled: boolean) => alert(`boolean is ${enabled}`),
        },
        {
          id: "time",
          title: "time",
          type: "time",
          value: { hour: 20, minute: 45 },
          onChange: (time: Time) => alert(`time is ${formatTime(time)}`),
        },
      ]}
      os={Platform.OS}
    />
  ));
