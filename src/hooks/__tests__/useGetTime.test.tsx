import { renderHook } from "@testing-library/react-hooks";
import React, { PropsWithChildren } from "react";

import { DateTimeCtx } from "../../dependencies/DateTime";
import { timeToDate } from "../../utils/time";
import useGetTime from "../useGetTime";

describe("useGetTime", () => {
  test("returns current Time", () => {
    const currentTime = { hour: 23, minute: 15 };
    const current = timeToDate(currentTime);

    const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
      <DateTimeCtx.Provider value={() => current}>
        {children}
      </DateTimeCtx.Provider>
    );

    const { result } = renderHook(() => useGetTime(), { wrapper });

    expect(result.current()).toEqual(currentTime);
  });
});
