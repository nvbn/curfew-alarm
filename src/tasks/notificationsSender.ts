import IDateTime from "../dependencies/IDateTime";
import INetwork from "../dependencies/INetwork";
import INotifications from "../dependencies/INotifications";
import IPersistentStorage from "../dependencies/IPersistentStorage";
import i18n from "../utils/i18n";
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

/**
 * Periodically sends notifications depending on conditions
 */
const notificationsSender = async (
  getCurrentDate: IDateTime,
  storage: IPersistentStorage,
  network: INetwork,
  notifications: INotifications,
): Promise<void> => {
  const settings = await getSettings(storage);
  const isAtHomeStatus = await isAtHome(network);

  const status = getStatus(
    settings.enabled,
    isAtHomeStatus,
    dateToTime(getCurrentDate()),
    settings.curfewStart,
    settings.curfewEnd,
    settings.minutesToGoHome,
  );

  switch (status) {
    case STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME:
      await sendNotification(
        notifications,
        i18n.t("notificationTimeToGoHomeTitle"),
        i18n.t("notificationTimeToGoHomeBody"),
      );
      break;
    case STATUS_GO_HOME_WHEN_CURFEW:
      await sendNotification(
        notifications,
        i18n.t("notificationCurfewStartedTitle"),
        i18n.t("notificationCurfewStartedBody"),
      );
      break;
  }
};

export default notificationsSender;
