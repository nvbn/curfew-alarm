import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { nowAsTime } from "../../utils";
import Clock from "../../components/Clock";
import styles from "./styles";

const Home = (): JSX.Element => {
  const [now, setNow] = useState(nowAsTime);
  useEffect(() => {
    const interval = setInterval(() => setNow(nowAsTime()), 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <View style={styles.container}>
      <Clock
        curfewStart={{ hour: 20, minute: 30 }}
        curfewEnd={{ hour: 4, minute: 30 }}
        minutesToGoHome={30}
        currentTime={now}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
