import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home, { HOME_SCREEN_NAME } from "./screens/Home";

const Stack = createStackNavigator();

const CurfewAlarm = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={HOME_SCREEN_NAME}
        component={Home}
        options={{ title: "🚨 Curfew Alarm 🚨" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default CurfewAlarm;
