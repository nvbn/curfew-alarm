import { createContext } from "react";

import INetwork, { NetworkDefaultImpl } from "../dependencies/INetwork";

const Network = createContext<INetwork>(NetworkDefaultImpl);

export default Network;
