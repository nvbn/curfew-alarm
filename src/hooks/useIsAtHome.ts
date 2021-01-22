import { useContext, useEffect, useState } from "react";
import NetworkStatus from "../contexts/NetworkStatus";
import { isAtHome } from "../utils/location";
import { Future, FUTURE_NOT_READY } from "../utils/future";

const useIsAtHome = (deps: unknown[] = []): Future<boolean> => {
  const network = useContext(NetworkStatus);

  const [isAtHomeStatus, setIsAtHomeStatus] = useState<Future<boolean>>(
    FUTURE_NOT_READY,
  );
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
