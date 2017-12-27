// @flow

import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { createHttpLink } from 'apollo-link-http';

export default (token: string) =>
  new ApolloClient({
    link: createHttpLink({
      credentials: 'include',
      headers: { Authorization: `Bearer ${token}` },
      uri: 'http://localhost:3000/queries',
    }),
    cache: new InMemoryCache(),
  });
