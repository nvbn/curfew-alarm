import { useCallback, useContext, useEffect, useState } from "react";

import Constants from "../contexts/Constants";
import Notifications from "../contexts/Notifications";
import PersistentStorage from "../contexts/PersistentStorage";
import Platform from "../contexts/Platform";
import { Future, FUTURE_NOT_READY, isReady } from "../utils/future";
import {
  REGISTER_OK,
  registerForPushNotifications,
} from "../utils/notifications";

/**
 * A hook that configures notifications (and relevant permissions),
 * and allows to re-request permissions.
 */
const useNotifications = (): [Future<boolean>, () => void] => {
  const constants = useContext(Constants);
  const platform = useContext(Platform);
  const notifications = useContext(Notifications);
  const storage = useContext(PersistentStorage);

  const [hasPermission, setHasPermission] = useState<Future<boolean>>(
    FUTURE_NOT_READY,
  );

  useEffect(() => {
    registerForPushNotifications(
      constants,
      platform,
      notifications,
      storage,
      false,
    )
      .then((status) => setHasPermission(status === REGISTER_OK))
      .catch((e) => {
        console.warn("unable to register for push notifications", e);
        setHasPermission(false);
      });
  }, [constants, platform, notifications, storage, setHasPermission]);

  const request = useCallback(() => {
    if (!isReady(hasPermission)) {
      console.warn("not ready!");
      return;
    }

    registerForPushNotifications(
      constants,
      platform,
      notifications,
      storage,
      true,
    )
      .then((status) => setHasPermission(status === REGISTER_OK))
      .catch((e) => {
        console.warn("unable to re-register for push notifications", e);
        setHasPermission(false);
      });
  }, [
    constants,
    platform,
    notifications,
    storage,
    hasPermission,
    setHasPermission,
  ]);

  return [hasPermission, request];
};

export default useNotifications;
