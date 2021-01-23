import { render } from "@testing-library/react-native";
import React from "react";

import Notifications from "../../../contexts/Notifications";
import PersistentStorage from "../../../contexts/PersistentStorage";
import Platform from "../../../contexts/Platform";
import { makeNotificationsWithBehavior } from "../../../fakes/Notifications";
import { makePersistentStorageWithDataAndBehavior } from "../../../fakes/PersistentStorage";
import { makePlatformAndroid, makePlatformIOS } from "../../../fakes/Plaftorm";
import Settings from "../Settings";

describe("<Settings />", () => {
  for (const platform of [makePlatformAndroid(), makePlatformIOS()]) {
    test(`can be rendered on ${platform}`, () => {
      const rendered = render(
        <PersistentStorage.Provider
          value={makePersistentStorageWithDataAndBehavior()}
        >
          <Platform.Provider value={platform}>
            <Notifications.Provider value={makeNotificationsWithBehavior()}>
              <Settings />
            </Notifications.Provider>
          </Platform.Provider>
        </PersistentStorage.Provider>,
      );

      expect(rendered.toJSON()).toMatchSnapshot();
    });
  }
});
