import INotifications, {
  NotificationPermissions,
  NotificationPushToke,
  NOTIFICATIONS_PERMISSIONS_GRANTED,
} from "../dependencies/INotifications";

type Behavior = {
  scheduleNotificationAsync: Promise<string>;
  getPermissionsAsync: Promise<NotificationPermissions>;
  requestPermissionsAsync: Promise<NotificationPermissions>;
  getExpoPushTokenAsync: Promise<NotificationPushToke>;
  setNotificationChannelAsync: Promise<void>;
};

export const NOTIFICATIONS_DEFAULT_FAKE_TOKEN = "EXPO_PUSH_NOTIFICATIONS_TOKEN";

const defaultBehavior: Behavior = {
  scheduleNotificationAsync: Promise.resolve("ok"),
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
 * Create a fake for INotifications that implements provided behavior
 */
export const makeNotificationsWithBehavior = (
  behaviorOverride: Partial<Behavior> = {},
): INotifications => {
  const behavior = { ...defaultBehavior, ...behaviorOverride };

  return {
    scheduleNotificationAsync: () => behavior.scheduleNotificationAsync,
    getPermissionsAsync: () => behavior.getPermissionsAsync,
    requestPermissionsAsync: () => behavior.requestPermissionsAsync,
    getExpoPushTokenAsync: () => behavior.getExpoPushTokenAsync,
    setNotificationChannelAsync: () => behavior.setNotificationChannelAsync,
  };
};
