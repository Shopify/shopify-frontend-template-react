import { Card, EmptyState, Page } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { notFoundImage } from "../assets";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Page>
      <Card>
        <EmptyState heading={t("NotFound.heading")} image={notFoundImage}>
          <p>{t("NotFound.description")}</p>
        </EmptyState>
      </Card>
    </Page>
  );
}
