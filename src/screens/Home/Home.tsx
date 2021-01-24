import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import Clock from "../../components/Clock";
import useGetTime from "../../hooks/useGetTime";
import useIsAtHome from "../../hooks/useIsAtHome";
import useNotifications from "../../hooks/useNotifications";
import useSettings from "../../hooks/useSettings";
import { isReady } from "../../utils/future";
import styles from "./styles";

type Props = {
  // eslint-disable-next-line
  navigation: StackNavigationProp<{}>;
};

const UPDATE_TIME_INTERVAL = 1000;

/**
 * The home screen of the app.
 */
const Home = ({ navigation }: Props): JSX.Element => {
  useNotifications();

  const [refreshCounter, setRefreshCounter] = useState(0);
  const getTime = useGetTime();
  const [settings] = useSettings([refreshCounter]);
  const isAtHome = useIsAtHome([refreshCounter]);

  useEffect(
    () =>
      navigation.addListener("focus", () => setRefreshCounter((v) => v + 1)),
    [navigation],
  );

  const [now, setNow] = useState(getTime());
  useEffect(() => {
    const interval = setInterval(() => setNow(getTime()), UPDATE_TIME_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [setNow, getTime]);

  return (
    <View style={styles.container}>
      {isReady(settings) && (
        <Clock
          enabled={settings.enabled}
          curfewStart={settings.curfewStart}
          curfewEnd={settings.curfewEnd}
          minutesToGoHome={settings.minutesToGoHome}
          currentTime={now}
          isAtHome={isReady(isAtHome) ? isAtHome : true}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
