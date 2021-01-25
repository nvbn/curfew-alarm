import { storiesOf } from "@storybook/react-native";
import React from "react";
import { Platform } from "react-native";

import { formatTime, Time } from "../../utils/time";
import SettingsForm from "./SettingsForm";

storiesOf("<SettingsForm />", module)
  .add("boolean true, time and action", () => (
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
        {
          id: "action",
          title: "action",
          type: "action",
          value: false,
          onChange: () => alert("action is triggered"),
        },
      ]}
      os={Platform.OS}
    />
  ))
  .add("boolean false, time and already enabled action", () => (
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
        {
          id: "action",
          title: "action",
          type: "action",
          value: true,
          onChange: () => alert("action is triggered"),
        },
      ]}
      os={Platform.OS}
    />
  ));
