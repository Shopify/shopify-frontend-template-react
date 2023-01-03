import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";

import Routes from "./Routes";
import { ShopifyAppProvider } from "./components";

const IS_APP_EMBEDDED = false;

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <BrowserRouter>
      <ShopifyAppProvider embedded={IS_APP_EMBEDDED}>
        {IS_APP_EMBEDDED && (
          <NavigationMenu
            navigationLinks={[
              {
                label: "Page name",
                destination: "/pagename",
              },
            ]}
          />
        )}
        <Routes pages={pages} />
      </ShopifyAppProvider>
    </BrowserRouter>
  );
}
