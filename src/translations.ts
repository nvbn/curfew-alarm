export const DEFAULT = {
  appTitle: "Curfew Alarm",
  settingsTitle: "Settings",
  clockMessageFine: "You're fine",
  clockMessageTimeToGoHome: "Time to go home",
  clockMessageStayAtHome: "Stay at home",
  clockMessageGoHome: "Go home!",
  inputTitleCurfewStart: "Curfew begins at:",
  inputTitleCurfewEnd: "Curfew is over at:",
  inputTitleGoHome: "Go home minutes before:",
  inputTitleEnableNotifications: "Enable notifications",
  notificationTimeToGoHomeTitle: "It's time to go home!",
  notificationTimeToGoHomeBody:
    "You still have a bit of time to reach your home before the curfew",
  notificationCurfewStartedTitle: "The curfew started!",
  notificationCurfewStartedBody: "Run home!",
};

export default {
  en: DEFAULT,
} as const;
