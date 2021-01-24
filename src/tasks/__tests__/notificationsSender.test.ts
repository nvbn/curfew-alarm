import { NotificationRequest } from "../../dependencies/INotifications";
import {
  makeNetworkAsNotConnected,
  makeNetworkAsOnWifi,
} from "../../fakes/Network";
import { makeNotificationsWithBehavior } from "../../fakes/Notifications";
import { makePersistentStorageWithDataAndBehavior } from "../../fakes/PersistentStorage";
import i18n from "../../utils/i18n";
import { STORAGE_KEY } from "../../utils/settings";
import { dateToTime, formatTime, timeToDate } from "../../utils/time";
import notificationsSender from "../notificationsSender";

describe("notificationsSender", () => {
  for (const [isAtHome, currentTime, expectedNotifications] of [
    [false, timeToDate({ hour: 10, minute: 0 }), []],
    [true, timeToDate({ hour: 10, minute: 0 }), []],
    [
      false,
      timeToDate({ hour: 20, minute: 45 }),
      [
        {
          title: i18n.t("notificationTimeToGoHomeTitle"),
          body: i18n.t("notificationTimeToGoHomeBody"),
        },
      ],
    ],
    [true, timeToDate({ hour: 20, minute: 45 }), []],
    [
      false,
      timeToDate({ hour: 21, minute: 45 }),
      [
        {
          title: i18n.t("notificationCurfewStartedTitle"),
          body: i18n.t("notificationCurfewStartedBody"),
        },
      ],
    ],
  ] as [boolean, Date, NotificationRequest[]][]) {
    test(
      "when " +
        (isAtHome ? "" : "not ") +
        `at home at ${formatTime(dateToTime(currentTime))}`,
      async () => {
        const storage = makePersistentStorageWithDataAndBehavior({
          data: {
            [STORAGE_KEY]: JSON.stringify({
              curfewStart: { hour: 21, minute: 0 },
              curfewEnd: { hour: 4, minute: 0 },
              minutesToGoHome: 30,
            }),
          },
        });
        const notifications = makeNotificationsWithBehavior();
        const network = isAtHome
          ? makeNetworkAsOnWifi()
          : makeNetworkAsNotConnected();

        await notificationsSender(
          () => currentTime,
          storage,
          network,
          notifications,
        );

        expect(notifications.captured).toEqual(expectedNotifications);
      },
    );
  }
});
