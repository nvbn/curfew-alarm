import { createContext } from "react";

// Only to make testing easier
const DateTime = createContext(() => new Date());

export default DateTime;
