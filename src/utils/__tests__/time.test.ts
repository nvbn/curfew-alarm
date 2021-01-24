import {
  dateToTime,
  formatTime,
  isValidTime,
  Time,
  timeToDate,
  toMinutes,
} from "../time";

describe("toMinutes", () => {
  for (const [time, expectedMinutes] of [
    [{ hour: 10, minute: 25 }, 625],
    [{ hour: 20, minute: 0 }, 1200],
    [{ hour: 0, minute: 15 }, 15],
  ] as [Time, number][]) {
    test(`${JSON.stringify(time)} to ${expectedMinutes}`, () => {
      const minutes = toMinutes(time);

      expect(minutes).toEqual(expectedMinutes);
    });
  }
});

describe("dateToTime", () => {
  test("returns internal Time for js Date", () => {
    const date = new Date();
    date.setHours(10);
    date.setMinutes(25);

    const time = dateToTime(date);
    expect(time).toEqual({
      hour: 10,
      minute: 25,
    });
  });
});

describe("timeToDate", () => {
  test("returns Date for internal Time", () => {
    const time = { hour: 12, minute: 45 };

    const date = timeToDate(time);
    expect(date.getHours()).toBe(time.hour);
    expect(date.getMinutes()).toBe(time.minute);
  });
});

describe("formatTime", () => {
  for (const [time, expectedFormatted] of [
    [{ hour: 10, minute: 25 }, "10:25"],
    [{ hour: 20, minute: 0 }, "20:00"],
    [{ hour: 0, minute: 15 }, "00:15"],
    [{ hour: 9, minute: 7 }, "09:07"],
  ] as [Time, string][]) {
    test(`${JSON.stringify(time)} => ${expectedFormatted}`, () => {
      const formatted = formatTime(time);

      expect(formatted).toEqual(expectedFormatted);
    });
  }
});

describe("isValidTime", () => {
  for (const [value, expectedIsValid] of [
    [null, false],
    [NaN, false],
    ["time", false],
    [{ hour: 20 }, false],
    [{ minute: 20 }, false],
    [{ hour: NaN, minute: 15 }, false],
    [{ hour: 10, minute: "12" }, false],
    [{ hour: 24, minute: 0 }, false],
    [{ hour: -1, minute: 10 }, false],
    [{ hour: 10, minute: 15 }, true],
    [{ hour: 23, minute: 0 }, true],
    [{ hour: 0, minute: 30 }, true],
  ]) {
    test(`${JSON.stringify(value)} => ${expectedIsValid}`, () => {
      const isValid = isValidTime(value);

      expect(isValid).toBe(expectedIsValid);
    });
  }
});
