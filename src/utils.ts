import { Time } from "./types";

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

export const isValidNumber = (value: unknown): value is number =>
  Number.isInteger(value) && !isNaN(value as number);

export const isValidTime = (value: any): value is Time => {
  if (!value || !value.hour || !value.minute) {
    return false;
  }

  if (!isValidNumber(value.hour) || value.hour > 23 || value.hour < 0) {
    return false;
  }

  if (!isValidNumber(value.minute) || value.minute > 59 || value.minute < 0) {
    return false;
  }

  return true;
};
