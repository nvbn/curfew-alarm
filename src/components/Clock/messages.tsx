import React from "react";
import { COLOR_CURFEW, COLOR_DANGER, COLOR_OK } from "./styles";
import { Text } from "react-native-svg";
import { Time } from "../../types";
import { toMinutes } from "../../utils";

type BaseMessageProps = {
  text: string;
  color: string;
};

const BaseMessage = ({ text, color }: BaseMessageProps): JSX.Element => (
  <Text x={50} y={60} fill={color} textAnchor="middle" fontSize={6}>
    {text}
  </Text>
);

const Fine = (): JSX.Element => (
  <BaseMessage text="You're fine" color={COLOR_OK} />
);

const TimeToGoHome = (): JSX.Element => (
  <BaseMessage text="Time to go home" color={COLOR_DANGER} />
);

const StayAtHome = (): JSX.Element => (
  <BaseMessage text="Stay at home" color={COLOR_CURFEW} />
);

type Props = {
  currentTime: Time;

  curfewStart: Time;
  curfewEnd: Time;

  minutesToGoHome: number;
};

const Message = ({
  currentTime,
  curfewStart,
  curfewEnd,
  minutesToGoHome,
}: Props): JSX.Element => {
  const currentMinute = toMinutes(currentTime);
  const curfewStartMinute = toMinutes(curfewStart);
  const curfewEndMinute = toMinutes(curfewEnd);
  const goHomeStartMinute = curfewStartMinute - minutesToGoHome;

  if (currentMinute >= curfewStartMinute || currentMinute <= curfewEndMinute) {
    return <StayAtHome />;
  } else if (currentMinute >= goHomeStartMinute) {
    return <TimeToGoHome />;
  } else {
    return <Fine />;
  }
};

export default Message;
