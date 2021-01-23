import React, { useCallback } from "react";
import { Text, TextInput, View } from "react-native";

import styles from "./styles";
import { NumberItemProps } from "./types";

/**
 * Allows to modify numeric setting value.
 */
const NumberItem = ({
  id,
  title,
  value,
  onChange,
}: NumberItemProps): JSX.Element => {
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
        testID={`number-item-input-${id}`}
        keyboardType="number-pad"
        defaultValue={value.toString()}
        onChangeText={onChangeAsNumber}
        style={styles.input}
      />
    </View>
  );
};

export default NumberItem;
