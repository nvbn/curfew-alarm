/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any */
import RNDateTimePicker, {
  AndroidNativeProps,
  IOSNativeProps,
} from "@react-native-community/datetimepicker";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { TextInput } from "react-native";

import {
  PLATFORM_OS_ANDROID,
  PLATFORM_OS_IOS,
} from "../../../dependencies/IPlatform";
import { FUTURE_NOT_READY } from "../../../utils/future";
import { timeToDate } from "../../../utils/time";
import TimeItem from "../TimeItem";

jest.mock("@react-native-community/datetimepicker", () => jest.fn());

(RNDateTimePicker as jest.Mock).mockImplementation(
  ({ testID, value, onChange }: IOSNativeProps | AndroidNativeProps) => (
    <TextInput
      testID={testID}
      value={value.toString()}
      onChangeText={(textValue) => onChange!({} as any, new Date(textValue))}
    />
  ),
);

describe("<TimeItem />", () => {
  for (const os of [PLATFORM_OS_ANDROID, PLATFORM_OS_IOS]) {
    test(`can be rendered on ${os}`, () => {
      const rendered = render(
        <TimeItem
          id="test"
          title="When it starts"
          type="time"
          value={{
            hour: 20,
            minute: 30,
          }}
          onChange={() => {}}
          os={os}
        />,
      );

      expect(rendered.toJSON()).toMatchSnapshot();
    });

    test(`can be rendered when not ready on ${os}`, () => {
      const rendered = render(
        <TimeItem
          id="test"
          title="When it starts"
          type="time"
          value={FUTURE_NOT_READY}
          onChange={() => {}}
          os={os}
        />,
      );

      expect(rendered.toJSON()).toMatchSnapshot();
    });
  }

  test("can change time on android", () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <TimeItem
        id="test"
        title="When it starts"
        type="time"
        value={{
          hour: 20,
          minute: 30,
        }}
        onChange={onChange}
        os={PLATFORM_OS_ANDROID}
      />,
    );

    const touchable = getByTestId("time-item-android-touchable-test");
    fireEvent.press(touchable);

    const timePicker = getByTestId("time-item-android-time-picker-test");
    const timestamp = timeToDate({ hour: 19, minute: 45 });
    fireEvent.changeText(timePicker, timestamp); // ugly mock event name

    expect(onChange.mock.calls).toEqual([[{ hour: 19, minute: 45 }]]);
  });

  test("can change time on ios", () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <TimeItem
        id="test"
        title="When it starts"
        type="time"
        value={{
          hour: 20,
          minute: 30,
        }}
        onChange={onChange}
        os={PLATFORM_OS_IOS}
      />,
    );

    const timePicker = getByTestId("time-item-ios-time-picker-test");
    const timestamp = timeToDate({ hour: 21, minute: 15 });
    fireEvent.changeText(timePicker, timestamp); // ugly mock event name

    expect(onChange.mock.calls).toEqual([[{ hour: 21, minute: 15 }]]);
  });
});
