// @flow

import moment from 'moment';

const unit = view => (view === 'agenda' ? 'day' : view);

export const endDateByView = (date: Date, view: string) => {
  const processedDate = moment(date);

  if (view === 'agenda') processedDate.add(30, 'days');

  return processedDate.endOf(unit(view)).toISOString();
};

export const startDateByView = (date: Date, view: string) =>
  moment(date)
    .startOf(unit(view))
    .toISOString();
