// @flow

export type Card = {
  id: string,
  due_date: string,
  suid: string,
  title: string,
  suid: string,
};

export type Pipefy = {
  locale: string,
  openCard: (id: string) => void,
  showNotification: (message: string, type: string) => void,
  organizationId: number,
  app: { pipeId: number },
};

export type Filter = {
  filter: {
  operator: 'and' | 'or',
  queries: [
    {
      field: string,
      value: string,
      operator: string,
      type: string,
    },
    {
      field: string,
      value: string,
      operator: string,
      type: string,
    },
  ],
  }
};

export type FilterParams = {
  title: string,
  labelIds: number[],
  assigneeIds: number[],
};

export type NextType = {
  fetchMoreResult: {
    cardSearch: { count: number, nextPage: number, cards: Card[], __typename: 'string' },
  },
};

export type QueryType = { field: string, value: string, operator: string, type: string };

export type FilterOptions = {
  operator: string,
  queries: QueryType[],
};

export type Client = {
  query: ({ [string]: any }) => Promise<*>,
  readQuery: (currentQuery: {
    query: { +[string]: any },
    variables: { [string]: any },
  }) => {
    cardSearch: { [string]: any },
  },
  writeQuery: (query: { [string]: any }) => void,
};
