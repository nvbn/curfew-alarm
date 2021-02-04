import { useContext } from "react";

import { PlatformCtx, PlatformOS } from "../dependencies/Platform";

/**
 * Hooks that provides access to platform OS name.
 */
const usePlatformOS = (): PlatformOS => {
  const { OS } = useContext(PlatformCtx);

  return OS;
};

export default usePlatformOS;
