import { useContext } from "react";
import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { ShopifyAppContext } from "../components/providers/ShopifyAppProvider";

export default function PageName() {
  const appContext = useContext(ShopifyAppContext);

  return (
    <Page>
      {appContext.embedded && (
        <TitleBar
          title="Page name"
          primaryAction={{
            content: "Primary action",
            onAction: () => console.log("Primary action"),
          }}
          secondaryActions={[
            {
              content: "Secondary action",
              onAction: () => console.log("Secondary action"),
            },
          ]}
        />
      )}
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
