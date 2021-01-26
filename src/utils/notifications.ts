import IConstants from "../dependencies/IConstants";
import INotifications, {
  INotificationSender,
  NOTIFICATION_PERMISSIONS_DENIED,
  NOTIFICATIONS_PERMISSIONS_GRANTED,
  NOTIFICATIONS_PERMISSIONS_UNDETERMINED,
} from "../dependencies/INotifications";
import IPersistentStorage from "../dependencies/IPersistentStorage";
import IPlatform, { PLATFORM_OS_ANDROID } from "../dependencies/IPlatform";

/**
 * Actual implementation of notifications sender.
 *
 * @param content
 */
export const sendNotificationWithExpoAPI: INotificationSender = async (
  content,
) => {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

// Exported only for tests
export const NOTIFICATIONS_TOKEN_KEY = "NOTIFICATIONS_TOKEN";

/**
 * Schedules a push notification.
 */
export const scheduleNotification = async (
  { isDevice }: IConstants,
  sendNotification: INotificationSender,
  storage: IPersistentStorage,
  title: string,
  body: string,
): Promise<void> => {
  if (!isDevice) {
    console.log("notifications only available on real devices");
    return;
  }

  const token = await storage.getItem(NOTIFICATIONS_TOKEN_KEY);
  if (!token) {
    console.log("no token no notifications");
    return;
  }

  await sendNotification({
    to: token,
    title,
    body,
  });
};

export const REGISTER_NOT_DEVICE = "REGISTER_NOT_DEVICE";

export const REGISTER_DENIED = "REGISTER_DENIED";

export const REGISTER_OK = "REGISTER_OK";

type RegisterStatus =
  | typeof REGISTER_NOT_DEVICE
  | typeof REGISTER_DENIED
  | typeof REGISTER_OK;

/**
 * Registers app as push notifications sender / handler.
 */
export const registerForPushNotifications = async (
  { isDevice }: IConstants,
  { OS }: IPlatform,
  notifications: INotifications,
  storage: IPersistentStorage,
  reRequestPermissions: boolean,
): Promise<RegisterStatus> => {
  if (!isDevice) {
    return REGISTER_NOT_DEVICE;
  }

  let { status } = await notifications.getPermissionsAsync();

  if (
    (reRequestPermissions && status === NOTIFICATION_PERMISSIONS_DENIED) ||
    status === NOTIFICATIONS_PERMISSIONS_UNDETERMINED
  ) {
    status = (await notifications.requestPermissionsAsync()).status;
  }

  if (status !== NOTIFICATIONS_PERMISSIONS_GRANTED) {
    return REGISTER_DENIED;
  }

  const token = (await notifications.getExpoPushTokenAsync()).data;
  await storage.setItem(NOTIFICATIONS_TOKEN_KEY, token);

  if (OS === PLATFORM_OS_ANDROID) {
    await notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: 5, // default
    });
  }

  return REGISTER_OK;
};
