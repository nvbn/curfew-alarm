import { NotificationContent } from "../../dependencies/INotifications";
import { makeConstantsAsOnDevice } from "../../fakes/Constants";
import {
  makeNetworkAsNotConnected,
  makeNetworkAsOnWifi,
} from "../../fakes/Network";
import { makePersistentStorageWithDataAndBehavior } from "../../fakes/PersistentStorage";
import i18n from "../../utils/i18n";
import { NOTIFICATIONS_TOKEN_KEY } from "../../utils/notifications";
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from "../../utils/settings";
import { dateToTime, formatTime, timeToDate } from "../../utils/time";
import notificationsSender from "../notificationsSender";

describe("notificationsSender", () => {
  for (const [
    enabled,
    notificationsEnabled,
    isAtHome,
    currentTime,
    expectedNotifications,
  ] of [
    [true, true, false, timeToDate({ hour: 10, minute: 0 }), []],
    [true, true, true, timeToDate({ hour: 10, minute: 0 }), []],
    [
      true,
      true,
      false,
      timeToDate({ hour: 20, minute: 45 }),
      [
        [
          {
            to: "token",
            title: i18n.t("notificationTimeToGoHomeTitle"),
            body: i18n.t("notificationTimeToGoHomeBody"),
          },
        ],
      ],
    ],
    [true, false, false, timeToDate({ hour: 20, minute: 45 }), []],
    [true, true, true, timeToDate({ hour: 20, minute: 45 }), []],
    [
      true,
      true,
      false,
      timeToDate({ hour: 21, minute: 45 }),
      [
        [
          {
            to: "token",
            title: i18n.t("notificationCurfewStartedTitle"),
            body: i18n.t("notificationCurfewStartedBody"),
          },
        ],
      ],
    ],
    [true, false, false, timeToDate({ hour: 21, minute: 45 }), []],
    [false, true, false, timeToDate({ hour: 21, minute: 45 }), []],
    [false, true, false, timeToDate({ hour: 20, minute: 45 }), []],
    [false, true, false, timeToDate({ hour: 10, minute: 15 }), []],
  ] as [boolean, boolean, boolean, Date, NotificationContent[]][]) {
    test(
      "when " +
        (isAtHome ? "" : "not ") +
        `at home at ${formatTime(dateToTime(currentTime))}`,
      async () => {
        const storage = makePersistentStorageWithDataAndBehavior({
          data: {
            [SETTINGS_STORAGE_KEY]: JSON.stringify({
              curfewStart: { hour: 21, minute: 0 },
              curfewEnd: { hour: 4, minute: 0 },
              minutesToGoHome: 30,
              enabled,
              notificationsEnabled,
            }),
            [NOTIFICATIONS_TOKEN_KEY]: "token",
          },
        });
        const network = isAtHome
          ? makeNetworkAsOnWifi()
          : makeNetworkAsNotConnected();

        const sendNotification = jest.fn();

        await notificationsSender(
          makeConstantsAsOnDevice(),
          () => currentTime,
          storage,
          network,
          sendNotification,
        );

        expect(sendNotification.mock.calls).toEqual(expectedNotifications);
      },
    );
  }

  test("doesn't send the same notification twice", async () => {
    const sendNotification = jest.fn();
    const params: Parameters<typeof notificationsSender> = [
      makeConstantsAsOnDevice(),
      () => timeToDate({ hour: 21, minute: 45 }),
      makePersistentStorageWithDataAndBehavior({
        data: {
          [SETTINGS_STORAGE_KEY]: JSON.stringify({
            ...DEFAULT_SETTINGS,
            curfewStart: { hour: 21, minute: 0 },
            curfewEnd: { hour: 4, minute: 0 },
            minutesToGoHome: 30,
          }),
          [NOTIFICATIONS_TOKEN_KEY]: "token",
        },
      }),
      makeNetworkAsNotConnected(),
      sendNotification,
    ];

    await notificationsSender(...params);
    expect(sendNotification.mock.calls.length).toEqual(1);

    await notificationsSender(...params);
    expect(sendNotification.mock.calls.length).toEqual(1);
  });
});
