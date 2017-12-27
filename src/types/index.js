// @flow

export type Card = {
  id: string,
  title: string,
  due_date: string,
};

export type Pipefy = {
  locale: string,
  openCard: (id: string) => void,
};
