import { useContext, useEffect, useState } from "react";
import NetworkStatus from "../contexts/NetworkStatus";
import { isAtHome } from "../utils/location";

const useIsAtHome = (deps: unknown[] = []): boolean | null => {
  const network = useContext(NetworkStatus);

  const [isAtHomeStatus, setIsAtHomeStatus] = useState<boolean | null>(null);
  useEffect(
    () => {
      isAtHome(network)
        .then(setIsAtHomeStatus)
        .catch((e) => console.warn("unable to determine at home or not", e));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network, ...deps],
  );

  return isAtHomeStatus;
};

export default useIsAtHome;
