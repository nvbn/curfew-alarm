import { Time, toMinutes } from "./time";

export const STATUS_FINE = "FINE";

export const STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME =
  "GO_HOME_WHEN_TIME_TO_GO_HOME";

export const STATUS_STAY_AT_HOME_WHEN_TIME_TO_GO_HOME =
  "STAY_AT_HOME_WHEN_TIME_TO_GO_HOME";

export const STATUS_STAY_AT_HOME_WHEN_CURFEW = "STAY_AT_HOME_WHEN_CURFEW";

export const STATUS_GO_HOME_WHEN_CURFEW = "GO_HOME_WHEN_CURFEW";

export type Status =
  | typeof STATUS_FINE
  | typeof STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME
  | typeof STATUS_STAY_AT_HOME_WHEN_TIME_TO_GO_HOME
  | typeof STATUS_STAY_AT_HOME_WHEN_CURFEW
  | typeof STATUS_GO_HOME_WHEN_CURFEW;

const MAX_MINUTE = 24 * 60;

/**
 * Determines users status / what a user needs to do at the moment
 * based on time and configurations.
 */
export const getStatus = (
  enabled: boolean,
  isAtHome: boolean,
  currentTime: Time,
  curfewStart: Time,
  curfewEnd: Time,
  minutesToGoHome: number,
): Status => {
  if (!enabled) {
    return STATUS_FINE;
  }

  const currentMinute = toMinutes(currentTime);
  const curfewStartMinute = toMinutes(curfewStart);
  const curfewEndMinute = toMinutes(curfewEnd);
  const goHomeStartMinute = curfewStartMinute - minutesToGoHome;

  if (
    currentMinute >= curfewStartMinute &&
    ((curfewEndMinute < curfewStartMinute && currentMinute <= MAX_MINUTE) ||
      currentMinute <= curfewEndMinute)
  ) {
    return isAtHome
      ? STATUS_STAY_AT_HOME_WHEN_CURFEW
      : STATUS_GO_HOME_WHEN_CURFEW;
  } else if (currentMinute >= goHomeStartMinute) {
    return isAtHome
      ? STATUS_STAY_AT_HOME_WHEN_TIME_TO_GO_HOME
      : STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME;
  } else {
    return STATUS_FINE;
  }
};
