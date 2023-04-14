import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge, Loading } from "@shopify/app-bridge-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ExitIframe() {
  const app = useAppBridge();
  const { search } = useLocation();

  useEffect(() => {
    if (!!app && !!search) {
      const params = new URLSearchParams(search);
      const redirectUri = params.get("redirectUri");
      const url = new URL(decodeURIComponent(redirectUri));

      if (
        [location.hostname, "admin.shopify.com"].includes(url.hostname) ||
        url.hostname.endsWith(".myshopify.com")
      ) {
        const redirect = Redirect.create(app);
        redirect.dispatch(
          Redirect.Action.REMOTE,
          decodeURIComponent(redirectUri)
        );
      } else {
        console.warn(
          "/exitiframe redirect target is not in the app or a Shopify domain, refusing to redirect"
        );
      }
    }
  }, [app, search]);

  return <Loading />;
}
