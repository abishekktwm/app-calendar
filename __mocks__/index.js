import MockDate from 'mockdate';

MockDate.set('2017-12-01');

export const card = {
  due_date: '2017-12-15T16:00:00-02:00',
  id: '1',
  title: 'Testing card',
};

export const event = {
  end: new Date(new Date(card.due_date).getTime() + 30 * 60000),
  id: card.id,
  start: new Date(card.due_date),
  title: card.title,
};

export const e = { preventDefault: jest.fn() };

export const pipefy = {
  app: { pipeId: '1' },
  locale: 'en',
  openCard: jest.fn(),
};
