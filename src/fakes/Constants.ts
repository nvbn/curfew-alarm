import { IConstants } from "../dependencies/Constants";

/**
 * Create a fake for Constants like as the app is running on a device.
 */
export const makeConstantsAsOnDevice = (): IConstants => ({
  isDevice: true,
});

/**
 * Creates a fake for Constants like as the app is running in a emulator.
 */
export const makeConstantsAsInEmulator = (): IConstants => ({
  isDevice: false,
});
