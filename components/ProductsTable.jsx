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

export default function ProductsTable({
  productsArray,
  addTags,
  removeTags,
  isLoading = false,
  tagsToUpdate,
}) {
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productsArray);

  const promotedBulkActions = [
    {
      content: "Add selected tags",
      onAction: () => addTags(selectedResources),
    },
    {
      content: "Remove selected tags",
      onAction: () => removeTags(selectedResources),
    },
  ];

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
          singular: "Product tags",
          plural: "Products and tags",
        }}
        itemCount={productsArray.length}
        loading={isLoading}
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
