import { Time } from "./types";

export const toMinutes = ({ hour, minute }: Time): number => hour * 60 + minute;

export const nowAsTime = (): Time => {
  const now = new Date();

  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
  };
};
