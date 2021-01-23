import IPlatform, {
  PLATFORM_OS_ANDROID,
  PLATFORM_OS_IOS,
} from "../dependencies/IPlatform";

/**
 * A fake for IOS platform metadata.
 */
export const makePlatformIOS = (): IPlatform => ({
  OS: PLATFORM_OS_IOS,
});

/**
 * A fake for android platform metadata.
 */
export const makePlatformAndroid = (): IPlatform => ({
  OS: PLATFORM_OS_ANDROID,
});
