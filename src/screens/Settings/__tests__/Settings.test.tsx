import { render } from "@testing-library/react-native";
import React from "react";

import { NotificationsCtx } from "../../../dependencies/Notifications";
import { PersistentStorageCtx } from "../../../dependencies/PersistentStorage";
import { PlatformCtx } from "../../../dependencies/Platform";
import { makeNotificationsWithBehavior } from "../../../fakes/Notifications";
import { makePersistentStorageWithDataAndBehavior } from "../../../fakes/PersistentStorage";
import { makePlatformAndroid, makePlatformIOS } from "../../../fakes/Plaftorm";
import Settings from "../Settings";

describe("<Settings />", () => {
  for (const platform of [makePlatformAndroid(), makePlatformIOS()]) {
    test(`can be rendered on ${platform}`, () => {
      const rendered = render(
        <PersistentStorageCtx.Provider
          value={makePersistentStorageWithDataAndBehavior()}
        >
          <PlatformCtx.Provider value={platform}>
            <NotificationsCtx.Provider value={makeNotificationsWithBehavior()}>
              <Settings />
            </NotificationsCtx.Provider>
          </PlatformCtx.Provider>
        </PersistentStorageCtx.Provider>,
      );

      expect(rendered.toJSON()).toMatchSnapshot();
    });
  }
});
