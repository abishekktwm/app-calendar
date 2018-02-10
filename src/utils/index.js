// @flow

import moment from 'moment';

import type { Card } from '../models';

const unit = view => (view === 'agenda' ? 'day' : view);

export const endDateByView = (date: Date, view: string) => {
  const processedDate = moment.utc(date);

  if (view === 'agenda') processedDate.add(30, 'days');

  return processedDate.endOf(unit(view)).toISOString();
};

export const startDateByView = (date: Date, view: string) =>
  moment
    .utc(date)
    .startOf(unit(view))
    .toISOString();

export const transformCardsToEvents = (cards: Array<Card>) =>
  cards.map(card => {
    const start = new Date(card.due_date);
    const end = new Date(start.getTime() + 30 * 60000);

    return {
      end,
      id: card.id,
      start,
      title: card.title,
    };
  });
