import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as BackgroundFetch from "expo-background-fetch";
import ExpoConstants from "expo-constants";
import * as ExpoNetwork from "expo-network";
import * as ExpoNotifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import React from "react";
import * as rn from "react-native";

import SettingsButton from "./components/SettingsButton";
import Constants from "./contexts/Constants";
import DateTime from "./contexts/DateTime";
import Network from "./contexts/Network";
import Notifications from "./contexts/Notifications";
import PersistentStorage from "./contexts/PersistentStorage";
import Platform from "./contexts/Platform";
import Home, { HOME_SCREEN_NAME } from "./screens/Home";
import Settings, { SETTINGS_SCREEN_NAME } from "./screens/Settings";
import notification, { NOTIFICATIONS_TASK_NAME } from "./tasks/notifications";

ExpoNotifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

TaskManager.defineTask(NOTIFICATIONS_TASK_NAME, () => {
  notification(AsyncStorage, ExpoNetwork, ExpoNotifications).catch((e) =>
    console.warn("background task failed", e),
  );
  return BackgroundFetch.Result.NoData;
});

const Stack = createStackNavigator();

const CurfewAlarm = (): JSX.Element => (
  <DateTime.Provider value={() => new Date()}>
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
                      title: "Curfew Alarm",
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
                      title: "Settings",
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
