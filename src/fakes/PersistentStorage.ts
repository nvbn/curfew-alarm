import IPersistentStorage from "../dependencies/IPersistentStorage";

export const PERSISTENT_STORAGE_BEHAVIOR_OK = "PERSISTENT_STORAGE_BEHAVIOR_OK";

export const PERSISTENT_STORAGE_BEHAVIOR_ERROR =
  "PERSISTENT_STORAGE_BEHAVIOR_ERROR";

type Behavior =
  | typeof PERSISTENT_STORAGE_BEHAVIOR_OK
  | typeof PERSISTENT_STORAGE_BEHAVIOR_ERROR;

type Options = {
  data: Record<string, string | null>;
  getItem: Behavior;
  setItem: Behavior;
};

const defaultOptions: Omit<Options, "data"> = {
  getItem: PERSISTENT_STORAGE_BEHAVIOR_OK,
  setItem: PERSISTENT_STORAGE_BEHAVIOR_OK,
};

/**
 * Fake implementation of IPersistentStorage with overridable behavior.
 */
export const makePersistentStorageWithDataAndBehavior = (
  overrideOptions: Partial<Options> = {},
): IPersistentStorage => {
  const options = { data: {}, ...defaultOptions, ...overrideOptions };

  return {
    getItem: async (key) => {
      if (options.getItem === PERSISTENT_STORAGE_BEHAVIOR_ERROR) {
        throw new Error("expected fake PersistentStorage error");
      }

      return options.data[key] ?? null;
    },
    setItem: async (key, value) => {
      if (options.setItem === PERSISTENT_STORAGE_BEHAVIOR_ERROR) {
        throw new Error("expected fake PersistentStorage error");
      }

      options.data[key] = value;
    },
  };
};
