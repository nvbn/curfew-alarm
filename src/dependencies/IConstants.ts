import ExpoConstants from "expo-constants";

/**
 * Interface that provides access to runtime constants.
 */
export default interface IConstants {
  isDevice: boolean;
}

export const ConstantsDefaultImpl: IConstants = ExpoConstants;
