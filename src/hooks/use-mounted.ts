import { useSyncExternalStore } from "react";

// No external source to observe: the store only distinguishes server/hydration from client.
const subscribe = () => () => {
  /* nothing to unsubscribe */
};

/** false on the server and during hydration, true afterwards. */
export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
