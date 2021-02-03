import { createContext } from "react";

import IDateTime, { DateTimeDefaultImpl } from "../dependencies/IDateTime";

// Only to make testing easier
const DateTime = createContext<IDateTime>(DateTimeDefaultImpl);

export default DateTime;
