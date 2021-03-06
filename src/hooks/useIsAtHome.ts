import { useContext, useEffect, useState } from "react";

import { NetworkCtx } from "../dependencies/Network";
import { Future, FUTURE_NOT_READY } from "../utils/future";
import { isAtHome } from "../utils/location";

/**
 * A hook that exposes at home or not status.
 */
const useIsAtHome = (deps: unknown[] = []): Future<boolean> => {
  const network = useContext(NetworkCtx);

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
