import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import { ActionItemProps } from "./types";

const ActionItem = ({
  title,
  value,
  onChange,
}: ActionItemProps): JSX.Element | null => {
  if (value) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.item} onPress={() => onChange(true)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionItem;
