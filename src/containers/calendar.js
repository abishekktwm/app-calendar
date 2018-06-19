// @flow

import { compose, graphql, withApollo } from 'react-apollo';

import Calendar from '../components/calendar';
import { endDateByView, startDateByView, mountFilters } from '../utils';
import CARD_SEARCH_QUERY from '../graphql/queries/card_search';

const defaultDate = new Date();
const defaultView = 'month';

const getFilter = filter =>
  mountFilters(
    startDateByView(defaultDate, defaultView),
    endDateByView(defaultDate, defaultView),
    filter
  );

const cardSearchQueryOptions = {
  options: ({ pipefy: { organizationId, app: { pipeId } }, filter: filterWithoutDate }) => ({
    variables: {
      organizationId,
      filter: getFilter(filterWithoutDate),
      pipeIds: [pipeId],
      sortBy: { field: 'due_date', direction: 'asc' },
      pagination: { perPage: 100, page: 1 },
      partialPipeAccess: true
    },
  }),
};

export default compose(graphql(CARD_SEARCH_QUERY, cardSearchQueryOptions), withApollo)(Calendar);
