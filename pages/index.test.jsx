import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderApp } from "test/renderApp";
import Index from "./index";

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

it("renders a heading", async () => {
  renderApp(<Index />);

  expect(
    screen.getByRole("heading", {
      name: /Shopify app 🎉/,
    })
  ).toBeInTheDocument();
});

it("renders links to documentation", async () => {
  renderApp(<Index />);

  expect(
    screen.getByRole("link", {
      name: /Polaris/,
      url: "https://polaris.shopify.com/",
      target: "_blank",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", {
      name: /Admin API/,
      url: "https://shopify.dev/api/admin-graphql",
      target: "_blank",
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", {
      name: /App Bridge/,
      url: "https://shopify.dev/apps/tools/app-bridge",
      target: "_blank",
    })
  ).toBeInTheDocument();
});

it("renders links to a tutorial", async () => {
  renderApp(<Index />);

  expect(
    screen.getByRole("link", {
      name: /tutorial/,
      url: "https://shopify.dev/apps/getting-started/add-functionality",
      target: "_blank",
    })
  ).toBeInTheDocument();
});

it("renders a <ProductsCard/>", async () => {
  renderApp(<Index />);

  expect(screen.getByText("<ProductsCard/>")).toBeInTheDocument();
});
