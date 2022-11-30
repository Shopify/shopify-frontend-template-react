import { useIsFetching } from "react-query";
import { Loading } from "@shopify/app-bridge-react";

export function ReactQueryLoading() {
  const isFetching = useIsFetching();
  return isFetching ? <Loading /> : null;
}
