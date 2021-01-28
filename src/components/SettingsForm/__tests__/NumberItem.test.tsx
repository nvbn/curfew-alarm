/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { FUTURE_NOT_READY } from "../../../utils/future";
import NumberItem from "../NumberItem";

describe("<NumberItem />", () => {
  test("can be rendered", () => {
    const rendered = render(
      <NumberItem
        id="test"
        title="Some number"
        type="number"
        value={42}
        onChange={() => {}}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  test("can be rendered when value is not ready", () => {
    const rendered = render(
      <NumberItem
        id="test"
        title="Some number"
        type="number"
        value={FUTURE_NOT_READY}
        onChange={() => {}}
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  test("fires onChange with changed number", () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <NumberItem
        id="test"
        title="Some number"
        type="number"
        value={42}
        onChange={onChange}
      />,
    );

    const input = getByTestId("number-item-input-test");
    fireEvent.changeText(input, 999);

    expect(onChange.mock.calls).toEqual([[999]]);
  });

  test("doesn't fire onChange with incorrect value", () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <NumberItem
        id="test"
        title="Some number"
        type="number"
        value={42}
        onChange={onChange}
      />,
    );

    const input = getByTestId("number-item-input-test");
    fireEvent.changeText(input, "cars and dogs");

    expect(onChange.mock.calls.length).toBe(0);
  });
});
