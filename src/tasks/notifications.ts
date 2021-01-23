import INetwork from "../dependencies/INetwork";
import INotifications from "../dependencies/INotifications";
import IPersistentStorage from "../dependencies/IPersistentStorage";
import { isAtHome } from "../utils/location";
import { sendNotification } from "../utils/notifications";
import { getSettings } from "../utils/settings";
import {
  getStatus,
  STATUS_GO_HOME_WHEN_CURFEW,
  STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME,
} from "../utils/status";
import { dateToTime } from "../utils/time";

export const NOTIFICATIONS_TASK_NAME = "NOTIFICATIONS_TASK";

const notification = async (
  storage: IPersistentStorage,
  network: INetwork,
  notifications: INotifications,
): Promise<void> => {
  const settings = await getSettings(storage);
  const isAtHomeStatus = await isAtHome(network);

  switch (
    getStatus(
      isAtHomeStatus,
      dateToTime(new Date()),
      settings.curfewStart,
      settings.curfewEnd,
      settings.minutesToGoHome,
    )
  ) {
    case STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME:
      await sendNotification(
        notifications,
        "It's time to go home!",
        "You still have a bit of time to reach your home before the curfew",
      );
      break;
    case STATUS_GO_HOME_WHEN_CURFEW:
      await sendNotification(notifications, "The curfew started!", "Run home!");
      break;
  }
};

export default notification;
