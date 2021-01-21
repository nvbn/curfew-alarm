import { Time } from "../../types";

type TypedItemType = "time" | "number";

type BaseTypedItemProps<T, Q extends TypedItemType> = {
  id: string;
  title: string;
  type: TypedItemType;
  value: T;
  onChange: (newValue: T) => void;
};

export type TimeItemProps = BaseTypedItemProps<Time, "time">;

export type NumberItemProps = BaseTypedItemProps<number, "number">;

export type TypedItemProps = TimeItemProps | NumberItemProps;
