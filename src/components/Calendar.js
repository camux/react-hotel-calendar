import React, { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import date from "date-and-time";

import Room from "./Room";
import CalendarContext from "./CalendarContext";
import helper from "../helpers/BookingHelper";
import BookingPopup from "./popups/BookingPopup";
import { getShortMonthName } from "helpers/Time";
import "assets/styles/style.scss";
import "./Calendar.css";
// import Booking from "./Booking";
// import FilterCalendar from "./FilterCalendar";
const fmtDate = "YYYY-MM-DD";
const cellWith = 50;

function Calendar(props) {
  const { rooms, viewStartDate, bookingDataCallback } = props;
  const dates = fillupDates();
  let [bookingsActive, setBookingsActive] = useState(props.bookings);
  let [popup, setPopup] = useState({
    booking: null,
    show: false,
  });

  function fillupDates() {
    // Fill up dates in component state
    let dates = [];
    let day = new Date();
    if (viewStartDate != null) {
      day = new Date(viewStartDate);
    }
    dates.push(new Date(day.setDate(day.getDate())));
    for (let x = 0; x < 30; x++) {
      let newDay = new Date(day.setDate(day.getDate() + 1));
      dates.push(newDay);
    }
    return dates;
  }

  // useEffect(() => {
  //   console.log("hereeeeeee...........");
  // }, []);

  function renderHeaderTable() {
    // Render table head of calendar
    let datesHtml = dates.map((rawDate) => {
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

  function renderRooms(room) {
    return (
      <Room
        key={room.id}
        room={room}
        bookings={bookingsActive}
        dates={dates}
        cellWith={cellWith}
      ></Room>
    );
  }

  // Render tbody part of calendar table
  function renderBodyTable() {
    let body = rooms.map((room) => {
      return renderRooms(room);
    });

    return <tbody>{body}</tbody>;
  }

  function actionMoveBooking(singleBooking, room, newStartDate, newEndDate) {
    let allBookings = helper.moveBooking(
      singleBooking,
      room,
      newStartDate,
      newEndDate,
      bookingsActive
    );
    if (allBookings === false) {
      console.log("Unable to move to target date");
    } else {
      setBookingsActive(allBookings);
    }
  }

  function actionCreateBooking(singleBooking) {
    if (
      helper.canExistBooking(
        singleBooking,
        singleBooking.room_id,
        singleBooking.from_date,
        singleBooking.to_date,
        bookingsActive
      )
    ) {
      bookingsActive.push(singleBooking);
      setBookingsActive(bookingsActive);
    } else {
      console.log("Cannot create booking");
    }
  }

  function actionCanExistBooking(
    singleBooking,
    room,
    newStartDate,
    newEndDate
  ) {
    return helper.canExistBooking(
      singleBooking,
      room,
      newStartDate,
      newEndDate,
      bookingsActive
    );
  }

  function actionOpenPopup(booking) {
    // setBookingsActive()
    setPopup({
      booking: booking,
      show: true,
    });
  }

  function actionClosePopup() {
    setPopup({
      booking: null,
      show: false,
    });
  }

  // create context, to make data available to other child components
  const contextValue = {
    data: {}, // ????
    actionMoveBooking: actionMoveBooking,
    actionCanExistBooking: actionCanExistBooking,
    actionOpenPopup: actionOpenPopup,
    actionClosePopup: actionClosePopup,
    actionCreateBooking: actionCreateBooking,
  };

  // show hide booking popup
  const bookingPopup = popup.show && <BookingPopup data={popup} />;

  // check if callback is set inorder to get booking data
  if (bookingDataCallback) {
    bookingDataCallback(bookingsActive);
  }

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className="r-calendar">
        <DndProvider backend={HTML5Backend}>
          <ScrollContainer className="scroll-container" ignoreElements="td">
            <table className="table table-striped r-calendar-main-table">
              {renderHeaderTable()}
              {renderBodyTable()}
            </table>
          </ScrollContainer>
        </DndProvider>
        {bookingPopup}
      </div>
    </CalendarContext.Provider>
  );
}

export default Calendar;
