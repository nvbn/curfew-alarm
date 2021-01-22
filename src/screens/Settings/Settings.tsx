import React from "react";
import { View } from "react-native";
import SettingsForm, { TypedItemProps } from "../../components/SettingsForm";
import useSettings from "../../hooks/useSettings";
import styles from "./styles";
import { Time } from "../../utils/time";
import useNotifications from "../../hooks/useNotifications";

const Settings = () => {
  const [isSettingsReady, settings, updateSettings] = useSettings();
  const [
    isNotificationsReady,
    isNotificationsEnabled,
    requestNotifications,
  ] = useNotifications();

  const options: TypedItemProps[] =
    isSettingsReady && isNotificationsReady
      ? [
          {
            id: "curfew-start",
            title: "Curfew begins at:",
            type: "time",
            value: settings!!.curfewStart,
            onChange: (curfewStart: Time) => updateSettings!!({ curfewStart }),
          },
          {
            id: "curfew-end",
            title: "Curfew is over at:",
            type: "time",
            value: settings!!.curfewEnd,
            onChange: (curfewEnd: Time) => updateSettings!!({ curfewEnd }),
          },
          {
            id: "go-home",
            title: "Go home minutes before:",
            type: "number",
            value: settings!!.minutesToGoHome,
            onChange: (minutesToGoHome: number) =>
              updateSettings!!({ minutesToGoHome }),
          },
          {
            id: "enable-notifications",
            title: "Enable notifications",
            type: "action",
            value: isNotificationsEnabled,
            onChange: (_) => requestNotifications(),
          },
        ]
      : [];

  return (
    <View style={styles.container}>
      <SettingsForm options={options} />
    </View>
  );
};

export default Settings;
