import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { nowAsTime } from "../../utils";
import Clock from "../../components/Clock";
import styles from "./styles";
import useSettings from "../../hooks/useSettings";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  navigation: StackNavigationProp<{}>;
};

const Home = ({ navigation }: Props): JSX.Element => {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isSettingsReady, settings] = useSettings([refreshCounter]);
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
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
