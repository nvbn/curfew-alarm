import { useCallback, useContext, useEffect, useState } from "react";

import Constants from "../contexts/Constants";
import Notifications from "../contexts/Notifications";
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

  const [isAllowed, setIsAllowed] = useState<Future<boolean>>(FUTURE_NOT_READY);

  useEffect(() => {
    registerForPushNotifications(constants, platform, notifications, false)
      .then(({ status }) => setIsAllowed(status === REGISTER_OK))
      .catch((e) => {
        console.warn("unable to register for push notifications", e);
        setIsAllowed(false);
      });
  }, [constants, platform, notifications, setIsAllowed]);

  const request = useCallback(() => {
    if (!isReady(isAllowed)) {
      console.warn("not ready!");
      return;
    }

    registerForPushNotifications(constants, platform, notifications, true)
      .then(({ status }) => setIsAllowed(status === REGISTER_OK))
      .catch((e) => {
        console.warn("unable to re-register for push notifications", e);
        setIsAllowed(false);
      });
  }, [constants, platform, notifications, isAllowed, setIsAllowed]);

  return [isAllowed, request];
};

export default useNotifications;
