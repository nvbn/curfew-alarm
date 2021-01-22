import React from "react";
import * as rn from "react-native";
import * as Network from "expo-network";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import ExpoConstants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PersistentStorage from "./contexts/PersistentStorage";
import NetworkStatus from "./contexts/NetworkStatus";
import Notifier from "./contexts/Notifier";
import Constants from "./contexts/Constants";
import Platform from "./contexts/Platform";
import SettingsButton from "./components/SettingsButton";
import Home, { HOME_SCREEN_NAME } from "./screens/Home";
import Settings, { SETTINGS_SCREEN_NAME } from "./screens/Settings";
import notification, { NOTIFICATIONS_TASK_NAME } from "./tasks/notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

TaskManager.defineTask(NOTIFICATIONS_TASK_NAME, () => {
  notification(AsyncStorage, Network, Notifications).catch((e) =>
    console.warn("background task failed", e),
  );
  return BackgroundFetch.Result.NoData;
});

const Stack = createStackNavigator();

const CurfewAlarm = (): JSX.Element => (
  <PersistentStorage.Provider value={AsyncStorage}>
    <NetworkStatus.Provider value={Network}>
      <Notifier.Provider value={Notifications}>
        <Platform.Provider value={rn.Platform}>
          <Constants.Provider value={ExpoConstants}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name={HOME_SCREEN_NAME}
                  component={Home}
                  options={({ navigation }) => ({
                    title: "Curfew Alarm",
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
      </Notifier.Provider>
    </NetworkStatus.Provider>
  </PersistentStorage.Provider>
);

export default CurfewAlarm;
