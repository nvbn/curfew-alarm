import { useContext } from "react";

import Platform from "../contexts/Platform";

const usePlatformOS = (): string => {
  const { OS } = useContext(Platform);

  return OS;
};

export default usePlatformOS;
