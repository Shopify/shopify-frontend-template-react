import { AppRouterProvider, PolarisProvider, QueryProvider } from "./components";

export default function App() {
  return (
    <PolarisProvider>
      <QueryProvider>
        <AppRouterProvider />
      </QueryProvider>
    </PolarisProvider>
  );
}
