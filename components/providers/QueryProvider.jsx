import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Sets up the QueryClientProvider from react-query.
 * @desc See: https://tanstack.com/query/v4/docs/react/reference/QueryClientProvider
 */
export function QueryProvider({ children }) {
  const client = new QueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
