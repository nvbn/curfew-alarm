import { isValidNumber } from "./numbers";

export type Time = {
  hour: number;
  minute: number;
};

export const toMinutes = ({ hour, minute }: Time): number => hour * 60 + minute;

export const nowAsTime = (): Time => {
  const now = new Date();

  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
  };
};

export const formatTime = ({ hour, minute }: Time): string =>
  `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

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
