import React from "react";
import * as Network from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PersistentStorage from "./contexts/PersistentStorage";
import NetworkStatus from "./contexts/NetworkStatus";
import SettingsButton from "./components/SettingsButton";
import Home, { HOME_SCREEN_NAME } from "./screens/Home";
import Settings, { SETTINGS_SCREEN_NAME } from "./screens/Settings";

const Stack = createStackNavigator();

const CurfewAlarm = (): JSX.Element => (
  <PersistentStorage.Provider value={AsyncStorage}>
    <NetworkStatus.Provider value={Network}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={HOME_SCREEN_NAME}
            component={Home}
            options={({ navigation }) => ({
              title: "Curfew Alarm",
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
              title: "Settings",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NetworkStatus.Provider>
  </PersistentStorage.Provider>
);

export default CurfewAlarm;
