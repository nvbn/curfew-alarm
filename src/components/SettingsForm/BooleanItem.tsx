import React from "react";
import { Switch, Text, View } from "react-native";

import { isReady } from "../../utils/future";
import styles from "./styles";
import { BooleanItemProps } from "./types";

/**
 * Checkbox/switch settings item for boolean values.
 */
const BooleanItem = ({
  id,
  title,
  value,
  onChange,
}: BooleanItemProps): JSX.Element | null => (
  <View style={[styles.item, styles.booleanItem]}>
    <Text style={styles.title}>{title}</Text>
    {isReady(value) && (
      <Switch
        value={value}
        onValueChange={onChange}
        testID={`boolean-item-switch-${id}`}
      />
    )}
  </View>
);

export default BooleanItem;
