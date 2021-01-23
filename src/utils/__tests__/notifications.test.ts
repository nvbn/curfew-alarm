/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  REGISTER_DENIED,
  REGISTER_NOT_DEVICE,
  REGISTER_OK,
  registerForPushNotifications,
} from "../notifications";
import {
  makeNotificationsWithBehavior,
  NOTIFICATIONS_DEFAULT_FAKE_TOKEN,
} from "../../fakes/Notifications";
import {
  NOTIFICATION_PERMISSIONS_DENIED,
  NOTIFICATIONS_PERMISSIONS_GRANTED,
  NOTIFICATIONS_PERMISSIONS_UNDETERMINED,
} from "../../dependencies/INotifications";

describe("registerForPushNotifications", () => {
  test("can't register if it's not a real device", async () => {
    const { status } = await registerForPushNotifications(
      { isDevice: false },
      {} as any,
      makeNotificationsWithBehavior(),
      false,
    );

    expect(status).toBe(REGISTER_NOT_DEVICE);
  });

  test("requests permissions the first time", async () => {
    const { status, token } = await registerForPushNotifications(
      { isDevice: true },
      {} as any,
      makeNotificationsWithBehavior({
        getPermissionsAsync: Promise.resolve({
          status: NOTIFICATIONS_PERMISSIONS_UNDETERMINED,
        }),
        requestPermissionsAsync: Promise.resolve({
          status: NOTIFICATIONS_PERMISSIONS_GRANTED,
        }),
      }),
      false,
    );

    expect(status).toBe(REGISTER_OK);
    expect(token).toEqual(NOTIFICATIONS_DEFAULT_FAKE_TOKEN);
  });

  test("don't re-request permissions if not asked", async () => {
    const { status } = await registerForPushNotifications(
      { isDevice: true },
      {} as any,
      makeNotificationsWithBehavior({
        getPermissionsAsync: Promise.resolve({
          status: NOTIFICATION_PERMISSIONS_DENIED,
        }),
      }),
      false,
    );

    expect(status).toBe(REGISTER_DENIED);
  });

  test("re-request permissions if asked", async () => {
    const { status, token } = await registerForPushNotifications(
      { isDevice: true },
      {} as any,
      makeNotificationsWithBehavior({
        getPermissionsAsync: Promise.resolve({
          status: NOTIFICATION_PERMISSIONS_DENIED,
        }),
        requestPermissionsAsync: Promise.resolve({
          status: NOTIFICATIONS_PERMISSIONS_GRANTED,
        }),
      }),
      true,
    );

    expect(status).toBe(REGISTER_OK);
    expect(token).toEqual(NOTIFICATIONS_DEFAULT_FAKE_TOKEN);
  });
});
