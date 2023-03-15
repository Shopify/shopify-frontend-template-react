import { Page, Layout } from "@shopify/polaris";
import { TitleBar, ResourcePicker, useToast } from "@shopify/app-bridge-react";

import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import ProductsTable from "../components/ProductsTable";
import ProductTagsInput from "../components/ProductTagsInput";

import React, { useState } from "react";

export default function HomePage() {
  // Custom implementation of fetch that adds Shopify auth
  const fetch = useAuthenticatedFetch();
  const { show } = useToast();
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);
  const [productsTableData, setProductsTableData] = useState([]);
  const [tagsToUpdate, setTagsToUpdate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleProductSelection(selectPayload) {
    setProductsTableData(selectPayload.selection);
    setProductSelectorOpen(false);
  }

  async function addTags(params) {
    setIsLoading(true);
    const response = await fetch("/api/producttags", {
      method: "POST",
      body: JSON.stringify({ products: params, tags: tagsToUpdate }),
      headers: { "Content-Type": "application/json" },
    });
    setIsLoading(false);

    if (response?.ok) {
      show("Tags added successfully, they may not show immediately");
    } else {
      show("Error adding tags, please try again", { isError: true });
      console.error("error response", response);
    }
  }

  async function removeTags(params) {
    setIsLoading(true);
    const response = await fetch("/api/producttags", {
      method: "DELETE",
      body: JSON.stringify({ products: params, tags: tagsToUpdate }),
      headers: { "Content-Type": "application/json" },
    });
    setIsLoading(false);

    if (response?.ok) {
      show("Tags removed successfully, they may still show for a while");
    } else {
      show("Error removing tags, please try again", { isError: true });
      console.error("error response", response);
    }
  }

  async function getTags() {
    const response = await fetch("/api/producttags", {
      method: "GET",
    });

    if (response?.ok) {
      const data = await response.json();
      return data?.tags || [];
    } else {
      show("Error getting tags", { isError: true });
      console.error("error response", response);
    }
  }

  return (
    <Page narrowWidth>
      <TitleBar
        title="Product Tagger"
        primaryAction={{
          content: "Select Products",
          onAction: () => setProductSelectorOpen(true),
        }}
      />
      <Layout>
        <Layout.Section>
          <ProductTagsInput
            getTags={getTags}
            tagsToUpdate={tagsToUpdate}
            setTagsToUpdate={setTagsToUpdate}
          />
        </Layout.Section>
        <Layout.Section>
          <ProductsTable
            productsArray={productsTableData}
            addTags={addTags}
            removeTags={removeTags}
            isLoading={isLoading}
            tagsToUpdate={tagsToUpdate}
          />
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
