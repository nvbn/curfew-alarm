/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
import { render } from "@testing-library/react-native";
import React from "react";

import { makeConstantsAsOnDevice } from "../../../fakes/Constants";
import { makeNetworkAsOnWifi } from "../../../fakes/Network";
import { makeNotificationsWithBehavior } from "../../../fakes/Notifications";
import { makePersistentStorageWithDataAndBehavior } from "../../../fakes/PersistentStorage";
import { makePlatformAndroid, makePlatformIOS } from "../../../fakes/Plaftorm";
import Dependencies from "../../../initialisers/Dependencies";
import Home from "../Home";

describe("<Home />", () => {
  for (const platform of [makePlatformAndroid(), makePlatformIOS()]) {
    test(`can be rendered on ${platform}`, () => {
      const rendered = render(
        <Dependencies
          dateTime={() => new Date("2021-01-01T12:15:00 GMT")}
          persistentStorage={makePersistentStorageWithDataAndBehavior()}
          network={makeNetworkAsOnWifi()}
          notifications={makeNotificationsWithBehavior()}
          platform={platform}
          constants={makeConstantsAsOnDevice()}
        >
          <Home navigation={{ addListener: () => () => {} } as any} />
        </Dependencies>,
      );

      expect(rendered.toJSON()).toMatchSnapshot();
    });
  }
});
