import { render } from "@testing-library/react-native";
import React from "react";

import Clock from "../Clock";

describe("<Clock />", () => {
  test("during the regular time", () => {
    const rendered = render(
      <Clock
        enabled={true}
        isAtHome={false}
        currentTime={{ hour: 12, minute: 30 }}
        curfewStart={{ hour: 21, minute: 0 }}
        curfewEnd={{ hour: 4, minute: 30 }}
        minutesToGoHome={15}
      />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  test("when it's time to go home", () => {
    const rendered = render(
      <Clock
        enabled={true}
        isAtHome={false}
        currentTime={{ hour: 20, minute: 50 }}
        curfewStart={{ hour: 21, minute: 0 }}
        curfewEnd={{ hour: 4, minute: 30 }}
        minutesToGoHome={15}
      />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  test("when curfew is active", () => {
    const rendered = render(
      <Clock
        enabled={true}
        isAtHome={false}
        currentTime={{ hour: 1, minute: 0 }}
        curfewStart={{ hour: 21, minute: 0 }}
        curfewEnd={{ hour: 4, minute: 30 }}
        minutesToGoHome={15}
      />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  test("when disabled", () => {
    const rendered = render(
      <Clock
        enabled={false}
        isAtHome={false}
        currentTime={{ hour: 1, minute: 0 }}
        curfewStart={{ hour: 21, minute: 0 }}
        curfewEnd={{ hour: 4, minute: 30 }}
        minutesToGoHome={15}
      />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
