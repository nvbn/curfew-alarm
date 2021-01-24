import * as Sentry from "sentry-expo";

/**
 * Initialises sentry client.
 */
const initSentry = (): void => {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      enableInExpoDevelopment: true,
      debug: __DEV__,
    });
  }
};

export default initSentry;
