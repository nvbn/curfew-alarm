import { render } from "@testing-library/react-native";
import React from "react";
import Arc from "../Arc";

describe("<Arc />", () => {
  test("10pt red arc from 12:00 to 14:45", () => {
    const rendered = render(
      <Arc
        startMinute={12 * 60}
        endMinute={14 * 60 + 45}
        color="red"
        width={10}
        cx={0}
        cy={0}
        r={10}
      />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  test("15pt cyan arc from 21:00 to 04:30", () => {
    const rendered = render(
      <Arc
        startMinute={21 * 60}
        endMinute={4 * 60 + 30}
        color="cyan"
        width={15}
        cx={10}
        cy={10}
        r={15}
      />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
