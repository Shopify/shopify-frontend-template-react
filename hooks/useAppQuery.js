import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

/**
 * A hook for querying your custom app data.
 * @desc A thin wrapper around useAuthenticatedFetch and React Query's useQuery.
 *
 * @param {Object} options - The options for your query. Accepts 3 keys:
 *
 * 1. url: The URL to query. E.g: /api/widgets/1`
 * 2. fetchInit: The init options for fetch.  See: https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 * 3. reactQueryOptions: The options for `useQuery`. See: https://tanstack.com/query/v4/docs/react/reference/useQuery
 *
 * @returns Return value of useQuery.  See: https://tanstack.com/query/v4/docs/react/reference/useQuery.
 */
export const useAppQuery = ({ url, fetchInit = {}, reactQueryOptions }) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url, fetchInit);
      return response.json();
    };
  }, [url, JSON.stringify(fetchInit)]);

  return useQuery({
    queryKey: [url],
    queryFn: fetch,
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  });
};
