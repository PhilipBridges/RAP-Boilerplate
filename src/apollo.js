import { ApolloClient } from "apollo-client";
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";

require('dotenv').config({path: './.env'})

const httpLink = new HttpLink({ uri: process.env.REACT_APP_URI })

const middlewareLink = setContext(() => ({
  headers: {
    "Authorization": localStorage.getItem("token") || null,
  }
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const { response: { headers } } = operation.getContext();
    if (headers) {
      const token = headers.get("Authorization");
      if (token) {
        localStorage.setItem("token", token);
      }
    }
    return response;
  });
});

const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
);

export default new ApolloClient({
  link: httpLinkWithMiddleware,
  cache: new InMemoryCache()
});