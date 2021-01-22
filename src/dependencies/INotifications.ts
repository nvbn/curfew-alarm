export const NOTIFICATIONS_PERMISSIONS_GRANTED = "granted";

export const NOTIFICATIONS_PERMISSIONS_UNDETERMINED = "undetermined";

export const NOTIFICATION_PERMISSIONS_DENIED = "denied";

type NotificationPermissionsStatus =
  | typeof NOTIFICATIONS_PERMISSIONS_GRANTED
  | typeof NOTIFICATIONS_PERMISSIONS_UNDETERMINED
  | typeof NOTIFICATION_PERMISSIONS_DENIED;

type NotificationPermissions = {
  status: NotificationPermissionsStatus;
};

/**
 * Interface that provides access to device notifications.
 */
export default interface INotifications {
  scheduleNotificationAsync(request: {
    content: {
      title?: string;
      body?: string;
    };
    trigger: Record<string, unknown> | null;
  }): Promise<string>;

  getPermissionsAsync(): Promise<NotificationPermissions>;

  requestPermissionsAsync(): Promise<NotificationPermissions>;

  getExpoPushTokenAsync(): Promise<{ data: string }>;

  setNotificationChannelAsync(
    channelId: string,
    channel: {
      name: string;
      importance: number;
    },
  ): Promise<unknown>;
}
