// @flow

import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Event from './event';
import Toolbar from './toolbar';
import { endDateByView, startDateByView, transformCardsToEvents } from '../utils';
import type { Card, Pipefy } from '../models';

import '../assets/stylesheets/calendar.css';

type Props = {
  pipefy: Pipefy,
};

type State = {
  cards: Array<Card>,
  currentDate: Date,
  currentView: string,
  loading: boolean,
};

class Calendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cards: [],
      currentDate: new Date(),
      currentView: 'month',
      loading: false,
    };
  }

  componentWillMount() {
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

    const defaultDate = moment.utc(new Date()).toISOString();
    const defaultView = 'month';
    this.loadCards(startDateByView(defaultDate, defaultView), endDateByView(defaultDate, defaultView));
  }

  handleRefetch(currentView: string, currentDate: ?string) {
    let { currentDate: storedDate } = this.state;

    this.setState({ currentView });

    if (currentDate) {
      storedDate = new Date(currentDate);
      this.setState({ currentDate: storedDate });
    }

    this.loadCards(startDateByView(storedDate, currentView), endDateByView(storedDate, currentView));
  }

  loadCards(startDate: string, endDate: string, after?: string, previousCards?: Array<Card>) {
    this.setState({ loading: true });

    this.props.pipefy.allCards({ filter: {
      field: "due_date",
      operator: 'gte',
      value: startDate,
      AND: { field: "due_date", operator: 'lte', value: endDate }
    }, after }).then(allCards => {
      const visibleCards = allCards.cards.filter(card => card.isVisible)
      const mergedCards = [...(previousCards || []), ...visibleCards];

      if (allCards.pageInfo.hasNextPage) return this.loadCards(startDate, endDate, allCards.pageInfo.endCursor, mergedCards);

      return this.setState({ loading: false, cards: mergedCards });
    }).catch(error => {
      this.setState({ loading: false });
      throw error;
    });
  }

  render() {
    const { pipefy } = this.props;
    const { cards, loading, currentDate: defaultDate, currentView: defaultView } = this.state;

    return (
      <BigCalendar
        components={{
          agenda: {
            event: props => <Event {...props} pipefy={pipefy} />,
          },
          toolbar: props => <Toolbar {...props} loading={loading} />,
        }}
        culture={pipefy.locale}
        defaultDate={defaultDate}
        defaultView={defaultView}
        events={transformCardsToEvents(cards)}
        onNavigate={(currentDate, currentView) => this.handleRefetch(currentView, currentDate)}
        onSelectEvent={event => pipefy.openCard(event.id)}
        onView={currentView => this.handleRefetch(currentView)}
        selectable
      />
    );
  }
}

export default Calendar;
