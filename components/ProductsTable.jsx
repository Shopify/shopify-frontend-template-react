import {
  IndexTable,
  LegacyCard,
  LegacyStack,
  useIndexResourceState,
  Text,
  Badge,
  EmptySearchResult,
} from "@shopify/polaris";
import React from "react";

import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";

export default function ProductsTable({ productsArray }) {
  // Custom implementation of fetch that adds Shopify auth
  const fetch = useAuthenticatedFetch();

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productsArray);

  const promotedBulkActions = [
    {
      content: "Add tags",
      onAction: () => addTags(selectedResources),
    },
    {
      content: "Remove tags",
      onAction: () => removeTags(selectedResources),
    },
  ];

  async function addTags(params) {
    console.log("adding tags to backend", params);

    const response = await fetch("/api/producttags", {
      method: "POST",
      body: JSON.stringify({ products: params, tags: ["test"] }),
      headers: { "Content-Type": "application/json" },
    });

    if (response?.ok) {
      const data = await response.json();
      console.log("success", data);
    } else {
      console.log("error", response);
    }
  }

  async function removeTags(params) {
    console.log("removing tags to backend", params);

    const response = await fetch("/api/producttags", {
      method: "DELETE",
      body: JSON.stringify({ products: params, tags: ["test"] }),
      headers: { "Content-Type": "application/json" },
    });

    if (response?.ok) {
      const data = await response.json();
      console.log("success", data);
    } else {
      console.log("error", response);
    }
  }

  const rowMarkup = productsArray.map(({ id, title, tags }, index) => (
    <IndexTable.Row
      id={id}
      key={id}
      selected={selectedResources.includes(id)}
      position={index}
    >
      <IndexTable.Cell>
        <Text fontWeight="bold" as="span">
          {title}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <LegacyStack spacing="tight">
          {tags.map((tag) => (
            <Badge>{tag}</Badge>
          ))}
        </LegacyStack>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <LegacyCard>
      <IndexTable
        resourceName={{
          singular: "Selected Product",
          plural: "Selected Products",
        }}
        itemCount={productsArray.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        promotedBulkActions={promotedBulkActions}
        headings={[{ title: "Name" }, { title: "Tags" }]}
        emptyState={<EmptyState />}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

function EmptyState() {
  return (
    <EmptySearchResult
      title={"No products selected"}
      description={"Select products to explore their tags"}
      withIllustration
    />
  );
}
