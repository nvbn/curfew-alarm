import React, { PropsWithChildren } from "react";

import {
  ConstantsCtx,
  ConstantsDefaultImpl,
  IConstants,
} from "../dependencies/Constants";
import {
  DateTimeCtx,
  DateTimeDefaultImpl,
  IDateTime,
} from "../dependencies/DateTime";
import {
  INetwork,
  NetworkCtx,
  NetworkDefaultImpl,
} from "../dependencies/Network";
import {
  INotifications,
  NotificationsCtx,
  NotificationsDefaultImpl,
} from "../dependencies/Notifications";
import {
  IPersistentStorage,
  PersistentStorageCtx,
  PersistentStorageDefaultImpl,
} from "../dependencies/PersistentStorage";
import {
  IPlatform,
  PlatformCtx,
  PlatformDefaultImpl,
} from "../dependencies/Platform";

type IDependencies = {
  constants: IConstants;
  dateTime: IDateTime;
  network: INetwork;
  notifications: INotifications;
  persistentStorage: IPersistentStorage;
  platform: IPlatform;
};

const defaultDependencies: IDependencies = {
  constants: ConstantsDefaultImpl,
  dateTime: DateTimeDefaultImpl,
  network: NetworkDefaultImpl,
  notifications: NotificationsDefaultImpl,
  persistentStorage: PersistentStorageDefaultImpl,
  platform: PlatformDefaultImpl,
};

type Props = Partial<IDependencies> & {
  noDefaults?: boolean;
};

/**
 * The ugliest type-safe dependency injection HOC.
 */
const Dependencies = ({
  children,
  noDefaults,
  ...provided
}: PropsWithChildren<Props>): JSX.Element => {
  const dependencies = noDefaults
    ? provided
    : { ...defaultDependencies, ...provided };

  let withInjected = children;

  if (dependencies.constants) {
    withInjected = (
      <ConstantsCtx.Provider value={dependencies.constants}>
        {withInjected}
      </ConstantsCtx.Provider>
    );
  }

  if (dependencies.dateTime) {
    withInjected = (
      <DateTimeCtx.Provider value={dependencies.dateTime}>
        {withInjected}
      </DateTimeCtx.Provider>
    );
  }

  if (dependencies.network) {
    withInjected = (
      <NetworkCtx.Provider value={dependencies.network}>
        {withInjected}
      </NetworkCtx.Provider>
    );
  }

  if (dependencies.notifications) {
    withInjected = (
      <NotificationsCtx.Provider value={dependencies.notifications}>
        {withInjected}
      </NotificationsCtx.Provider>
    );
  }

  if (dependencies.persistentStorage) {
    withInjected = (
      <PersistentStorageCtx.Provider value={dependencies.persistentStorage}>
        {withInjected}
      </PersistentStorageCtx.Provider>
    );
  }

  if (dependencies.platform) {
    withInjected = (
      <PlatformCtx.Provider value={dependencies.platform}>
        {withInjected}
      </PlatformCtx.Provider>
    );
  }

  return <>{withInjected}</>;
};
export default Dependencies;
