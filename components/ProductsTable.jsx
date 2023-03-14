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

export default function ProductsTable({ productsArray }) {
  const resourceName = {
    singular: "Selected Product",
    plural: "Selected Products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(productsArray);

  const promotedBulkActions = [
    {
      content: "Edit products",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
  ];
  const bulkActions = [
    {
      content: "Add tags",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Remove tags",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      content: "Delete products",
      onAction: () => console.log("Todo: implement bulk delete"),
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
        resourceName={resourceName}
        itemCount={productsArray.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        bulkActions={bulkActions}
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
