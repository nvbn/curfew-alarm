import React from "react";
import { COLOR_CURFEW, COLOR_DANGER, COLOR_OK } from "./styles";
import { Text } from "react-native-svg";
import {
  Status,
  STATUS_FINE,
  STATUS_GO_HOME_WHEN_CURFEW,
  STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME,
  STATUS_STAY_AT_HOME_WHEN_CURFEW,
  STATUS_STAY_AT_HOME_WHEN_TIME_TO_GO_HOME,
} from "../../utils/status";

type BaseMessageProps = {
  text: string;
  color: string;
};

const BaseMessage = ({ text, color }: BaseMessageProps): JSX.Element => (
  <Text x={50} y={60} fill={color} textAnchor="middle" fontSize={6}>
    {text}
  </Text>
);

type Props = {
  status: Status;
};

const Message = ({ status }: Props): JSX.Element => {
  switch (status) {
    case STATUS_FINE:
      return <BaseMessage text="You're fine" color={COLOR_OK} />;
    case STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME:
      return <BaseMessage text="Time to go home" color={COLOR_DANGER} />;
    case STATUS_STAY_AT_HOME_WHEN_TIME_TO_GO_HOME:
      return <BaseMessage text="Stay at home" color={COLOR_DANGER} />;
    case STATUS_GO_HOME_WHEN_CURFEW:
      return <BaseMessage text="Go home!" color={COLOR_CURFEW} />;
    case STATUS_STAY_AT_HOME_WHEN_CURFEW:
      return <BaseMessage text="Stay at home" color={COLOR_CURFEW} />;
  }
};

export default Message;
