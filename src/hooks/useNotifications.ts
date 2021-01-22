import { useCallback, useContext, useEffect, useState } from "react";
import {
  REGISTER_OK,
  registerForPushNotifications,
} from "../utils/notifications";
import Platform from "../contexts/Platform";
import Constants from "../contexts/Constants";
import Notifier from "../contexts/Notifier";

const useNotifications = (): [boolean | null, () => void] => {
  const constants = useContext(Constants);
  const platform = useContext(Platform);
  const notifications = useContext(Notifier);

  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

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
    if (isAllowed === null) {
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
