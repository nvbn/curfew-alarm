import { createContext } from "react";
import { Platform } from "react-native";

export const PLATFORM_OS_ANDROID = "android";

export const PLATFORM_OS_IOS = "ios";

export type PlatformOS =
  | typeof PLATFORM_OS_ANDROID
  | typeof PLATFORM_OS_IOS
  | string;

/**
 * Interface that provides access to platform specific constants.
 */
export interface IPlatform {
  OS: PlatformOS;
}

export const PlatformDefaultImpl: IPlatform = Platform;

export const PlatformCtx = createContext<IPlatform>(PlatformDefaultImpl);
