import { IConstants, INotifications, IPlatform } from "../dependencies";

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

  if ((reRequestPermissions && status === "denied") || status === "granted") {
    status = (await notifications.requestPermissionsAsync()).status;
  }

  if (status !== "granted") {
    return { status: REGISTER_DENIED };
  }

  const token = (await notifications.getExpoPushTokenAsync()).data;

  if (OS === "android") {
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
