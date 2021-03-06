import { Future } from "../../utils/future";
import { Time } from "../../utils/time";

type TypedItemType = "time" | "number" | "boolean";

type BaseTypedItemProps<T, Q extends TypedItemType> = {
  id: string;
  title: string;
  type: Q;
  value: Future<T>;
  onChange: (newValue: T) => void;
};

export type TimeItemProps = BaseTypedItemProps<Time, "time">;

export type NumberItemProps = BaseTypedItemProps<number, "number">;

export type BooleanItemProps = BaseTypedItemProps<boolean, "boolean">;

export type TypedItemProps = TimeItemProps | NumberItemProps | BooleanItemProps;
