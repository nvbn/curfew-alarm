import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RNDateTimePicker, {
  Event,
} from "@react-native-community/datetimepicker";
import usePlatformOS from "../../hooks/usePlatformOS";
import styles from "./styles";
import { TimeItemProps } from "./types";
import { PLATFORM_OS_ANDROID } from "../../dependencies/IPlatform";
import { formatTime, Time } from "../../utils/time";

type TimeItemIOSProps = {
  title: string;
  valueAsDate: Date;
  onChange: (event: Event, newValue?: Date) => void;
};

const TimeItemIOS = ({
  title,
  valueAsDate,
  onChange,
}: TimeItemIOSProps): JSX.Element => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <RNDateTimePicker mode="time" value={valueAsDate} onChange={onChange} />
  </View>
);

type TimeItemAndroidProps = {
  title: string;
  value: Time;
  valueAsDate: Date;
  onChange: (event: Event, newValue?: Date) => void;
};

const TimeItemAndroid = ({
  title,
  value,
  valueAsDate,
  onChange,
}: TimeItemAndroidProps): JSX.Element => {
  const [showPicker, setShowPicker] = useState(false);

  const onChangeWithDismiss = useCallback(
    (event: Event, newValue?: Date) => {
      setShowPicker(false);
      onChange(event, newValue);
    },
    [setShowPicker, onChange],
  );

  return (
    <TouchableOpacity style={styles.item} onPress={() => setShowPicker(true)}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.input}>{formatTime(value)}</Text>
      {showPicker && (
        <RNDateTimePicker
          mode="time"
          value={valueAsDate}
          onChange={onChangeWithDismiss}
        />
      )}
    </TouchableOpacity>
  );
};

const TimeItem = ({ title, value, onChange }: TimeItemProps): JSX.Element => {
  const os = usePlatformOS();

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

  return os === PLATFORM_OS_ANDROID ? (
    <TimeItemAndroid
      title={title}
      value={value}
      valueAsDate={valueAsDate}
      onChange={onChangeAsTime}
    />
  ) : (
    <TimeItemIOS
      title={title}
      valueAsDate={valueAsDate}
      onChange={onChangeAsTime}
    />
  );
};

export default TimeItem;
