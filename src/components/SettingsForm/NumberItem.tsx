import React, { useCallback } from "react";
import { Text, TextInput, View } from "react-native";
import styles from "./styles";
import { NumberItemProps } from "./types";

const NumberItem = ({ title, value, onChange }: NumberItemProps) => {
  const onChangeAsNumber = useCallback(
    (textValue) => {
      const nextValue = parseInt(textValue, 10);
      if (!isNaN(nextValue)) {
        onChange(nextValue);
      }
    },
    [onChange],
  );

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        keyboardType="number-pad"
        defaultValue={value.toString()}
        onChangeText={onChangeAsNumber}
        style={styles.input}
      />
    </View>
  );
};

export default NumberItem;
