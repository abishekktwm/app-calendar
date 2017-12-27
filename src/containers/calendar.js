// @flow

import { graphql } from 'react-apollo';

import Calendar from '../components/calendar';
import { endDateByView, startDateByView } from '../utils';

import ALL_CARDS_QUERY from '../graphql/queries/all_cards';

const defaultDate = new Date();
const defaultView = 'month';

const transformAllCardsToEvents = edges =>
  edges.map(edge => {
    const start = new Date(edge.node.due_date);
    const end = new Date(start.getTime() + 30 * 60000);

    return {
      end,
      id: edge.node.id,
      start,
      title: edge.node.title,
    };
  });

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
      events: data.loading ? [] : transformAllCardsToEvents(data.allCards.edges),
    },
    ownProps,
  }),
};

export default graphql(ALL_CARDS_QUERY, allCardsQueryOptions)(Calendar);
