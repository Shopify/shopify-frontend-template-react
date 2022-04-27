import { vi } from "vitest";
import { createMount } from "@shopify/react-testing";
import { PolarisTestProvider } from "@shopify/polaris";
import { AppBridgeContext } from "@shopify/app-bridge-react/context";
import { GraphQLProvider } from "components/providers/GraphQLProvider";
import { MemoryRouter, useParams } from "react-router-dom";

import { mount } from "test/mount";

import Routes from "./Routes";

const Index = () => null;
const CamelCase = () => null;

const pages = {
  "./pages/index.jsx": {
    default: Index,
  },
  "./pages/blog/[id].jsx": {
    default: () => {
      const { id } = useParams();
      return `${id}`;
    },
  },
  "./pages/[...catchAll].jsx": {
    default: () => {
      const { catchAll } = useParams();
      return `${catchAll}`;
    },
  },
  "./pages/CamelCase.jsx": {
    default: CamelCase,
  },
};

it("renders index routes", async () => {
  const component = await mount(
    <MemoryRouter initialEntries={[""]}>
      <Routes pages={pages} />
    </MemoryRouter>
  );

  expect(component).toContainReactComponent(Index);
});

it("renders dynamic routes using [variable]", async () => {
  const component = await mount(
    <MemoryRouter initialEntries={["/blog/123"]}>
      <Routes pages={pages} />
    </MemoryRouter>
  );

  expect(component).toContainReactText("123");
});

it("renders catch all routes using [...variable]", async () => {
  const component = await mount(
    <MemoryRouter initialEntries={["/abc"]}>
      <Routes pages={pages} />
    </MemoryRouter>
  );

  expect(component).toContainReactText("abc");
});

it("normalizes routes to lowercase", async () => {
  const component = await mount(
    <MemoryRouter initialEntries={["/camelcase"]}>
      <Routes pages={pages} />
    </MemoryRouter>
  );

  expect(component).toContainReactComponent(CamelCase);
});

it("warns when a page has no default export", async () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});

  const pages = {
    "./comments.jsx": {
      Comments: () => null,
    },
  };

  const component = await mount(
    <MemoryRouter>
      <Routes pages={pages} />
    </MemoryRouter>
  );

  expect(console.warn).toHaveBeenCalledWith(
    "./comments.jsx doesn't export a default React component"
  );
});
