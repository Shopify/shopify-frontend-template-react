import {
  BlockStack,
  Card,
  Page,
  Layout,
  Image,
  InlineStack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} />
      <Layout>
        <Layout.Section>
          <Card>
            <InlineStack wrap={false} gap="2" align="end" blockAlign="center">
              <BlockStack gap="500">
                <Text as="h2" variant="headingMd">
                  {t("HomePage.heading")}
                </Text>
                <p>
                  <Trans
                    i18nKey="HomePage.yourAppIsReadyToExplore"
                    components={{
                      PolarisLink: (
                        <Link url="https://polaris.shopify.com/" external />
                      ),
                      AdminApiLink: (
                        <Link
                          url="https://shopify.dev/api/admin-graphql"
                          external
                        />
                      ),
                      AppBridgeLink: (
                        <Link
                          url="https://shopify.dev/apps/tools/app-bridge"
                          external
                        />
                      ),
                    }}
                  />
                </p>
                <p>{t("HomePage.startPopulatingYourApp")}</p>
                <p>
                  <Trans
                    i18nKey="HomePage.learnMore"
                    components={{
                      ShopifyTutorialLink: (
                        <Link
                          url="https://shopify.dev/apps/getting-started/add-functionality"
                          external
                        />
                      ),
                    }}
                  />
                </p>
              </BlockStack>
              <div style={{ padding: "0 20px" }}>
                <Image
                  source={trophyImage}
                  alt={t("HomePage.trophyAltText")}
                  width={120}
                />
              </div>
            </InlineStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
