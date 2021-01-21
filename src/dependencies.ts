export interface IPersistentStorage {
  getItem(key: string): Promise<string | null>;

  setItem(key: string, value: string): Promise<void>;
}

export interface INetwork {
  getNetworkStateAsync(): Promise<{ type: "WIFI" | unknown }>;
}
