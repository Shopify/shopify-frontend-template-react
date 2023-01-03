import React from "react";

import { AppBridgeProvider, QueryProvider, PolarisProvider } from ".";

export const ShopifyAppContext = React.createContext({ embedded: true });

export function ShopifyAppProvider({ children, embedded = false }) {
  let appProvider = <QueryProvider>{children}</QueryProvider>;
  if (embedded) {
    appProvider = <AppBridgeProvider>{appProvider}</AppBridgeProvider>;
  }

  return (
    <ShopifyAppContext.Provider value={{ embedded }}>
      <PolarisProvider>{appProvider}</PolarisProvider>;
    </ShopifyAppContext.Provider>
  );
}
