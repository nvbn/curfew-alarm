import { useContext, useEffect, useState } from "react";
import NetworkStatus from "../contexts/NetworkStatus";
import { isAtHome } from "../utils/location";

type IsAtHome = [boolean, boolean | null];

const useIsAtHome = (deps: unknown[] = []): IsAtHome => {
  const network = useContext(NetworkStatus);

  const [isAtHomeStatus, setIsAtHomeStatus] = useState<boolean | null>(null);
  useEffect(() => {
    isAtHome(network)
      .then(setIsAtHomeStatus)
      .catch((e) => console.warn("unable to determine at home or not", e));
  }, deps);

  if (isAtHomeStatus === null) {
    return [false, null];
  } else {
    return [true, isAtHomeStatus];
  }
};

export default useIsAtHome;
