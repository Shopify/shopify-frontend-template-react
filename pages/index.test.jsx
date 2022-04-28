import { describe, it, expect, vi } from "vitest";
import { Link } from "@shopify/polaris";

import { mount } from "test/mount";
import Index from "./index";
import { ProductsCard } from "components/ProductsCard";

vi.mock("@shopify/polaris", async () => {
  const polaris = await vi.importActual("@shopify/polaris");
  const Layout = ({ children }) => children;
  Layout.Section = ({ children }) => children;

  const Stack = ({ children }) => children;
  Stack.Item = ({ children }) => children;

  return {
    ...polaris,
    Layout,
    Stack,
    Card: ({ children }) => children,
    Page: ({ children }) => children,
    TextContainer: ({ children }) => children,
    Image: () => <img />,
  };
});

vi.mock("components/ProductsCard", () => ({
  ProductsCard: () => <>{"<ProductsCard/>"}</>,
}));

it("renders links to documentation", async () => {
  const component = await mount(<Index />);

  expect(component).toContainReactComponent(Link, {
    url: "https://polaris.shopify.com/",
    external: true,
  });

  expect(component).toContainReactComponent(Link, {
    url: "https://shopify.dev/api/admin-graphql",
    external: true,
  });

  expect(component).toContainReactComponent(Link, {
    url: "https://shopify.dev/apps/tools/app-bridge",
    external: true,
  });

  expect(component).toContainReactComponent(Link, {
    url: "https://shopify.dev/apps/getting-started/add-functionality",
    external: true,
  });
});