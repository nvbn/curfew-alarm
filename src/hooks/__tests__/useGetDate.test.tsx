import { renderHook } from "@testing-library/react-hooks";
import React, { PropsWithChildren } from "react";

import DateTime from "../../contexts/DateTime";
import useGetDate from "../useGetDate";

describe("useGetDate", () => {
  test("returns current date/timestamp", () => {
    const current = new Date("2021-01-01T23:15:00 GMT");

    const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
      <DateTime.Provider value={() => current}>{children}</DateTime.Provider>
    );

    const { result } = renderHook(() => useGetDate(), { wrapper });

    expect(result.current()).toEqual(current);
  });
});
