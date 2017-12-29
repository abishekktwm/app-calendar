// @flow

import { graphql } from 'react-apollo';

import Calendar from '../components/calendar';
import { endDateByView, startDateByView, transformEdgesToEvents } from '../utils';

import ALL_CARDS_QUERY from '../graphql/queries/all_cards';

const defaultDate = new Date();
const defaultView = 'month';

const allCardsQueryOptions = {
  options: ({ pipefy }) => ({
    variables: {
      pipeId: pipefy.app.pipeId,
      endDate: endDateByView(defaultDate, defaultView),
      startDate: startDateByView(defaultDate, defaultView),
      pageSize: 100,
    },
  }),
  props: ({ data, ownProps }) => ({
    data: {
      ...data,
      events: data.loading ? [] : transformEdgesToEvents(data.allCards.edges),
    },
    ownProps,
  }),
};

export default graphql(ALL_CARDS_QUERY, allCardsQueryOptions)(Calendar);
