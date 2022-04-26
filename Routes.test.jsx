import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, useParams } from "react-router-dom";
import Routes from "./Routes";
import { createMemoryHistory } from "history";

const pages = {
  "./pages/index.jsx": {
    default: () => <>index.jsx</>,
  },
  "./pages/blog/[id].jsx": {
    default: () => {
      const { id } = useParams();
      return <>{`blog/${id}.jsx`}</>;
    },
  },
  "./pages/[...catchAll].jsx": {
    default: () => {
      const {catchAll} = useParams();
      return <>{`./pages/${catchAll}.jsx`}</>;
    },
  },
  "./pages/LoremIpsum.jsx": {
    default: () => <>./pages/LoremIpsum.jsx</>,
  },
};

it("renders index routes", async () => {
  render(
    <MemoryRouter initialEntries={[""]}>
      <Routes pages={pages} />
    </MemoryRouter>
  );

  expect(screen.getByText("index.jsx")).toBeInTheDocument();
});

it("renders dynamic routes using [variable]", async () => {
  render(
    <MemoryRouter initialEntries={["/blog/123"]}>
      <Routes pages={pages} />
    </MemoryRouter>
  );

  expect(screen.getByText("blog/123.jsx")).toBeInTheDocument();
});

it("renders catch all routes using [...variable]", async () => {
  render(
    <MemoryRouter initialEntries={["/abc"]}>
      <Routes pages={pages} />
    </MemoryRouter>
  );

  expect(screen.getByText("./pages/abc.jsx")).toBeInTheDocument();
});

it("normalizes routes to lowercase", async () => {
  render(
    <MemoryRouter initialEntries={["/loremipsum"]}>
      <Routes pages={pages} />
    </MemoryRouter>
  );

  expect(screen.getByText("./pages/LoremIpsum.jsx")).toBeInTheDocument();
});

it("warns when a page has no default export", async () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});

  const pages = {
    "./home.jsx": {
      Comments: () => <>comments.jsx</>,
    },
  };

  render(
    <MemoryRouter>
      <Routes pages={pages} />
    </MemoryRouter>
  );

  expect(console.warn).toHaveBeenCalledWith(
    "./home.jsx doesn't export a default React component"
  );
});
