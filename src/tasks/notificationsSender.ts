import { IConstants } from "../dependencies/Constants";
import { IDateTime } from "../dependencies/DateTime";
import { INetwork } from "../dependencies/Network";
import { INotificationSender } from "../dependencies/Notifications";
import { IPersistentStorage } from "../dependencies/PersistentStorage";
import i18n from "../utils/i18n";
import { isAtHome } from "../utils/location";
import { scheduleNotification } from "../utils/notifications";
import { getSettings } from "../utils/settings";
import {
  getStatus,
  STATUS_GO_HOME_WHEN_CURFEW,
  STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME,
} from "../utils/status";
import { dateToTime } from "../utils/time";

export const NOTIFICATIONS_TASK_NAME = "NOTIFICATIONS_TASK";

const PREVIOUS_STATUS_STORAGE_KEY = "PREVIOUS_STATUS";

/**
 * Periodically sends notifications depending on conditions
 */
const notificationsSender = async (
  constants: IConstants,
  getCurrentDate: IDateTime,
  storage: IPersistentStorage,
  network: INetwork,
  sendNotification: INotificationSender,
): Promise<void> => {
  const settings = await getSettings(storage);
  if (!settings.notificationsEnabled) {
    return;
  }

  const isAtHomeStatus = await isAtHome(network);

  const previousStatus = await storage.getItem(PREVIOUS_STATUS_STORAGE_KEY);
  const status = getStatus(
    settings.enabled,
    isAtHomeStatus,
    dateToTime(getCurrentDate()),
    settings.curfewStart,
    settings.curfewEnd,
    settings.minutesToGoHome,
  );
  await storage.setItem(PREVIOUS_STATUS_STORAGE_KEY, status);

  if (previousStatus === status) {
    return;
  }

  switch (status) {
    case STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME:
      await scheduleNotification(
        constants,
        sendNotification,
        storage,
        i18n.t("notificationTimeToGoHomeTitle"),
        i18n.t("notificationTimeToGoHomeBody"),
      );
      break;
    case STATUS_GO_HOME_WHEN_CURFEW:
      await scheduleNotification(
        constants,
        sendNotification,
        storage,
        i18n.t("notificationCurfewStartedTitle"),
        i18n.t("notificationCurfewStartedBody"),
      );
      break;
  }
};

export default notificationsSender;
