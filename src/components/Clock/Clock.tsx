import React from "react";
import Svg, { Circle, Text } from "react-native-svg";

import { getStatus } from "../../utils/status";
import { formatTime, Time, toMinutes } from "../../utils/time";
import Arc from "./Arc";
import Message from "./Message";
import styles, {
  CLOCK_CENTER_X,
  CLOCK_CENTER_Y,
  CLOCK_CURRENT_TIME_ARC_RADIUS,
  CLOCK_CURRENT_TIME_ARC_WIDTH,
  CLOCK_CURRENT_TIME_FONT_SIZE,
  CLOCK_CURRENT_TIME_TEXT_ANCHOR,
  CLOCK_EMPTY_CIRCLE_RADIUS,
  CLOCK_FINE_CIRCLE_RADIUS,
  CLOCK_HEIGHT,
  CLOCK_VIEWBOX,
  CLOCK_WARNING_ARC_RADIUS,
  CLOCK_WARNING_ARC_WIDTH,
  CLOCK_WIDTH,
  COLOR_CURFEW,
  COLOR_CURRENT,
  COLOR_DANGER,
  COLOR_EMPTY,
  COLOR_OK,
  COLOR_TEXT,
} from "./styles";

type Props = {
  enabled: boolean;
  isAtHome: boolean;
  currentTime: Time;

  curfewStart: Time;
  curfewEnd: Time;

  minutesToGoHome: number;
};

type WarningsArcsProps = {
  curfewStart: Time;
  curfewEnd: Time;
  minutesToGoHome: number;
};

const WarningArcs = ({
  curfewStart,
  curfewEnd,
  minutesToGoHome,
}: WarningsArcsProps): JSX.Element => (
  <>
    <Arc
      cx={CLOCK_CENTER_X}
      cy={CLOCK_CENTER_Y}
      r={CLOCK_WARNING_ARC_RADIUS}
      width={CLOCK_WARNING_ARC_WIDTH}
      color={COLOR_CURFEW}
      startMinute={toMinutes(curfewStart)}
      endMinute={toMinutes(curfewEnd)}
    />
    <Arc
      cx={CLOCK_CENTER_X}
      cy={CLOCK_CENTER_Y}
      r={CLOCK_WARNING_ARC_RADIUS}
      width={CLOCK_WARNING_ARC_WIDTH}
      color={COLOR_DANGER}
      startMinute={toMinutes(curfewStart) - minutesToGoHome}
      endMinute={toMinutes(curfewStart)}
    />
  </>
);

/**
 * Clock that displays time, indicates when the curfew starts,
 * indicates when to go home, and shows a message with expected action.
 */
const Clock = ({
  enabled,
  isAtHome,
  currentTime,
  curfewStart,
  curfewEnd,
  minutesToGoHome,
}: Props): JSX.Element => (
  <Svg
    width={CLOCK_WIDTH}
    height={CLOCK_HEIGHT}
    viewBox={CLOCK_VIEWBOX}
    style={styles.container}
  >
    <Circle
      cx={CLOCK_CENTER_X}
      cy={CLOCK_CENTER_Y}
      r={CLOCK_FINE_CIRCLE_RADIUS}
      fill={COLOR_OK}
    />
    {enabled && (
      <WarningArcs
        curfewStart={curfewStart}
        curfewEnd={curfewEnd}
        minutesToGoHome={minutesToGoHome}
      />
    )}
    <Circle
      cx={CLOCK_CENTER_X}
      cy={CLOCK_CENTER_Y}
      r={CLOCK_EMPTY_CIRCLE_RADIUS}
      fill={COLOR_EMPTY}
    />
    <Arc
      cx={CLOCK_CENTER_X}
      cy={CLOCK_CENTER_Y}
      r={CLOCK_CURRENT_TIME_ARC_RADIUS}
      width={CLOCK_CURRENT_TIME_ARC_WIDTH}
      color={COLOR_CURRENT}
      startMinute={toMinutes(currentTime) - 1}
      endMinute={toMinutes(currentTime) + 1}
    />
    <Text
      x={CLOCK_CENTER_X}
      y={CLOCK_CENTER_Y}
      fill={COLOR_TEXT}
      textAnchor={CLOCK_CURRENT_TIME_TEXT_ANCHOR}
      fontSize={CLOCK_CURRENT_TIME_FONT_SIZE}
    >
      {formatTime(currentTime)}
    </Text>
    <Message
      status={getStatus(
        enabled,
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
