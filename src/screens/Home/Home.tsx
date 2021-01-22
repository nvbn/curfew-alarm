import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Clock from "../../components/Clock";
import styles from "./styles";
import useSettings from "../../hooks/useSettings";
import { StackNavigationProp } from "@react-navigation/stack";
import { nowAsTime } from "../../utils/time";
import useIsAtHome from "../../hooks/useIsAtHome";
import useNotifications from "../../hooks/useNotifications";

type Props = {
  navigation: StackNavigationProp<{}>;
};

const Home = ({ navigation }: Props): JSX.Element => {
  useNotifications();

  const [refreshCounter, setRefreshCounter] = useState(0);

  const [isSettingsReady, settings] = useSettings([refreshCounter]);
  const [isAtHomeReady, isAtHome] = useIsAtHome([refreshCounter]);

  useEffect(
    () =>
      navigation.addListener("focus", () => setRefreshCounter((v) => v + 1)),
    [navigation],
  );

  const [now, setNow] = useState(nowAsTime);
  useEffect(() => {
    const interval = setInterval(() => setNow(nowAsTime()), 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <View style={styles.container}>
      {isSettingsReady && (
        <Clock
          curfewStart={settings!!.curfewStart}
          curfewEnd={settings!!.curfewEnd}
          minutesToGoHome={settings!!.minutesToGoHome}
          currentTime={now}
          isAtHome={isAtHomeReady ? isAtHome!! : true}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
