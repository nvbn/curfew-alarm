import { createContext } from "react";

import IConstants, { ConstantsDefaultImpl } from "../dependencies/IConstants";

const Constants = createContext<IConstants>(ConstantsDefaultImpl);

export default Constants;
