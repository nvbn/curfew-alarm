import { useHeaderHeight } from "@react-navigation/stack";
import React from "react";
import { KeyboardAvoidingView } from "react-native";

import SettingsForm, { TypedItemProps } from "../../components/SettingsForm";
import useNotifications from "../../hooks/useNotifications";
import usePlatformOS from "../../hooks/usePlatformOS";
import useSettings from "../../hooks/useSettings";
import { futureMap } from "../../utils/future";
import i18n from "../../utils/i18n";
import { Time } from "../../utils/time";
import styles from "./styles";

/**
 * A screen that allows to modify app settings.
 */
const Settings = (): JSX.Element => {
  const os = usePlatformOS();
  const [settings, updateSettings] = useSettings();
  const [hasNotificationsPermission, requestNotifications] = useNotifications();
  const headerHeight = useHeaderHeight();

  const options: TypedItemProps[] = [
    {
      id: "enable",
      title: i18n.t("inputTitleEnabled"),
      type: "boolean",
      value: futureMap(settings, (v) => v.enabled),
      onChange: (enabled) => updateSettings({ enabled }),
    },
    {
      id: "enable-notifications",
      title: i18n.t("inputTitleEnableNotifications"),
      type: "boolean",
      value: futureMap(
        hasNotificationsPermission,
        (hasNotificationsPermission) =>
          futureMap(
            settings,
            (settings) =>
              hasNotificationsPermission && settings.notificationsEnabled,
          ),
      ),
      onChange: (notificationsEnabled) => {
        if (notificationsEnabled) {
          // re-request doesn't do any harm
          requestNotifications();
        }

        updateSettings({ notificationsEnabled });
      },
    },
    {
      id: "curfew-start",
      title: i18n.t("inputTitleCurfewStart"),
      type: "time",
      value: futureMap(settings, (v) => v.curfewStart),
      onChange: (curfewStart: Time) => updateSettings({ curfewStart }),
    },
    {
      id: "curfew-end",
      title: i18n.t("inputTitleCurfewEnd"),
      type: "time",
      value: futureMap(settings, (v) => v.curfewEnd),
      onChange: (curfewEnd: Time) => updateSettings({ curfewEnd }),
    },
    {
      id: "go-home",
      title: i18n.t("inputTitleGoHome"),
      type: "number",
      value: futureMap(settings, (v) => v.minutesToGoHome),
      onChange: (minutesToGoHome: number) =>
        updateSettings({ minutesToGoHome }),
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={headerHeight}
      behavior={os === "ios" ? "padding" : "height"}
    >
      <SettingsForm options={options} os={os} />
    </KeyboardAvoidingView>
  );
};

export default Settings;
