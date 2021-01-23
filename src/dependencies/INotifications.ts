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

export type NotificationPushToken = { data: string };

export type NotificationContent = {
  title?: string;
  body?: string;
};

export type NotificationRequest = {
  content: NotificationContent;
  trigger: Record<string, unknown> | null;
};

/**
 * Interface that provides access to device notifications.
 */
export default interface INotifications {
  scheduleNotificationAsync(request: NotificationRequest): Promise<string>;

  getPermissionsAsync(): Promise<NotificationPermissions>;

  requestPermissionsAsync(): Promise<NotificationPermissions>;

  getExpoPushTokenAsync(): Promise<NotificationPushToken>;

  setNotificationChannelAsync(
    channelId: string,
    channel: {
      name: string;
      importance: number;
    },
  ): Promise<unknown>;
}
