import React from 'react';
import moment from 'moment';

import CheckIn from './CheckIn.jsx';
import CheckOut from './CheckOut.jsx';

class CalendarModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      moment: moment(),
      allmonths: moment.months(),
      weekdayshort: moment.weekdaysShort(),
    };
  }

  firstDayOfMonth() {
    let date = this.state.moment;
    let firstDay = moment(date).startOf("month").format("d");
    return firstDay;
  }

  year() {
    return this.state.moment.format("Y");
  }

  currentDay() {
    return this.state.moment.format("D");
  }

  daysInMonth() {
    return this.state.moment.daysInMonth();
  }

  month() {
    return this.state.moment.format("MMMM");
  }

  setMonth(month) {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.moment);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      moment: dateObject,
    })
  }

  onPrev() {
    this.setState({
      moment: this.state.moment.subtract(1, "month"),
    })
  }

  onNext() {
    this.setState({
      moment: this.state.moment.add(1, "month"),
    })
  }

  render() {
    let weekdayshortname = this.state.weekdayshort.map(day => {
      return <th key={day}>{day}</th>
    });

    let blanks = [];
    for (var i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calender-day empty">{""}</td>)
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "today" : "";
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={e => {
              this.onDayClick(e, d);
            }}
          >
            {d}
          </span>
        </td>
      );
    }


    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <React.Fragment>
        <div className="modal-header">
          <div className="select-dates">
            Select dates
          </div>
          <div className="minimum-nights">
            Minimum Stay: {this.props.listing.minNights} nights
          </div>
            <CheckIn onSelect={this.props.onCheckIn}/>
            <CheckOut onSelect={this.props.onCheckOut}/>
        </div>
        <div className="calendar">
          <div className="calendar-navigation">
            <div onClick={e => {
                  this.onPrev();
                }}
                className="calendar-button button-prev">
            -</div>
            <div onClick={e => {
                this.onNext();
              }}
              className="calendar-button button-next">
            +</div>
          </div>
          <div className="calendar-dates">
              <div className="month-one">
                <div className="month">{this.month()}</div>
                <div className="year">{this.year()}</div>
                <table className="calendar-day">
                  <thead>
                    <tr>{weekdayshortname}</tr>
                  </thead>
                  <tbody>{daysinmonth}</tbody>
                </table>
              </div>
          </div>
          <div>
            <button>Clear Dates</button>
            <button onClick={this.props.close}>Close</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default CalendarModal;