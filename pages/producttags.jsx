import {
  LegacyCard,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar, ResourcePicker } from "@shopify/app-bridge-react";

import ProductsTable from "../components/ProductsTable";

import React from "react";

export default function HomePage() {
  const [productSelectorOpen, setProductSelectorOpen] = React.useState(false);
  const [productsTableData, setProductsTableData] = React.useState([]);

  function handleProductSelection(selectPayload) {
    setProductsTableData(selectPayload.selection);
    setProductSelectorOpen(false);
  }

  return (
    <Page narrowWidth>
      <TitleBar
        title="Product Tags"
        primaryAction={{
          content: "Select Products",
          onAction: () => setProductSelectorOpen(true),
        }}
      />
      <Layout>
        <Layout.Section>
          <ProductsTable productsArray={productsTableData} />
        </Layout.Section>
      </Layout>

      {/* Resource picker opens as a modal via App Bridge */}
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={productSelectorOpen}
        onCancel={() => setProductSelectorOpen(false)}
        onSelection={handleProductSelection}
      />
    </Page>
  );
}
