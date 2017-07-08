import BigCalendar from 'react-big-calendar'
import moment from 'moment'

require('moment/locale/fr');

import React from 'react'
import ReactDOM from 'react-dom'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/overwrite.css';

import cn from 'classnames'

import message from './messages.jsx'

const pipefy = pipefyClient.init();

const navigate = {
  PREVIOUS:  'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE'
}

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

const openCard = (id) => { pipefy.openCard(id) }

function EventAgenda({ event }) {
  return (
    <a href="#" onClick={e => {e.preventDefault(); openCard(event.id)}}>
      {event.title}
    </a>
  )
}

class CustomToolbar extends React.Component {
  render() {
    let { messages, label } = this.props;
    messages = message(messages)

    return (
      <div className='rbc-toolbar'>
        <span className='rbc-toolbar-label'>
          { label }
        </span>

        <span className='rbc-btn-group pipe-navigate'>
          <a
            className="prev"
            href="#"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            <span className="pp-ico-bold-arrow-left" />
          </a>
          <a
            className="today"
            href="#"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </a>

          <a
            className="next"
            href="#"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            <span className="pp-ico-bold-arrow-right" />
          </a>
        </span>

        <span className='rbc-btn-group'>
        {
          this.viewNamesGroup(messages)
        }
        </span>
      </div>
    )
  }

  navigate = (action) => {
    this.props.onNavigate(action)
  }

  view = (view) => {
    this.props.onViewChange(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return (
        viewNames.map(name =>
          <button type='button' key={name}
            className={cn({'rbc-active': view === name})}
            onClick={this.view.bind(null, name)}
          >
            {messages[name]}
          </button>
        )
      )
    }
  }
}

class Calendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
    }
  }

  openCard(id) {
    pipefy.openCard(id)
  }

  componentDidMount() {
    pipefy.cards().then((cards) => {
      const events = Object.values(cards).map((card, index) => {
        const start = new Date(card.due_date)
        const end = new Date(start.getTime() + 30 * 60000)

        return {
          'title': card.title,
          'id': card.id,
          'start': start,
          'end':  end,
        }
      })

      this.setState({events})
    })

  }

  render() {
    return <BigCalendar
      selectable
      onSelectEvent={event => this.openCard(event.id)}
      events={this.state.events}
      culture={this.props.locale}
      components={{
        toolbar: CustomToolbar,
        agenda: {
          event: EventAgenda
        }
      }}
    />
  }
}

ReactDOM.render(<Calendar locale={pipefy.locale}/>, document.getElementById('calendar'));
