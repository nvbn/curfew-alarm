/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import BooleanItem from "../BooleanItem";

describe("<BooleanItem />", () => {
  test("can be rendered", () => {
    const rendered = render(
      <BooleanItem
        id="test"
        title="Some toggle"
        type="boolean"
        value={false}
        onChange={() => {}}
      />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  test("fires onChange when touched", () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <BooleanItem
        id="test"
        title="Some toggle"
        type="boolean"
        value={true}
        onChange={onChange}
      />,
    );

    const toggle = getByTestId("boolean-item-switch-test");
    fireEvent(toggle, "valueChange", false);

    expect(onChange.mock.calls).toEqual([[false]]);
  });
});
