import {
  getStatus,
  Status,
  STATUS_FINE,
  STATUS_GO_HOME_WHEN_CURFEW,
  STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME,
  STATUS_STAY_AT_HOME_WHEN_CURFEW,
  STATUS_STAY_AT_HOME_WHEN_TIME_TO_GO_HOME,
} from "../status";

describe("getStatus", () => {
  for (const [params, expectedStatus] of [
    [
      [
        false,
        false,
        { hour: 22, minute: 15 },
        { hour: 21, minute: 45 },
        { hour: 4, minute: 15 },
        20,
      ],
      STATUS_FINE,
    ],
    [
      [
        true,
        false,
        { hour: 10, minute: 15 },
        { hour: 21, minute: 45 },
        { hour: 4, minute: 15 },
        20,
      ],
      STATUS_FINE,
    ],
    [
      [
        true,
        true,
        { hour: 11, minute: 15 },
        { hour: 20, minute: 42 },
        { hour: 14, minute: 15 },
        30,
      ],
      STATUS_FINE,
    ],
    [
      [
        true,
        false,
        { hour: 19, minute: 50 },
        { hour: 20, minute: 0 },
        { hour: 23, minute: 30 },
        15,
      ],
      STATUS_GO_HOME_WHEN_TIME_TO_GO_HOME,
    ],
    [
      [
        true,
        true,
        { hour: 18, minute: 35 },
        { hour: 19, minute: 5 },
        { hour: 5, minute: 45 },
        60,
      ],
      STATUS_STAY_AT_HOME_WHEN_TIME_TO_GO_HOME,
    ],
    [
      [
        true,
        false,
        { hour: 20, minute: 50 },
        { hour: 20, minute: 0 },
        { hour: 23, minute: 30 },
        15,
      ],
      STATUS_GO_HOME_WHEN_CURFEW,
    ],
    [
      [
        true,
        true,
        { hour: 20, minute: 35 },
        { hour: 19, minute: 5 },
        { hour: 5, minute: 45 },
        60,
      ],
      STATUS_STAY_AT_HOME_WHEN_CURFEW,
    ],
  ] as [Parameters<typeof getStatus>, Status][]) {
    test(`for ${JSON.stringify(params)} returns ${expectedStatus}`, () => {
      const result = getStatus(...params);

      expect(result).toBe(expectedStatus);
    });
  }
});
