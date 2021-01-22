import React from "react";
import * as rn from "react-native";
import * as ExpoNetwork from "expo-network";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as ExpoNotifications from "expo-notifications";
import ExpoConstants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PersistentStorage from "./contexts/PersistentStorage";
import Network from "./contexts/Network";
import Notifications from "./contexts/Notifications";
import Constants from "./contexts/Constants";
import Platform from "./contexts/Platform";
import SettingsButton from "./components/SettingsButton";
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
);

export default CurfewAlarm;
