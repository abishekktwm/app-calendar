// @flow
/* eslint no-underscore-dangle: ["error", { "allow": ["__typename"] }] */
/* eslint no-console: ["error", { allow: ["error"] }] */

import moment from 'moment';
import type { Card, NextType, FilterOptions, QueryType, Client } from '../models';
import CARD_QUERY from '../graphql/queries/card';
import CARD_SEARCH_QUERY from '../graphql/queries/card_search';

const unit = view => (view === 'agenda' ? 'day' : view);
export const endDateByView = (date: string | Date, view: string): string => {
  const processedDate = moment.utc(date);

  if (view === 'agenda') processedDate.add(30, 'days');

  return processedDate.endOf(unit(view)).toISOString();
};

export const startDateByView = (date: string | Date, view: string): string =>
  moment
    .utc(date)
    .startOf(unit(view))
    .toISOString();

export const transformEdgesToEvents = (data: { cards: Card[], nextPage: number }) =>
  data.cards.map(card => {
    const start = new Date(card.due_date);
    const end = new Date(start.getTime() + 30 * 60000);
    return {
      end,
      id: card.suid,
      start,
      title: card.title,
    };
  });

const filterParam = (field: string, value: string, operator: string, type: string): QueryType => ({
  field,
  value,
  operator,
  type,
});

const datesParam = (startDate: string, endDate: string): QueryType[] => [
  filterParam('due_date', startDate, 'gt', 'date'),
  filterParam('due_date', endDate, 'lt', 'date'),
];

const mountDateFilter = (
  startDate: string,
  endDate: string
): { operator: string, queries: QueryType[] } => ({
  operator: 'and',
  queries: datesParam(startDate, endDate),
});

export const getFetchMoreParams = (
  organizationId: number,
  defaultDate: string | Date,
  defaultView: string,
  pipeId: number | string,
  sortBy: { field: string, direction: string },
  pagination: { perPage: number, nextPage: number }
) => ({
  variables: {
    organizationId,
    filter: mountDateFilter(
      startDateByView(defaultDate, defaultView),
      endDateByView(defaultDate, defaultView)
    ),
    pipeIds: [pipeId],
    sortBy: { field: sortBy.field, direction: sortBy.direction },
    pagination: { perPage: pagination.perPage, page: pagination.nextPage },
  },
  updateQuery: (prev: any, next: NextType) => {
    if (!next.fetchMoreResult) return prev;
    return Object.assign({}, prev, {
      fetchMoreResult: next.fetchMoreResult,
      cardSearch: {
        nextPage: next.fetchMoreResult.cardSearch.nextPage,
        __typename: next.fetchMoreResult.cardSearch.__typename,
        count: next.fetchMoreResult.cardSearch.count,
        cards: [...prev.cardSearch.cards, ...next.fetchMoreResult.cardSearch.cards],
      },
    });
  },
});

export const mountFilters = (
  startDate: string,
  endDate: string,
  filterOptions: {
    title: string,
    labelIds: number[],
    assigneeIds: number[],
  }
): FilterOptions => {
  let queries = datesParam(startDate, endDate);

  if (!filterOptions) return { operator: 'and', queries };

  const { title, labelIds, assigneeIds } = filterOptions;

  if (title) {
    queries = [...queries, filterParam('title', title, 'contains', 'string')];
  }

  queries = [
    ...queries,
    ...labelIds.map(id => filterParam('labels.id', id.toString(), 'eq', 'number')),
    ...assigneeIds.map(id => filterParam('assignees.id', id.toString(), 'eq', 'number')),
  ];

  return { operator: 'and', queries };
};

export const updateStore = (
  client: Client,
  variables: { [string]: any },
  internalId: number,
  afterFetchCard: (
    cachedCards: Array<{ [string]: any, id: number }>,
    responseCard: { id: number }
  ) => Array<{ [string]: any, id: number }>
) => {
  client
    .query({
      query: CARD_QUERY,
      variables: {
        id: internalId,
      },
      context: { public: true },
    })
    .then(({ data: { card: responseCard } }) => {
      const cachedQuery = client.readQuery({ query: CARD_SEARCH_QUERY, variables });

      const { cardSearch, cardSearch: { cards: cachedCards } } = cachedQuery;

      client.writeQuery({
        query: CARD_SEARCH_QUERY,
        variables,
        data: {
          ...cachedQuery,
          cardSearch: {
            ...cardSearch,
            cards: afterFetchCard(cachedCards, responseCard),
          },
        },
      });
    })
    .catch(console.error);
};

export const getPipefyFilter = (
  pipefyApp: any,
  pipefy: any,
  callback: (filter: FilterOptions) => void
): void => {
  pipefyApp
    .pipeFilter(pipefy.app.pipeId)
    .then(filter => callback(filter))
    .catch(console.error);
};
