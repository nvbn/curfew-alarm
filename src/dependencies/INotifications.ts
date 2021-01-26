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
