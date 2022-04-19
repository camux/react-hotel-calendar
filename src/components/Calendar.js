import React, { Component } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import date from "date-and-time";

import Room from "./Room";
import CalendarContext from "./CalendarContext";
import helper from "../helpers/BookingHelper";
import BookingPopup from "./popups/BookingPopup";
import { getMonthName, getShortMonthName } from "helpers/Time";
import "assets/styles/style.scss";
import "./Calendar.css";
// import Booking from "./Booking";
// import FilterCalendar from "./FilterCalendar";
const fmtDate = "YYYY-MM-DD";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: this.props.rooms,
      bookings: this.props.bookings,
      dates: [],
      cellWith: 50,
      popup: {
        show: false,
        booking: null,
      },
      filterStatus: "rooms",
      viewStartDate: this.props.viewStartDate ? this.props.viewStartDate : null,
    };
    this.actionMoveBooking = this.actionMoveBooking.bind(this);
    this.actionOpenPopup = this.actionOpenPopup.bind(this);
    this.actionClosePopup = this.actionClosePopup.bind(this);
    this.actionCanExistBooking = this.actionCanExistBooking.bind(this);
    this.actionCreateBooking = this.actionCreateBooking.bind(this);
  }

  componentDidMount() {
    this.fillupDates();
  }

  /**
   * Fill up dates in component state
   **/
  fillupDates() {
    let day = new Date();
    if (this.state.viewStartDate != null) {
      day = new Date(this.state.viewStartDate);
    }
    this.state.dates.push(new Date(day.setDate(day.getDate())));
    for (let aa = 0; aa < 30; aa++) {
      let newDay = new Date(day.setDate(day.getDate() + 1));
      this.state.dates.push(newDay);
    }

    this.setState((oldState) => {
      return this.state;
    });
  }

  // Render thead of the calendar table
  renderHeaderDate() {
    let datesHtml = this.state.dates.map((rawDate) => {
      const today = date.format(new Date(), fmtDate);
      const fdate = date.format(rawDate, fmtDate);
      let isToday = "";
      if (today === fdate) {
        isToday = "-today";
      }

      return (
        <th className={`calendar-th-date${isToday}`} key={rawDate.getTime()}>
          <span className={`calendar-head-date${isToday}`}>
            {rawDate.getDate()}
          </span>
          <div className={`calendar-head-month${isToday}`}>
            {getShortMonthName(rawDate)}
          </div>
        </th>
      );
    });

    return (
      <thead>
        <tr>
          <th>
            <div className="calendar-head-rooms">ROOMS</div>
          </th>
          {datesHtml}
        </tr>
      </thead>
    );
  }

  /**
   * Render room component
   * @param {} room
   */
  renderRooms(room) {
    return (
      <Room
        key={room.id}
        room={room}
        bookings={this.state.bookings}
        dates={this.state.dates}
        cellWith={this.state.cellWith}
      ></Room>
    );
  }

  /**
   * Render tbody part of calendar table
   */
  renderTableBody() {
    let body = this.state.rooms.map((room) => {
      return this.renderRooms(room);
    });

    return <tbody>{body}</tbody>;
  }

  /**
   * Move single booking to different date
   * @param {*} singleBooking
   * @param {*} newStartDate
   * @param {*} newEndDate
   */
  actionMoveBooking(singleBooking, room, newStartDate, newEndDate) {
    let allBookings = helper.moveBooking(
      singleBooking,
      room,
      newStartDate,
      newEndDate,
      this.state.bookings
    );
    if (allBookings === false) {
      console.log("Unable to move to target date");
    } else {
      this.setState((oldState) => {
        oldState.bookings = allBookings;
        return oldState;
      });
    }
  }

  /**
   * Create a new booking
   * @param {*} singleBooking
   */
  actionCreateBooking(singleBooking) {
    if (
      helper.canExistBooking(
        singleBooking,
        singleBooking.room_id,
        singleBooking.from_date,
        singleBooking.to_date,
        this.state.bookings
      )
    ) {
      this.setState((oldState) => {
        oldState.bookings.push(singleBooking);
        return oldState;
      });
    } else {
      console.log("Cannot create booking");
    }
  }

  /**
   * Can Move single booking to different date
   * @param {*} singleBooking
   * @param {*} newStartDate
   * @param {*} newEndDate
   */
  actionCanExistBooking(singleBooking, room, newStartDate, newEndDate) {
    return helper.canExistBooking(
      singleBooking,
      room,
      newStartDate,
      newEndDate,
      this.state.bookings
    );
  }

  /**
   * Open popup
   */
  actionOpenPopup(booking) {
    this.setState((oldState) => {
      oldState.popup.show = true;
      oldState.popup.booking = booking;
      return oldState;
    });
  }

  /**
   * Close popup
   */
  actionClosePopup() {
    this.setState((oldState) => {
      oldState.popup.show = false;
      return oldState;
    });
  }

  render() {
    let head = this.renderHeaderDate();
    let body = this.renderTableBody();

    // create context, to make data available to other child components
    const contextValue = {
      data: this.state,
      actionMoveBooking: this.actionMoveBooking,
      actionCanExistBooking: this.actionCanExistBooking,
      actionOpenPopup: this.actionOpenPopup,
      actionClosePopup: this.actionClosePopup,
      actionCreateBooking: this.actionCreateBooking,
    };

    // show hide booking popup
    let bookingPopup = this.state.popup.show ? (
      <BookingPopup data={this.state.popup}></BookingPopup>
    ) : null;

    // check if callback is set inorder to get booking data
    if (this.props.bookingDataCallback) {
      this.props.bookingDataCallback(this.state.bookings);
    }

    return (
      <CalendarContext.Provider value={contextValue}>
        <div className="r-calendar">
          <DndProvider backend={HTML5Backend}>
            <ScrollContainer className="scroll-container" ignoreElements="td">
              <table className="table table-striped r-calendar-main-table">
                {head}
                {body}
              </table>
            </ScrollContainer>
          </DndProvider>
          {bookingPopup}
        </div>
      </CalendarContext.Provider>
    );
  }
}

export default Calendar;
