import { useContext } from "react";

import DateTime from "../contexts/DateTime";

/**
 * Provides access to the current Date, it exists only to simplify testing;
 */
const useGetDate = (): (() => Date) => useContext(DateTime);

export default useGetDate;
