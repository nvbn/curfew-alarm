import { useContext } from "react";

import DateTime from "../contexts/DateTime";
import { dateToTime, Time } from "../utils/time";

/**
 * Provides access to the current internal Time, it exists only to simplify testing;
 */
const useGetTime = (): (() => Time) => {
  const getDate = useContext(DateTime);

  return () => dateToTime(getDate());
};

export default useGetTime;
