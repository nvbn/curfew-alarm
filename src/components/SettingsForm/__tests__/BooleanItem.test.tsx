/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { FUTURE_NOT_READY } from "../../../utils/future";
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

  test("can be rendered when value isn't ready", () => {
    const rendered = render(
      <BooleanItem
        id="test"
        title="Some toggle"
        type="boolean"
        value={FUTURE_NOT_READY}
        onChange={() => {}}
      />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  test("fires onChange when switch touched", () => {
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

  test("fires onChange when the whole item touched", () => {
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

    const toggle = getByTestId("boolean-item-touchable-test");
    fireEvent.press(toggle);

    expect(onChange.mock.calls).toEqual([[false]]);
  });
});
