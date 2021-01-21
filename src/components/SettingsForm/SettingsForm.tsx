import React from "react";
import { FlatList } from "react-native";
import { NumberItemProps, TimeItemProps, TypedItemProps } from "./types";
import TimeItem from "./TimeItem";
import NumberItem from "./NumberItem";

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
      }
    }}
    keyExtractor={(item) => item.id}
  />
);

export default SettingsForm;
