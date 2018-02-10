// @flow

export type Card = {
  id: string,
  due_date: string,
  suid: string,
  title: string,
  isVisible: boolean,
};

type AllCardsFilter = {
  field: string,
  operator: string,
  value: string,
  AND?: AllCardsFilter,
  OR?: AllCardsFilter
}

type CardResult = {
  cards: Array<Card>,
  pageInfo: {
    hasNextPage: string,
    endCursor: string
  }
}

export type Pipefy = {
  locale: string,
  openCard: (id: string) => void,
  showNotification: (message: string, type: string) => void,
  allCards: (options: {
    filter: AllCardsFilter,
    after?: string,
  }) => Promise<CardResult>
};
