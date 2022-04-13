import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "./userLoggedInFetch"; 
  

export function AuthProvider({ children }) {
    const app = useAppBridge();
  
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: "/api/graphql",
        credentials: "include",
        fetch: userLoggedInFetch(app),
      }),
    });
  
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
  