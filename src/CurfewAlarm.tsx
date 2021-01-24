import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as BackgroundFetch from "expo-background-fetch";
import ExpoConstants from "expo-constants";
import * as ExpoNetwork from "expo-network";
import * as ExpoNotifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import i18n from "i18n-js";
import React from "react";
import * as rn from "react-native";

import SettingsButton from "./components/SettingsButton";
import Constants from "./contexts/Constants";
import DateTime from "./contexts/DateTime";
import Network from "./contexts/Network";
import Notifications from "./contexts/Notifications";
import PersistentStorage from "./contexts/PersistentStorage";
import Platform from "./contexts/Platform";
import IDateTime from "./dependencies/IDateTime";
import initI18n from "./initialisers/initI18n";
import initSentry from "./initialisers/initSentry";
import setupExpoNotificationsHandler from "./initialisers/setupExpoNotificationHandler";
import Home, { HOME_SCREEN_NAME } from "./screens/Home";
import Settings, { SETTINGS_SCREEN_NAME } from "./screens/Settings";
import notificationsSender, {
  NOTIFICATIONS_TASK_NAME,
} from "./tasks/notificationsSender";

initSentry();
initI18n();
setupExpoNotificationsHandler();

const getCurrentDate: IDateTime = () => new Date();

TaskManager.defineTask(NOTIFICATIONS_TASK_NAME, () => {
  notificationsSender(
    getCurrentDate,
    AsyncStorage,
    ExpoNetwork,
    ExpoNotifications,
  ).catch((e) => console.warn("background task failed", e));
  return BackgroundFetch.Result.NoData;
});

const Stack = createStackNavigator();

const CurfewAlarm = (): JSX.Element => (
  <DateTime.Provider value={getCurrentDate}>
    <PersistentStorage.Provider value={AsyncStorage}>
      <Network.Provider value={ExpoNetwork}>
        <Notifications.Provider value={ExpoNotifications}>
          <Platform.Provider value={rn.Platform}>
            <Constants.Provider value={ExpoConstants}>
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
                          onPress={() =>
                            navigation.navigate(SETTINGS_SCREEN_NAME)
                          }
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
            </Constants.Provider>
          </Platform.Provider>
        </Notifications.Provider>
      </Network.Provider>
    </PersistentStorage.Provider>
  </DateTime.Provider>
);

export default CurfewAlarm;
