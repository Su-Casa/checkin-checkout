import React from 'react';
import moment from 'moment';

import CheckIn from './CheckIn.jsx';
import CheckOut from './CheckOut.jsx';

class CalendarModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dateObject: moment(),
      allmonths: moment.months(),
      weekdayshort: moment.weekdaysShort(),
    };
  }

  firstDayOfMonth() {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject).startOf("month").format("d");
    return firstDay;
  }

  year() {
    return this.state.dateObject.format("Y");
  }

  currentDay() {
    return this.state.dateObject.format("D");
  }

  daysInMonth() {
    return this.state.dateObject.daysInMonth();
  }

  month() {
    return this.state.dateObject.format("MMMM");
  }

  setMonth(month) {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
    })
  }

  onPrev() {
    this.setState({
      dateObject: this.state.dateObject.subtract(1, "month"),
    })
  }

  onNext() {
    this.setState({
      dateObject: this.state.dateObject.add(1, "month"),
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
            <span
                onClick={e => {
                  this.onPrev();
                }}
                class="calendar-button button-prev"
                />
            <span
              onClick={e => {
                this.onNext();
              }}
              className="calendar-button button-next"
              />
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