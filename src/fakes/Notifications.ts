import {
  INotifications,
  NotificationPermissions,
  NotificationPushTokenResponse,
  NOTIFICATIONS_PERMISSIONS_GRANTED,
} from "../dependencies/Notifications";

type Behavior = {
  getPermissionsAsync: Promise<NotificationPermissions>;
  requestPermissionsAsync: Promise<NotificationPermissions>;
  getExpoPushTokenAsync: Promise<NotificationPushTokenResponse>;
  setNotificationChannelAsync: Promise<void>;
};

export const NOTIFICATIONS_DEFAULT_FAKE_TOKEN =
  "EXPO_FAKE_PUSH_NOTIFICATIONS_TOKEN";

const defaultBehavior: Behavior = {
  getPermissionsAsync: Promise.resolve({
    status: NOTIFICATIONS_PERMISSIONS_GRANTED,
  }),
  requestPermissionsAsync: Promise.resolve({
    status: NOTIFICATIONS_PERMISSIONS_GRANTED,
  }),
  getExpoPushTokenAsync: Promise.resolve({
    data: NOTIFICATIONS_DEFAULT_FAKE_TOKEN,
  }),
  setNotificationChannelAsync: Promise.resolve(),
};

/**
 * Create a fake for INotifications that implements provided behavior,
 * and captures sent notifications.
 */
export const makeNotificationsWithBehavior = (
  behaviorOverride: Partial<Behavior> = {},
): INotifications => {
  const behavior = { ...defaultBehavior, ...behaviorOverride };

  return {
    getPermissionsAsync: () => behavior.getPermissionsAsync,
    requestPermissionsAsync: () => behavior.requestPermissionsAsync,
    getExpoPushTokenAsync: () => behavior.getExpoPushTokenAsync,
    setNotificationChannelAsync: () => behavior.setNotificationChannelAsync,
  };
};
