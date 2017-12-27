// @flow

import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Event from './event';
import Toolbar from './toolbar';
import type { Card, Pipefy } from '../types';

import '../../public/css/overwrite.css';

type Props = {
  data: {
    events: Array<Card>,
    loading: boolean,
    refetch: () => void,
  },
  pipefy: Pipefy,
};

const handleRefetch = (currentDate, currentView, refetch) => {
  const parsedDate = moment(currentDate);

  const startDate = moment(currentDate).startOf(currentView);
  const endDate = moment(currentDate).endOf(currentView);

  console.log(currentDate);
  console.log(currentView);
  console.log(startDate);
  console.log(endDate);
};

export default ({ data: { events, loading, refetch }, pipefy }: Props) => {
  if (loading) return null;

  BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

  debugger

  return (
    <BigCalendar
      components={{
        agenda: {
          event: props => <Event {...props} pipefy={pipefy} />,
        },
        toolbar: props => <Toolbar {...props} />,
      }}
      culture={pipefy.locale}
      events={events}
      onNavigate={(currentDate, currentView) => handleRefetch(currentDate, currentView, refetch)}
      onSelectEvent={event => pipefy.openCard(event.id)}
      onView={(currentView) => handleRefetch(null, currentView, refetch)}
      selectable
    />
  );
};
