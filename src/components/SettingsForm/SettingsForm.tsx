import React from "react";
import { FlatList } from "react-native";

import BooleanItem from "./BooleanItem";
import NumberItem from "./NumberItem";
import TimeItem from "./TimeItem";
import {
  BooleanItemProps,
  NumberItemProps,
  TimeItemProps,
  TypedItemProps,
} from "./types";

type Props = {
  options: Omit<TypedItemProps, "os">[];
  os: string;
};

/**
 * A form with editable settings options.
 */
const SettingsForm = ({ options, os }: Props): JSX.Element => (
  <FlatList
    data={options}
    renderItem={({ item }) => {
      switch (item.type) {
        case "time":
          return <TimeItem {...(item as TimeItemProps)} os={os} />;
        case "number":
          return <NumberItem {...(item as NumberItemProps)} />;
        case "boolean":
          return <BooleanItem {...(item as BooleanItemProps)} />;
      }
    }}
    keyExtractor={(item) => item.id}
  />
);

export default SettingsForm;
