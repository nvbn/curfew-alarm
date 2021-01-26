import React from "react";
import { Path } from "react-native-svg";

const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  d: number,
): [number, number] => {
  const dRadians = ((d - 90) * Math.PI) / 180;

  return [cx + r * Math.cos(dRadians), cy + r * Math.sin(dRadians)];
};

// Based on https://stackoverflow.com/a/18473154
const makeArc = (
  cx: number,
  cy: number,
  r: number,
  start: number,
  end: number,
): string => {
  const adjustedEnd = end < start ? end + 360 : end;

  const [startX, startY] = polarToCartesian(cx, cy, r, adjustedEnd); // swap?
  const [endX, endY] = polarToCartesian(cx, cy, r, start);

  const largeArcFlag = adjustedEnd - start <= 180 ? 0 : 1;

  return `
    M ${startX} ${startY}
    A ${r} ${r} 0 ${largeArcFlag} 0 ${endX} ${endY}
  `;
};

type Props = {
  startMinute: number;
  endMinute: number;
  color: string;
  width: number;
  cx: number;
  cy: number;
  r: number;
};

/**
 * SVG arc from `startMinute` to `endMinute`.
 */
const Arc = ({
  startMinute,
  endMinute,
  color,
  width,
  cx,
  cy,
  r,
}: Props): JSX.Element => (
  <Path
    d={makeArc(cx, cy, r, startMinute / 4, endMinute / 4)}
    stroke={color}
    fill="none"
    strokeWidth={width}
  />
);

export default Arc;
