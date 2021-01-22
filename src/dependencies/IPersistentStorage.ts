/**
 * Interface to access device persistent storage.
 */
export default interface IPersistentStorage {
  getItem(key: string): Promise<string | null>;

  setItem(key: string, value: string): Promise<void>;
}
