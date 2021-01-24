import * as ExpoNotifications from "expo-notifications";

/**
 * Setups push notifications handler for app.
 */
const setupExpoNotificationsHandler = (): void => {
  ExpoNotifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
};

export default setupExpoNotificationsHandler;
