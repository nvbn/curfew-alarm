/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import ActionItem from "../ActionItem";

describe("<ActionItem />", () => {
  test("displays item when action hasn't been performed", () => {
    const rendered = render(
      <ActionItem
        id="test"
        title="Test action item"
        type="action"
        value={false}
        onChange={() => {}}
      />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  test("displays nothing when action has been performed", () => {
    const rendered = render(
      <ActionItem
        id="test"
        title="Test action item"
        type="action"
        value={true}
        onChange={() => {}}
      />,
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  test("trigger onChange on press", () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <ActionItem
        id="test"
        title="Test action item"
        type="action"
        value={false}
        onChange={onChange}
      />,
    );

    const touchable = getByTestId("action-item-touchable-test");
    fireEvent.press(touchable);

    expect(onChange.mock.calls.length).toBe(1);
  });
});
