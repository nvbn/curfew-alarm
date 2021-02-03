import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import React from "react";

import SettingsButton from "./components/SettingsButton";
import { ConstantsDefaultImpl } from "./dependencies/Constants";
import { DateTimeDefaultImpl } from "./dependencies/DateTime";
import { NetworkDefaultImpl } from "./dependencies/Network";
import { NotificationSenderDefaultImpl } from "./dependencies/Notifications";
import { PersistentStorageDefaultImpl } from "./dependencies/PersistentStorage";
import Dependencies from "./initialisers/Dependencies";
import initI18n from "./initialisers/initI18n";
import initSentry from "./initialisers/initSentry";
import setupExpoNotificationsHandler from "./initialisers/setupExpoNotificationHandler";
import Home, { HOME_SCREEN_NAME } from "./screens/Home";
import Settings, { SETTINGS_SCREEN_NAME } from "./screens/Settings";
import notificationsSender, {
  NOTIFICATIONS_TASK_NAME,
} from "./tasks/notificationsSender";
import i18n from "./utils/i18n";

initSentry();
initI18n();
setupExpoNotificationsHandler();

TaskManager.defineTask(NOTIFICATIONS_TASK_NAME, async () => {
  notificationsSender(
    ConstantsDefaultImpl,
    DateTimeDefaultImpl,
    PersistentStorageDefaultImpl,
    NetworkDefaultImpl,
    NotificationSenderDefaultImpl,
  ).catch((e) => console.warn("background task failed", e));

  return BackgroundFetch.Result.NoData;
});

BackgroundFetch.registerTaskAsync(NOTIFICATIONS_TASK_NAME, {
  startOnBoot: true,
  minimumInterval: 300,
}).catch((e) =>
  console.warn("unable to register notifications background task", e),
);

const Stack = createStackNavigator();

const CurfewAlarm = (): JSX.Element => (
  <Dependencies>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={HOME_SCREEN_NAME}
          component={Home}
          options={({ navigation }) => ({
            title: i18n.t("appTitle"),
            // eslint-disable-next-line react/display-name
            headerRight: () => (
              <SettingsButton
                onPress={() => navigation.navigate(SETTINGS_SCREEN_NAME)}
              />
            ),
          })}
        />
        <Stack.Screen
          name={SETTINGS_SCREEN_NAME}
          component={Settings}
          options={{
            title: i18n.t("settingsTitle"),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Dependencies>
);

export default CurfewAlarm;
