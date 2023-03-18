import { Banner, Layout, Page } from "@shopify/polaris";
import { useRouteError } from "react-router-dom";

/**
* ErrorBoundary
* @desc General example error element
* more details at https://reactrouter.com/en/main/route/error-element
*/

export default function ErrorBoundary() {
  const error = useRouteError();

  console.error(error);

  return <Page narrowWidth>
    <Layout>
      <Layout.Section>
        <div style={{ marginTop: "100px" }}>
          <Banner title="Oh No!" status="critical">
            <p>We encountered an error</p>
          </Banner>
        </div>
      </Layout.Section>
    </Layout>
  </Page>
}