import React from "react";
import { FlatList } from "react-native";

import ActionItem from "./ActionItem";
import NumberItem from "./NumberItem";
import TimeItem from "./TimeItem";
import {
  ActionItemProps,
  NumberItemProps,
  TimeItemProps,
  TypedItemProps,
} from "./types";

type Props = {
  options: TypedItemProps[];
};

const SettingsForm = ({ options }: Props): JSX.Element => (
  <FlatList
    data={options}
    renderItem={({ item }) => {
      switch (item.type) {
        case "time":
          return <TimeItem {...(item as TimeItemProps)} />;
        case "number":
          return <NumberItem {...(item as NumberItemProps)} />;
        case "action":
          return <ActionItem {...(item as ActionItemProps)} />;
      }
    }}
    keyExtractor={(item) => item.id}
  />
);

export default SettingsForm;
