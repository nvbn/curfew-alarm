import { Time } from "../../utils/time";

type TypedItemType = "time" | "number" | "action";

type BaseTypedItemProps<T, Q extends TypedItemType> = {
  id: string;
  title: string;
  type: TypedItemType;
  value: T;
  onChange: (newValue: T) => void;
};

export type TimeItemProps = BaseTypedItemProps<Time, "time">;

export type NumberItemProps = BaseTypedItemProps<number, "number">;

export type ActionItemProps = BaseTypedItemProps<boolean, "action">;

export type TypedItemProps = TimeItemProps | NumberItemProps | ActionItemProps;
