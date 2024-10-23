import { BlockStack, Card, Page, Layout, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function PageName() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t("PageName.title")}>
        <button variant="primary" onClick={() => console.log("Primary action")}>
          {t("PageName.primaryAction")}
        </button>
        <button onClick={() => console.log("Secondary action")}>
          {t("PageName.secondaryAction")}
        </button>
      </TitleBar>
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <Text variant="headingMd" as="h2">
              {t("PageName.heading")}
            </Text>
            <BlockStack gap="400">
              <p>{t("PageName.body")}</p>
            </BlockStack>
          </Card>
          <Card>
            <Text variant="headingMd" as="h2">
              {t("PageName.heading")}
            </Text>
            <BlockStack gap="400">
              <p>{t("PageName.body")}</p>
            </BlockStack>
          </Card>
          </BlockStack>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <Text variant="headingMd" as="h2">
              {t("PageName.heading")}
            </Text>
            <BlockStack gap="400">
              <p>{t("PageName.body")}</p>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
