/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  REGISTER_DENIED,
  REGISTER_NOT_DEVICE,
  REGISTER_OK,
  registerForPushNotifications,
} from "../notifications";

describe("registerForPushNotifications", () => {
  test("can't register if it's not a real device", async () => {
    const { status } = await registerForPushNotifications(
      { isDevice: false },
      {} as any,
      {} as any,
      false,
    );

    expect(status).toBe(REGISTER_NOT_DEVICE);
  });

  test("requests permissions the first time", async () => {
    const notificationsMock = {
      getPermissionsAsync: jest
        .fn()
        .mockReturnValue({ status: "undetermined" }),
      requestPermissionsAsync: jest.fn().mockReturnValue({ status: "granted" }),
      getExpoPushTokenAsync: jest.fn().mockReturnValue({ data: "token" }),
    };

    const { status, token } = await registerForPushNotifications(
      { isDevice: true },
      {} as any,
      notificationsMock as any,
      false,
    );

    expect(status).toBe(REGISTER_OK);
    expect(token).toEqual("token");
  });

  test("don't re-request permissions if not asked", async () => {
    const notificationsMock = {
      getPermissionsAsync: jest.fn().mockReturnValue({ status: "denied" }),
      requestPermissionsAsync: jest.fn().mockReturnValue({}),
      getExpoPushTokenAsync: jest.fn().mockReturnValue({}),
    };

    const { status } = await registerForPushNotifications(
      { isDevice: true },
      {} as any,
      notificationsMock as any,
      false,
    );

    expect(status).toBe(REGISTER_DENIED);
  });

  test("re-request permissions if asked", async () => {
    const notificationsMock = {
      getPermissionsAsync: jest.fn().mockReturnValue({ status: "denied" }),
      requestPermissionsAsync: jest.fn().mockReturnValue({ status: "granted" }),
      getExpoPushTokenAsync: jest.fn().mockReturnValue({ data: "token" }),
    };

    const { status, token } = await registerForPushNotifications(
      { isDevice: true },
      {} as any,
      notificationsMock as any,
      true,
    );

    expect(status).toBe(REGISTER_OK);
    expect(token).toEqual("token");
  });
});
