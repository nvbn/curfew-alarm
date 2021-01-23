import { render } from "@testing-library/react-native";
import React from "react";

import SettingsButton from "../SettingsButton";

describe("<SettingsButton />", () => {
  test("can be rendered", () => {
    const rendered = render(<SettingsButton onPress={jest.fn()} />);

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
