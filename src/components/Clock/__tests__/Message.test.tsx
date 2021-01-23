import { render } from "@testing-library/react-native";
import React from "react";

import {
  Status,
  STATUS_FINE,
  STATUS_GO_HOME_WHEN_CURFEW,
  STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME,
  STATUS_STAY_AT_HOME_WHEN_CURFEW,
  STATUS_STAY_AT_HOME_WHEN_TIME_TO_GO_HOME,
} from "../../../utils/status";
import Message from "../Message";

describe("<Message />", () => {
  for (const status of [
    STATUS_FINE,
    STATUS_GO_HOME_WHEN_CURFEW,
    STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME,
    STATUS_STAY_AT_HOME_WHEN_CURFEW,
    STATUS_STAY_AT_HOME_WHEN_TIME_TO_GO_HOME,
  ] as Status[]) {
    test(`when ${status}`, () => {
      const rendered = render(<Message status={status} />);

      expect(rendered.toJSON()).toMatchSnapshot();
    });
  }
});
