import { useIsFetching } from "react-query";
import { Loading } from "@shopify/app-bridge-react";

export function LoadingProvider({ children }) {
  const isFetching = useIsFetching();
  return (
    <>
      {isFetching ? <Loading /> : null}
      {children}
    </>
  );
}
