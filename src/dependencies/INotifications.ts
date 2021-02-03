import * as ExpoNotifications from "expo-notifications";

export const NOTIFICATIONS_PERMISSIONS_GRANTED = "granted";

export const NOTIFICATIONS_PERMISSIONS_UNDETERMINED = "undetermined";

export const NOTIFICATION_PERMISSIONS_DENIED = "denied";

type NotificationPermissionsStatus =
  | typeof NOTIFICATIONS_PERMISSIONS_GRANTED
  | typeof NOTIFICATIONS_PERMISSIONS_UNDETERMINED
  | typeof NOTIFICATION_PERMISSIONS_DENIED;

export type NotificationPermissions = {
  status: NotificationPermissionsStatus;
};

export type NotificationPushTokenResponse = { data: string };

export type NotificationContent = {
  to: string;
  title: string;
  body: string;
};

// Not sure if that's a correct place for it
export type INotificationSender = (
  content: NotificationContent,
) => Promise<void>;

/**
 * Interface that provides access to device notifications.
 */
export default interface INotifications {
  getPermissionsAsync(): Promise<NotificationPermissions>;

  requestPermissionsAsync(): Promise<NotificationPermissions>;

  getExpoPushTokenAsync(): Promise<NotificationPushTokenResponse>;

  setNotificationChannelAsync(
    channelId: string,
    channel: {
      name: string;
      importance: number;
    },
  ): Promise<unknown>;
}

export const NotificationsDefaultImpl: INotifications = ExpoNotifications;

export const NotificationSenderDefaultImpl: INotificationSender = async (
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
