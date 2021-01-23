import RNDateTimePicker, {
  Event,
} from "@react-native-community/datetimepicker";
import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { PLATFORM_OS_ANDROID, PlatformOS } from "../../dependencies/IPlatform";
import { formatTime, Time } from "../../utils/time";
import styles from "./styles";
import { TimeItemProps } from "./types";

type TimeItemIOSProps = {
  id: string;
  title: string;
  valueAsDate: Date;
  onChange: (event: Event, newValue?: Date) => void;
};

const TimeItemIOS = ({
  id,
  title,
  valueAsDate,
  onChange,
}: TimeItemIOSProps): JSX.Element => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <RNDateTimePicker
      testID={`time-item-ios-time-picker-${id}`}
      mode="time"
      value={valueAsDate}
      onChange={onChange}
    />
  </View>
);

type TimeItemAndroidProps = {
  id: string;
  title: string;
  value: Time;
  valueAsDate: Date;
  onChange: (event: Event, newValue?: Date) => void;
};

const TimeItemAndroid = ({
  id,
  title,
  value,
  valueAsDate,
  onChange,
}: TimeItemAndroidProps): JSX.Element => {
  const [showPicker, setShowPicker] = useState(true);

  const onChangeWithDismiss = useCallback(
    (event: Event, newValue?: Date) => {
      setShowPicker(false);
      onChange(event, newValue);
    },
    [setShowPicker, onChange],
  );

  return (
    <TouchableOpacity
      testID={`time-item-android-touchable-${id}`}
      style={styles.item}
      onPress={() => {
        setShowPicker(true);
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.input}>{formatTime(value)}</Text>
      {showPicker && (
        <RNDateTimePicker
          testID={`time-item-android-time-picker-${id}`}
          mode="time"
          value={valueAsDate}
          onChange={onChangeWithDismiss}
        />
      )}
    </TouchableOpacity>
  );
};

type Props = TimeItemProps & {
  os: PlatformOS;
};

/**
 * Allows to modify settings value that store time.
 */
const TimeItem = ({ id, title, value, onChange, os }: Props): JSX.Element => {
  // The time picker requires a proper Date object
  const valueAsDate = new Date("01-01-01 00:00:00");
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
      id={id}
      title={title}
      value={value}
      valueAsDate={valueAsDate}
      onChange={onChangeAsTime}
    />
  ) : (
    <TimeItemIOS
      id={id}
      title={title}
      valueAsDate={valueAsDate}
      onChange={onChangeAsTime}
    />
  );
};

export default TimeItem;
