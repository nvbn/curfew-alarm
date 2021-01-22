import { useCallback, useContext, useEffect, useState } from "react";
import {
  REGISTER_OK,
  registerForPushNotifications,
} from "../utils/notifications";
import Platform from "../contexts/Platform";
import Constants from "../contexts/Constants";
import Notifier from "../contexts/Notifier";

const useNotifications = (): [boolean, boolean, () => void] => {
  const constants = useContext(Constants);
  const platform = useContext(Platform);
  const notifications = useContext(Notifier);

  const [isReady, setIsReady] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    registerForPushNotifications(
      constants,
      platform,
      notifications,
      false,
    ).then(({ status }) => {
      if (status === REGISTER_OK) {
        setIsReady(true);
        setIsAllowed(true);
      }
    });
  });

  const request = useCallback(() => {
    if (!isReady) {
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
  }, [isReady, setIsAllowed]);

  return [isReady, isAllowed, request];
};

export default useNotifications;
