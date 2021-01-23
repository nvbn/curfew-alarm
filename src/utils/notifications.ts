import IConstants from "../dependencies/IConstants";
import INotifications, {
  NOTIFICATION_PERMISSIONS_DENIED,
  NOTIFICATIONS_PERMISSIONS_GRANTED,
  NOTIFICATIONS_PERMISSIONS_UNDETERMINED,
} from "../dependencies/INotifications";
import IPlatform, { PLATFORM_OS_ANDROID } from "../dependencies/IPlatform";

/**
 * Schedules local push notification.
 */
export const sendNotification = (
  notifications: INotifications,
  title: string,
  body: string,
): Promise<string> =>
  notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  });

export const REGISTER_NOT_DEVICE = "REGISTER_NOT_DEVICE";

export const REGISTER_DENIED = "REGISTER_DECLINED";

export const REGISTER_OK = "REGISTER_OK";

type RegisterStatus = {
  status:
    | typeof REGISTER_NOT_DEVICE
    | typeof REGISTER_DENIED
    | typeof REGISTER_OK;
  token?: string;
};

/**
 * Registers app as push notifications sender / handler.
 */
export const registerForPushNotifications = async (
  { isDevice }: IConstants,
  { OS }: IPlatform,
  notifications: INotifications,
  reRequestPermissions: boolean,
): Promise<RegisterStatus> => {
  if (!isDevice) {
    return { status: REGISTER_NOT_DEVICE };
  }

  let status = (await notifications.getPermissionsAsync()).status;

  if (
    (reRequestPermissions && status === NOTIFICATION_PERMISSIONS_DENIED) ||
    status === NOTIFICATIONS_PERMISSIONS_UNDETERMINED
  ) {
    status = (await notifications.requestPermissionsAsync()).status;
  }

  if (status !== NOTIFICATIONS_PERMISSIONS_GRANTED) {
    return { status: REGISTER_DENIED };
  }

  const token = (await notifications.getExpoPushTokenAsync()).data;

  if (OS === PLATFORM_OS_ANDROID) {
    await notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: 5, // default
    });
  }

  return {
    status: REGISTER_OK,
    token,
  };
};
