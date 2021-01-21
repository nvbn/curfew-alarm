import React, { useCallback } from "react";
import RNDateTimePicker, {
  Event,
} from "@react-native-community/datetimepicker";
import { Text, View } from "react-native";
import styles from "./styles";
import { TimeItemProps } from "./types";

const TimeItem = ({ title, value, onChange }: TimeItemProps) => {
  const valueAsDate = new Date();
  valueAsDate.setHours(value.hour);
  valueAsDate.setMinutes(value.minute);

  const onChangeAsTime = useCallback(
    (_: Event, newValue?: Date): void =>
      newValue &&
      onChange({
        hour: newValue.getHours(),
        minute: newValue.getMinutes(),
      }),
    [onChange],
  );

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <RNDateTimePicker
        mode="time"
        value={valueAsDate}
        onChange={onChangeAsTime}
      />
    </View>
  );
};

export default TimeItem;
