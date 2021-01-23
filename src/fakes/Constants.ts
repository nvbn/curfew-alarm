import IConstants from "../dependencies/IConstants";

/**
 * Create a fake for IConstants like as the app is running on a device.
 */
export const makeConstantsAsOnDevice = (): IConstants => ({
  isDevice: true,
});

/**
 * Creates a fake for IConstants like as the app is running in a emulator.
 */
export const makeConstantsAsInEmulator = (): IConstants => ({
  isDevice: false,
});
