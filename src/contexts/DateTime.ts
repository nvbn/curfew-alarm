import { createContext } from "react";

import IDateTime from "../dependencies/IDateTime";

// Only to make testing easier
const DateTime = createContext<IDateTime>(() => new Date());

export default DateTime;
