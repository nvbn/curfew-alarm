import { createContext } from "react";

import IPlatform, { PlatformDefaultImpl } from "../dependencies/IPlatform";

const Platform = createContext<IPlatform>(PlatformDefaultImpl);

export default Platform;
