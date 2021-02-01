/* eslint-disable @typescript-eslint/no-empty-function */
import { render } from "@testing-library/react-native";
import React from "react";

import {
  PLATFORM_OS_ANDROID,
  PLATFORM_OS_IOS,
} from "../../../dependencies/IPlatform";
import SettingsForm from "../SettingsForm";
import { TypedItemProps } from "../types";

describe("<SettingsForm />", () => {
  for (const os of [PLATFORM_OS_ANDROID, PLATFORM_OS_IOS]) {
    test(`can be rendered on ${os}`, () => {
      const options: TypedItemProps[] = [
        {
          id: "curfew-start",
          title: "Curfew begins at:",
          type: "time",
          value: { hour: 25, minute: 17 },
          onChange: () => {},
        },
        {
          id: "go-home",
          title: "Go home minutes before:",
          type: "number",
          value: 24,
          onChange: () => {},
        },
      ];

      const rendered = render(<SettingsForm options={options} os={os} />);

      expect(rendered.toJSON()).toMatchSnapshot();
    });
  }
});
