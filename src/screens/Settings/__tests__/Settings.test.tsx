import { render } from "@testing-library/react-native";
import React from "react";

import { makeNotificationsWithBehavior } from "../../../fakes/Notifications";
import { makePersistentStorageWithDataAndBehavior } from "../../../fakes/PersistentStorage";
import { makePlatformAndroid, makePlatformIOS } from "../../../fakes/Plaftorm";
import Dependencies from "../../../initialisers/Dependencies";
import Settings from "../Settings";

describe("<Settings />", () => {
  for (const platform of [makePlatformAndroid(), makePlatformIOS()]) {
    test(`can be rendered on ${platform}`, () => {
      const rendered = render(
        <Dependencies
          persistentStorage={makePersistentStorageWithDataAndBehavior()}
          platform={platform}
          notifications={makeNotificationsWithBehavior()}
        >
          <Settings />
        </Dependencies>,
      );

      expect(rendered.toJSON()).toMatchSnapshot();
    });
  }
});
