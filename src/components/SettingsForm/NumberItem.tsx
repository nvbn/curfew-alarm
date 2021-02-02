import React, { useCallback, useRef } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

import { isReady } from "../../utils/future";
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

  const inputRef = useRef<TextInput>(null);

  return (
    <TouchableWithoutFeedback
      testID={`number-item-touchable-${id}`}
      onPress={() => inputRef.current?.focus()}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        {isReady(value) ? (
          <TextInput
            ref={inputRef}
            testID={`number-item-input-${id}`}
            keyboardType="number-pad"
            defaultValue={value.toString()}
            onChangeText={onChangeAsNumber}
            style={styles.input}
          />
        ) : (
          <TextInput editable={false} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NumberItem;
