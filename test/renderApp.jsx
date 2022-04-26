import { AppProvider, PolarisTestProvider } from "@shopify/polaris";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import { render } from "@testing-library/react";
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

export function renderApp(Component) {
  return render(
    <PolarisTestProvider>
      <AppBridgeContext.Provider value={createMockApp()}>
        <GraphQLProvider>{Component}</GraphQLProvider>
      </AppBridgeContext.Provider>
    </PolarisTestProvider>
  );
}
