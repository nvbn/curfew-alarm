import { useCallback, useContext, useEffect, useState } from "react";
import {
  REGISTER_OK,
  registerForPushNotifications,
} from "../utils/notifications";
import { Future, FUTURE_NOT_READY, isReady } from "../utils/future";
import Platform from "../contexts/Platform";
import Constants from "../contexts/Constants";
import Notifier from "../contexts/Notifier";

const useNotifications = (): [Future<boolean>, () => void] => {
  const constants = useContext(Constants);
  const platform = useContext(Platform);
  const notifications = useContext(Notifier);

  const [isAllowed, setIsAllowed] = useState<Future<boolean>>(FUTURE_NOT_READY);

  useEffect(() => {
    registerForPushNotifications(
      constants,
      platform,
      notifications,
      false,
    ).then(({ status }) => {
      if (status === REGISTER_OK) {
        setIsAllowed(true);
      }
    });
  });

  const request = useCallback(() => {
    if (!isReady(isAllowed)) {
      console.warn("not ready!");
      return;
    }

    registerForPushNotifications(
      constants,
      platform,
      notifications,
      false,
    ).then(({ status }) => {
      if (status === REGISTER_OK) {
        setIsAllowed(true);
      }
    });
  }, [constants, platform, notifications, isAllowed, setIsAllowed]);

  return [isAllowed, request];
};

export default useNotifications;
