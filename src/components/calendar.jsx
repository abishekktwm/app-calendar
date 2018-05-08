// @flow
/* global PipefyApp */

import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Event from './event';
import Toolbar from './toolbar';
import {
  endDateByView,
  startDateByView,
  transformEdgesToEvents,
  getFetchMoreParams,
  mountFilters,
  updateStore,
} from '../utils';

import CARD_SEARCH_QUERY from '../graphql/queries/card_search';

import type { Card, Pipefy, FilterOptions, FilterParams } from '../models';

import '../assets/stylesheets/calendar.css';

type Props = {
  data: {
    error: { message: string },
    events: Card[],
    loading: boolean,
    refetch: (params: { filter: FilterOptions }) => void,
    fetchMore: (param: {}) => void,
    variables: {
      pagination: { page: number, perPage: number },
      sortBy: { field: string, direction: string },
    },
    cardSearch: { cards: Card[], nextPage: number },
  },
  pipefy: Pipefy,
  client: any,
  filter: { labelIds: number[], assigneeIds: number[], title: string },
};

type State = {
  currentDate: Date | string,
  currentView: string,
  filter: FilterParams,
};

class Calendar extends React.Component<Props, State> {
  state = {
    currentDate: new Date(),
    currentView: 'month',
    filter: this.props.filter,
  };

  componentWillMount() {
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  }

  componentDidMount() {
    const { currentDate: defaultDate, currentView: defaultView } = this.state;

    PipefyApp.registerListener('onFilterChanged', filters => {
      this.handleRefetchWithFilters(defaultView, defaultDate, filters);
    });

    PipefyApp.registerListener('onCardCreated', data => {
      this.addCard(defaultView, data);
    });

    PipefyApp.registerListener('onCardDeleted', data => {
      this.removeCard(defaultView, data);
    });

    PipefyApp.registerListener('onCardUpdated', data => {
      this.updateCard(defaultView, data);
    });
  }

  removeCard = (
    currentView: string,
    { internalId }: { internalId: number }
  ): void => {
    const { variables } = this.props.data;
    const { client } = this.props;

    const cachedQuery = client.readQuery({
      query: CARD_SEARCH_QUERY,
      variables,
    });

    const { cardSearch, cardSearch: { cards: cachedCards } } = cachedQuery;

    client.writeQuery({
      query: CARD_SEARCH_QUERY,
      variables,
      data: {
        ...cachedQuery,
        cardSearch: {
          ...cardSearch,
          cards: cachedCards.filter(e => e.id !== `${internalId}`),
        },
      },
    });
  };

  updateCard = (
    currentView: string,
    { internalId }: { internalId: number }
  ) => {
    const { client, data: { variables } } = this.props;
    updateStore(client, variables, internalId, cachedCards => cachedCards);
  };

  addCard = (
    currentView: string,
    { internalId }: { [string]: number }
  ) => {
    const { client, data: { variables } } = this.props;
    updateStore(client, variables, internalId, (cachedCards, responseCard) => {
      const existingCard = cachedCards.filter(card => card.id === responseCard.id);

      if (!existingCard.length) return [...cachedCards, responseCard];

      return cachedCards;
    });
  };

  handleRefetchWithFilters = (
    currentView: string,
    currentDate: string | Date,
    currentFilter: FilterParams
  ): void => {
    const { currentDate: defaultDate, currentView: defaultView } = this.state;
    const { refetch } = this.props.data;

    const filterParams = mountFilters(
      startDateByView(defaultDate, defaultView),
      endDateByView(defaultDate, defaultView),
      currentFilter
    );

    this.setState({ filter: currentFilter });

    refetch({
      filter: filterParams,
    });
  };

  handleRefetch = (currentView: string, currentDate: ?string): void => {
    const { data: { refetch } } = this.props;
    let { currentDate: storedDate } = this.state;
    const { filter } = this.state;

    this.setState({ currentView });

    if (currentDate) {
      storedDate = new Date(currentDate);
      this.setState({ currentDate: storedDate });
    }

    const filterParams = mountFilters(
      startDateByView(storedDate, currentView),
      endDateByView(storedDate, currentView),
      filter
    );

    refetch({
      filter: filterParams,
    });
  };

  render() {
    const { data: { error, loading, fetchMore, variables, cardSearch }, pipefy } = this.props;
    const { currentDate: defaultDate, currentView: defaultView } = this.state;
    const { showNotification } = pipefy;
    const { page, perPage } = variables.pagination;
    const events = !cardSearch ? [] : transformEdgesToEvents(cardSearch);

    if (!loading && error) showNotification(error.message, 'error');
    if (!loading && cardSearch && page < cardSearch.nextPage) {
      const { nextPage } = cardSearch;
      fetchMore(
        getFetchMoreParams(
          pipefy.organizationId,
          defaultDate,
          defaultView,
          pipefy.app.pipeId,
          variables.sortBy,
          {
            perPage,
            nextPage,
          }
        )
      );
    }

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
        events={events}
        onNavigate={(currentDate, currentView) => this.handleRefetch(currentView, currentDate)}
        onSelectEvent={event => pipefy.openCard(event.id)}
        onView={currentView => this.handleRefetch(currentView)}
        selectable
      />
    );
  }
}

export default Calendar;
