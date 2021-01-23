import INotifications, {
  NotificationContent,
  NotificationPermissions,
  NotificationPushToken,
  NOTIFICATIONS_PERMISSIONS_GRANTED,
} from "../dependencies/INotifications";

type Behavior = {
  scheduleNotificationAsync: Promise<string>;
  getPermissionsAsync: Promise<NotificationPermissions>;
  requestPermissionsAsync: Promise<NotificationPermissions>;
  getExpoPushTokenAsync: Promise<NotificationPushToken>;
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

type WithCapturedNotifications = {
  captured: NotificationContent[];
};

/**
 * Create a fake for INotifications that implements provided behavior,
 * and captures sent notifications.
 */
export const makeNotificationsWithBehavior = (
  behaviorOverride: Partial<Behavior> = {},
): INotifications & WithCapturedNotifications => {
  const behavior = { ...defaultBehavior, ...behaviorOverride };
  const captured: NotificationContent[] = [];

  return {
    captured,

    scheduleNotificationAsync: ({ content }) => {
      captured.push(content);

      return behavior.scheduleNotificationAsync;
    },
    getPermissionsAsync: () => behavior.getPermissionsAsync,
    requestPermissionsAsync: () => behavior.requestPermissionsAsync,
    getExpoPushTokenAsync: () => behavior.getExpoPushTokenAsync,
    setNotificationChannelAsync: () => behavior.setNotificationChannelAsync,
  };
};
