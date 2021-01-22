import { isValidNumber } from "./numbers";

/**
 * Internal abstraction for storing time, it was just more convenient to have it.
 */
export type Time = {
  hour: number;
  minute: number;
};

/**
 * Time to minute from the start of the day.
 */
export const toMinutes = ({ hour, minute }: Time): number => hour * 60 + minute;

/**
 * Converts js Date to internal Time.
 */
export const dateToTime = (date: Date): Time => ({
  hour: date.getHours(),
  minute: date.getMinutes(),
});

/**
 * Formats internal time in 24h form.
 */
export const formatTime = ({ hour, minute }: Time): string =>
  `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

/**
 * Returns true if passed object is a valid Time.
 */
// eslint-disable-next-line
export const isValidTime = (value: any): value is Time => {
  if (!value || !value.hour || !value.minute) {
    return false;
  }

  if (!isValidNumber(value.hour) || value.hour > 23 || value.hour < 0) {
    return false;
  }

  return !(
    !isValidNumber(value.minute) ||
    value.minute > 59 ||
    value.minute < 0
  );
};
