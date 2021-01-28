import { Future, FUTURE_NOT_READY, futureMap, isReady } from "../future";

describe("isReady", () => {
  test("not ready isn't ready", () => {
    expect(isReady(FUTURE_NOT_READY)).toBe(false);
  });

  test("ready is ready", () => {
    const future: Future<number> = 42;

    expect(isReady(future)).toBe(true);
  });

  test("futureMap of non-ready", () => {
    const processed = futureMap(FUTURE_NOT_READY, (v: number) => v + 10);

    expect(processed).toBe(FUTURE_NOT_READY);
  });

  test("futureMap of ready", () => {
    const processed = futureMap(23, (v) => v + 10);

    expect(processed).toBe(33);
  });
});
