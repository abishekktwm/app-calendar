import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import React from 'react'
import ReactDOM from 'react-dom'

import 'react-big-calendar/lib/css/react-big-calendar.css';
BigCalendar.momentLocalizer(moment)

class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: []
    }
  }

  openCard(id) {
    window.xprops.pipefyClient.openCard(id)
  }

  componentDidMount() {
    window.xprops.pipefyClient.cards().then((cards) => {
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
    />
  }
}

ReactDOM.render(<Hello/>, document.getElementById('calendar'));
