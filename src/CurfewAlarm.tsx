import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import SettingsButton from "./components/SettingsButton";
import Dependencies from "./initialisers/Dependencies";
import initI18n from "./initialisers/initI18n";
import initSentry from "./initialisers/initSentry";
import setupBackgroundTasks from "./initialisers/setupBackgroundTasks";
import setupExpoNotificationsHandler from "./initialisers/setupExpoNotificationHandler";
import Home, { HOME_SCREEN_NAME } from "./screens/Home";
import Settings, { SETTINGS_SCREEN_NAME } from "./screens/Settings";
import i18n from "./utils/i18n";

initSentry();
initI18n();
setupExpoNotificationsHandler();
setupBackgroundTasks();

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
