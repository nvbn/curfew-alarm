export const PLATFORM_OS_ANDROID = "android";

export const PLATFORM_OS_IOS = "ios";

/**
 * Interface that provides access to platform specific constants.
 */
export default interface IPlatform {
  OS: typeof PLATFORM_OS_ANDROID | typeof PLATFORM_OS_IOS | string;
}
