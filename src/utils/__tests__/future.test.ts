import { Future, FUTURE_NOT_READY, isReady } from "../future";

describe("isReady", () => {
  test("not ready isn't ready", () => {
    expect(isReady(FUTURE_NOT_READY)).toBe(false);
  });

  test("ready is ready", () => {
    const future: Future<number> = 42;

    expect(isReady(future)).toBe(true);
  });
});
