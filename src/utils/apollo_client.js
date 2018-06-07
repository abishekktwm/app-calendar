// @flow

import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const baseURI = process.env.PIPEFY_URL || 'https://app.pipefy.com';

export default (token: string, path: string) =>
  new ApolloClient({
    link: ApolloLink.from([
      new RetryLink().split(
        operation => operation.getContext().public,
        createHttpLink({
          credentials: 'same-origin',
          headers: { Authorization: `Bearer ${token}` },
          uri: `${baseURI}/queries`,
        }),
        createHttpLink({
          credentials: 'same-origin',
          headers: { Authorization: `Bearer ${token}` },
          uri: `${baseURI}/internal_api`,
        })
      ),
    ]),
    cache: new InMemoryCache(),
  });
