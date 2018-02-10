import MockDate from 'mockdate';

MockDate.set('2017-12-01');

export const card = {
  due_date: '2017-12-15T16:00:00-02:00',
  id: 'aBc_1234',
  internalId: '1',
  isVisible: true,
  title: 'Testing card',
};

export const e = { preventDefault: jest.fn() };

export const event = {
  end: new Date(new Date(card.due_date).getTime() + 30 * 60000),
  id: card.id,
  start: new Date(card.due_date),
  title: card.title,
};

export const pipefy = {
  app: { pipeId: '1' },
  locale: 'en',
  openCard: jest.fn(),
  allCards: () => Promise.resolve({ cards: [card], pageInfo: { hasNextPage: false } })
};
