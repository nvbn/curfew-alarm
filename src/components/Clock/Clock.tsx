import React from "react";
import Svg, { Circle, Text } from "react-native-svg";
import Arc from "./Arc";
import Message from "./messages";
import styles, {
  COLOR_CURFEW,
  COLOR_CURRENT,
  COLOR_DANGER,
  COLOR_EMPTY,
  COLOR_OK,
} from "./styles";
import { formatTime, Time, toMinutes } from "../../utils/time";
import { getStatus } from "../../utils/status";

type Props = {
  isAtHome: boolean;
  currentTime: Time;

  curfewStart: Time;
  curfewEnd: Time;

  minutesToGoHome: number;
};

const Clock = ({
  isAtHome,
  currentTime,
  curfewStart,
  curfewEnd,
  minutesToGoHome,
}: Props): JSX.Element => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    style={styles.container}
  >
    <Circle cx={50} cy={50} r={45} fill={COLOR_OK} />
    <Arc
      cx={50}
      cy={50}
      r={40}
      width={10}
      color={COLOR_CURFEW}
      startMinute={toMinutes(curfewStart)}
      endMinute={toMinutes(curfewEnd)}
    />
    <Arc
      cx={50}
      cy={50}
      r={40}
      width={10}
      color={COLOR_DANGER}
      startMinute={toMinutes(curfewStart) - minutesToGoHome}
      endMinute={toMinutes(curfewStart)}
    />
    <Circle cx={50} cy={50} r={40} fill={COLOR_EMPTY} />
    <Arc
      cx={50}
      cy={50}
      r={42.5}
      width={10}
      color={COLOR_CURRENT}
      startMinute={toMinutes(currentTime) - 1}
      endMinute={toMinutes(currentTime) + 1}
    />
    <Text x={50} y={50} fill="#000000" textAnchor="middle" fontSize={16}>
      {formatTime(currentTime)}
    </Text>
    <Message
      status={getStatus(
        isAtHome,
        currentTime,
        curfewStart,
        curfewEnd,
        minutesToGoHome,
      )}
    />
  </Svg>
);

export default Clock;
