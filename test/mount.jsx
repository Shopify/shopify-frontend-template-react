import { vi } from "vitest";
import { createMount } from "@shopify/react-testing";
import { PolarisTestProvider } from "@shopify/polaris";
import { AppBridgeContext } from "@shopify/app-bridge-react/context";
import { GraphQLProvider } from "components/providers/GraphQLProvider";

function createMockApp() {
  const localOrigin = "https://example.com";
  return {
    dispatch: vi.fn().mockImplementation((action) => {
      return action;
    }),
    featuresAvailable: vi.fn().mockReturnValue(Promise.resolve({})),
    getState: vi.fn().mockReturnValue(Promise.resolve({})),
    subscribe: vi.fn().mockImplementation(() => vi.fn()),
    error: vi.fn().mockImplementation(() => vi.fn()),
    localOrigin: "https://example.com",
  };
}

export const mount = createMount({
  render(element) {
    return (
      <PolarisTestProvider>
        <AppBridgeContext.Provider value={createMockApp()}>
          <GraphQLProvider>{element}</GraphQLProvider>
        </AppBridgeContext.Provider>
      </PolarisTestProvider>
    );
  },
});
