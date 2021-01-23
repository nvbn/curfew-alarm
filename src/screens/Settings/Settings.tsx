import React from "react";
import { View } from "react-native";

import SettingsForm, { TypedItemProps } from "../../components/SettingsForm";
import useNotifications from "../../hooks/useNotifications";
import usePlatformOS from "../../hooks/usePlatformOS";
import useSettings from "../../hooks/useSettings";
import { isReady } from "../../utils/future";
import { Time } from "../../utils/time";
import styles from "./styles";

const Settings = (): JSX.Element => {
  const os = usePlatformOS();
  const [settings, updateSettings] = useSettings();
  const [isNotificationsEnabled, requestNotifications] = useNotifications();

  const options: TypedItemProps[] =
    isReady(settings) && isReady(isNotificationsEnabled)
      ? [
          {
            id: "curfew-start",
            title: "Curfew begins at:",
            type: "time",
            value: settings.curfewStart,
            onChange: (curfewStart: Time) => updateSettings({ curfewStart }),
          },
          {
            id: "curfew-end",
            title: "Curfew is over at:",
            type: "time",
            value: settings.curfewEnd,
            onChange: (curfewEnd: Time) => updateSettings({ curfewEnd }),
          },
          {
            id: "go-home",
            title: "Go home minutes before:",
            type: "number",
            value: settings.minutesToGoHome,
            onChange: (minutesToGoHome: number) =>
              updateSettings({ minutesToGoHome }),
          },
          {
            id: "enable-notifications",
            title: "Enable notifications",
            type: "action",
            value: isNotificationsEnabled,
            onChange: () => requestNotifications(),
          },
        ]
      : [];

  return (
    <View style={styles.container}>
      <SettingsForm options={options} os={os} />
    </View>
  );
};

export default Settings;
