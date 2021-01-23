import { useContext } from "react";

import Platform from "../contexts/Platform";
import { PlatformOS } from "../dependencies/IPlatform";

/**
 * Hooks that provides access to platform OS name.
 */
const usePlatformOS = (): PlatformOS => {
  const { OS } = useContext(Platform);

  return OS;
};

export default usePlatformOS;
