import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Routes from "./Routes";
import { createMemoryHistory } from "history";

describe.concurrent("suite", () => {
  const pages = {
    "./pages/index.jsx": {
      default: () => <>index.jsx</>,
    },
    "./pages/blog/:id.jsx": {
      default: () => <>blog/:id.jsx</>,
    },
  };

  it("renders the index page", async () => {
    render(
      <MemoryRouter initialEntries={[""]}>
        <Routes pages={pages} />
      </MemoryRouter>
    );

    expect(screen.getByText("index.jsx")).toBeInTheDocument();
  });

  it("renders dynamic paths using :variable", async () => {
    render(
      <MemoryRouter initialEntries={["/blog/123"]}>
        <Routes pages={pages} />
      </MemoryRouter>
    );

    expect(screen.getByText("blog/:id.jsx")).toBeInTheDocument();
  });
});
