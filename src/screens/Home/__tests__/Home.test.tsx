/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
import { render } from "@testing-library/react-native";
import React from "react";

import Constants from "../../../contexts/Constants";
import DateTime from "../../../contexts/DateTime";
import Network from "../../../contexts/Network";
import PersistentStorage from "../../../contexts/PersistentStorage";
import Platform from "../../../contexts/Platform";
import { makeConstantsAsOnDevice } from "../../../fakes/Constants";
import { makeNetworkAsOnWifi } from "../../../fakes/Network";
import { makePersistentStorageWithDataAndBehavior } from "../../../fakes/PersistentStorage";
import { makePlatformAndroid, makePlatformIOS } from "../../../fakes/Plaftorm";
import Home from "../Home";

describe("<Home />", () => {
  for (const platform of [makePlatformAndroid(), makePlatformIOS()]) {
    test(`can be rendered on ${platform}`, () => {
      const rendered = render(
        <DateTime.Provider value={() => new Date("2021-01-01T12:15:00 GMT")}>
          <PersistentStorage.Provider
            value={makePersistentStorageWithDataAndBehavior()}
          >
            <Network.Provider value={makeNetworkAsOnWifi()}>
              <Platform.Provider value={platform}>
                <Constants.Provider value={makeConstantsAsOnDevice()}>
                  <Home navigation={{ addListener: () => () => {} } as any} />
                </Constants.Provider>
              </Platform.Provider>
            </Network.Provider>
          </PersistentStorage.Provider>
        </DateTime.Provider>,
      );

      expect(rendered.toJSON()).toMatchSnapshot();
    });
  }
});
