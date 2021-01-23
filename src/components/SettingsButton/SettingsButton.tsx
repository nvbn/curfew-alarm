import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

import styles from "./styles";

type Props = {
  onPress: () => void;
};

/**
 * A button to reach settings from the navbar.
 */
const SettingsButton = ({ onPress }: Props): JSX.Element => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Ionicons name="ios-settings-outline" size={24} color="black" />
  </TouchableOpacity>
);

export default SettingsButton;
