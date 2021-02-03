import { PropsWithChildren } from "react";

import { ConstantsCtx, ConstantsDefaultImpl } from "../dependencies/Constants";
import { DateTimeCtx, DateTimeDefaultImpl } from "../dependencies/DateTime";
import { NetworkCtx, NetworkDefaultImpl } from "../dependencies/Network";
import {
  NotificationsCtx,
  NotificationsDefaultImpl,
} from "../dependencies/Notifications";
import {
  PersistentStorageCtx,
  PersistentStorageDefaultImpl,
} from "../dependencies/PersistentStorage";
import { PlatformCtx, PlatformDefaultImpl } from "../dependencies/Platform";

const Dependencies = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => (
  <ConstantsCtx.Provider value={ConstantsDefaultImpl}>
    <DateTimeCtx.Provider value={DateTimeDefaultImpl}>
      <NetworkCtx.Provider value={NetworkDefaultImpl}>
        <NotificationsCtx.Provider value={NotificationsDefaultImpl}>
          <PersistentStorageCtx.Provider value={PersistentStorageDefaultImpl}>
            <PlatformCtx.Provider value={PlatformDefaultImpl}>
              {children}
            </PlatformCtx.Provider>
          </PersistentStorageCtx.Provider>
        </NotificationsCtx.Provider>
      </NetworkCtx.Provider>
    </DateTimeCtx.Provider>
  </ConstantsCtx.Provider>
);
export default Dependencies;
