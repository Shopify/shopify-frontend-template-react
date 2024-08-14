import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Banner, Layout, Page } from "@shopify/polaris";

export default function ExitIframe() {
  const app = useAppBridge();
  const { search } = useLocation();
  const [showWarning, setShowWarning] = useState(false);

  app.loading(true);

  useEffect(() => {
    if (!!app && !!search) {
      const params = new URLSearchParams(search);
      const redirectUri = params.get("redirectUri");
      const url = new URL(decodeURIComponent(redirectUri));

      if (
        [location.hostname, "admin.shopify.com"].includes(url.hostname) ||
        url.hostname.endsWith(".myshopify.com")
      ) {
        window.open(url, "_top");
      } else {
        setShowWarning(true);
      }
    }
  }, [app, search, setShowWarning]);

  return showWarning ? (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <div style={{ marginTop: "100px" }}>
            <Banner title="Redirecting outside of Shopify" status="warning">
              Apps can only use /exitiframe to reach Shopify or the app itself.
            </Banner>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  ) : null;
}
