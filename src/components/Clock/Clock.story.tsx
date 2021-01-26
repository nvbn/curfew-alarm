import { storiesOf } from "@storybook/react-native";
import React from "react";

import Clock from "./Clock";

storiesOf("<Clock />", module)
  .add("disabled", () => (
    <Clock
      enabled={false}
      isAtHome={true}
      currentTime={{ hour: 21, minute: 0 }}
      curfewStart={{ hour: 21, minute: 0 }}
      curfewEnd={{ hour: 3, minute: 30 }}
      minutesToGoHome={30}
    />
  ))
  .add("enabled at home during normal time", () => (
    <Clock
      enabled={true}
      isAtHome={true}
      currentTime={{ hour: 11, minute: 0 }}
      curfewStart={{ hour: 21, minute: 0 }}
      curfewEnd={{ hour: 3, minute: 30 }}
      minutesToGoHome={30}
    />
  ))
  .add("enabled at home during go home time", () => (
    <Clock
      enabled={true}
      isAtHome={true}
      currentTime={{ hour: 20, minute: 45 }}
      curfewStart={{ hour: 21, minute: 0 }}
      curfewEnd={{ hour: 3, minute: 30 }}
      minutesToGoHome={30}
    />
  ))
  .add("enabled at home during curfew time", () => (
    <Clock
      enabled={true}
      isAtHome={true}
      currentTime={{ hour: 21, minute: 45 }}
      curfewStart={{ hour: 21, minute: 0 }}
      curfewEnd={{ hour: 3, minute: 30 }}
      minutesToGoHome={30}
    />
  ))
  .add("enabled outside during go home time", () => (
    <Clock
      enabled={true}
      isAtHome={false}
      currentTime={{ hour: 20, minute: 45 }}
      curfewStart={{ hour: 21, minute: 0 }}
      curfewEnd={{ hour: 3, minute: 30 }}
      minutesToGoHome={30}
    />
  ))
  .add("enabled outside during curfew time", () => (
    <Clock
      enabled={true}
      isAtHome={false}
      currentTime={{ hour: 21, minute: 45 }}
      curfewStart={{ hour: 21, minute: 0 }}
      curfewEnd={{ hour: 3, minute: 30 }}
      minutesToGoHome={30}
    />
  ))
  .add(
    "enabled outside during go home time when curfew starts after midnight",
    () => (
      <Clock
        enabled={true}
        isAtHome={false}
        currentTime={{ hour: 12, minute: 5 }}
        curfewStart={{ hour: 12, minute: 30 }}
        curfewEnd={{ hour: 1, minute: 30 }}
        minutesToGoHome={45}
      />
    ),
  )
  .add(
    "enabled outside during curfew time when curfew starts after midnight",
    () => (
      <Clock
        enabled={true}
        isAtHome={false}
        currentTime={{ hour: 12, minute: 5 }}
        curfewStart={{ hour: 12, minute: 30 }}
        curfewEnd={{ hour: 1, minute: 30 }}
        minutesToGoHome={45}
      />
    ),
  );
