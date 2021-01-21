import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { nowAsTime } from "../../utils";
import Clock from "../../components/Clock";
import styles from "./styles";
import useStorageContent from "../../hooks/useStorageContent";

const Home = (): JSX.Element => {
  const [isStorageReady, storage, _] = useStorageContent();

  const [now, setNow] = useState(nowAsTime);
  useEffect(() => {
    const interval = setInterval(() => setNow(nowAsTime()), 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <View style={styles.container}>
      {isStorageReady && (
        <Clock
          curfewStart={storage!!.curfewStart}
          curfewEnd={storage!!.curfewEnd}
          minutesToGoHome={storage!!.minutesToGoHome}
          currentTime={now}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
