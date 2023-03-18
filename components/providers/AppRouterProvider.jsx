import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppBridgeProvider } from "../../components";
import ErrorBoundary from "../../components/ErrorBoundary";

/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .jsx file in `/pages` with a default export.
 *
 * Some examples:
 * * `/pages/index.jsx` matches `/`
 * * `/pages/blog/[id].jsx` matches `/blog/123`
 * * `/pages/[...catchAll].jsx` matches any URL not explicitly matched
 *
 * @return {RouterProvider} `<RouterProvider/>` from React Router, with a `<Route/>` for each file in `pages`
 */

export function AppRouterProvider () {
  // Any .tsx or .jsx files in /pages will become a route
  // See https://vitejs.dev/guide/features.html#glob-import
  const pages = import.meta.globEager('../../pages/**/!(*.test.[jt]sx)*.([jt]sx)');
  const routes = useRoutes(pages);
  const NotFound = routes.find(({ path }) => path === '/notFound').element;

  routes.push({path: '*', element: NotFound, errorElement: <ErrorBoundary />});

  const router = createBrowserRouter([{
    element: <AppBridgeProvider />,
    children: routes
  }]);

  return <RouterProvider router={router} />;
}

function useRoutes(pages) {
  const routes = Object.keys(pages)
    .map((key) => {
      let path = key
        .replace("../../pages", "")
        .replace(/\.(t|j)sx?$/, "")
        /**
         * Replace /index with /
         */
        .replace(/\/index$/i, "/")
        /**
         * Only lowercase the first letter. This allows the developer to use camelCase
         * dynamic paths while ensuring their standard routes are normalized to lowercase.
         */
        .replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase())
        /**
         * Convert /[handle].jsx and /[...handle].jsx to /:handle.jsx for react-router-dom
         */
        .replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

      if (path.endsWith("/") && path !== "/") {
        path = path.substring(0, path.length - 1);
      }

      if (!pages[key].default) {
        console.warn(`${key} doesn't export a default React component`);
      }

      const Component = pages[key].default;

      return {
        path,
        element: <Component />,
        errorElement: <ErrorBoundary />
      };
    })
    .filter((route) => route.element);

  return routes;
}