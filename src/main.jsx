/* global document, PipefyApp */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './polyfills';
import Calendar from './containers/calendar';
import { getPipefyFilter } from './utils';
import apolloClient from './utils/apollo_client';

const pipefy = PipefyApp.init();

pipefy.getAuthToken().then(token => {
  const client = apolloClient(token, 'internal_api');

  PipefyApp.render(() => null);

  const renderer = filter => {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <Calendar pipefy={pipefy} filter={filter} />
      </ApolloProvider>,
      document.getElementById('calendar')
    );
  };

  getPipefyFilter(PipefyApp, pipefy, renderer);
});
