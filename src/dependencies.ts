export interface IPersistentStorage {
  getItem(key: string): Promise<string | null>;

  setItem(key: string, value: string): Promise<void>;
}

export interface INetwork {
  getNetworkStateAsync(): Promise<{ type?: "WIFI" | unknown }>;
}

export interface INotifications {
  scheduleNotificationAsync(request: {
    content: {
      title?: string;
      body?: string;
    };
    trigger: {} | null;
  }): Promise<string>;

  getPermissionsAsync(): Promise<{
    status: "granted" | "undetermined" | "denied";
  }>;

  requestPermissionsAsync(): Promise<{
    status: "granted" | "undetermined" | "denied";
  }>;

  getExpoPushTokenAsync(): Promise<{ data: string }>;

  setNotificationChannelAsync(
    channelId: string,
    channel: {
      name: string;
      importance: number;
    },
  ): Promise<unknown>;
}

export interface IConstants {
  isDevice: boolean;
}

export interface IPlatform {
  OS: string;
}
