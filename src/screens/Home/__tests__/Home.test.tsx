/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
import { render } from "@testing-library/react-native";
import React from "react";

import { ConstantsCtx } from "../../../dependencies/Constants";
import { DateTimeCtx } from "../../../dependencies/DateTime";
import { NetworkCtx } from "../../../dependencies/Network";
import { NotificationsCtx } from "../../../dependencies/Notifications";
import { PersistentStorageCtx } from "../../../dependencies/PersistentStorage";
import { PlatformCtx } from "../../../dependencies/Platform";
import { makeConstantsAsOnDevice } from "../../../fakes/Constants";
import { makeNetworkAsOnWifi } from "../../../fakes/Network";
import { makeNotificationsWithBehavior } from "../../../fakes/Notifications";
import { makePersistentStorageWithDataAndBehavior } from "../../../fakes/PersistentStorage";
import { makePlatformAndroid, makePlatformIOS } from "../../../fakes/Plaftorm";
import Home from "../Home";

describe("<Home />", () => {
  for (const platform of [makePlatformAndroid(), makePlatformIOS()]) {
    test(`can be rendered on ${platform}`, () => {
      const rendered = render(
        <DateTimeCtx.Provider value={() => new Date("2021-01-01T12:15:00 GMT")}>
          <PersistentStorageCtx.Provider
            value={makePersistentStorageWithDataAndBehavior()}
          >
            <NetworkCtx.Provider value={makeNetworkAsOnWifi()}>
              <NotificationsCtx.Provider
                value={makeNotificationsWithBehavior()}
              >
                <PlatformCtx.Provider value={platform}>
                  <ConstantsCtx.Provider value={makeConstantsAsOnDevice()}>
                    <Home navigation={{ addListener: () => () => {} } as any} />
                  </ConstantsCtx.Provider>
                </PlatformCtx.Provider>
              </NotificationsCtx.Provider>
            </NetworkCtx.Provider>
          </PersistentStorageCtx.Provider>
        </DateTimeCtx.Provider>,
      );

      expect(rendered.toJSON()).toMatchSnapshot();
    });
  }
});
