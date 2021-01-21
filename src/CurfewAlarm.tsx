import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PersistentStorage from "./contexts/PersistentStorage";
import SettingsButton from "./components/SettingsButton";
import Home, { HOME_SCREEN_NAME } from "./screens/Home";
import Settings, { SETTINGS_SCREEN_NAME } from "./screens/Settings";

const Stack = createStackNavigator();

const CurfewAlarm = (): JSX.Element => (
  <PersistentStorage.Provider value={AsyncStorage}>
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
  </PersistentStorage.Provider>
);

export default CurfewAlarm;
