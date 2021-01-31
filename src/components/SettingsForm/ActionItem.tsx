import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { isReady } from "../../utils/future";
import styles from "./styles";
import { ActionItemProps } from "./types";

/**
 * Settings action that only visible when an action hasn't been performed yet.
 */
const ActionItem = ({
  id,
  title,
  value,
  onChange,
}: ActionItemProps): JSX.Element | null => {
  if (value || !isReady(value)) {
    return null;
  }

  return (
    <TouchableOpacity
      testID={`action-item-touchable-${id}`}
      style={styles.item}
      onPress={() => onChange(true)}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionItem;
