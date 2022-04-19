import React from "react";

import Calendar from "./components/Calendar";
import helper from "./helpers/BookingHelper";
import "./App.css";

import bookingData from "./data/bookings";
import roomData from "./data/rooms";

function App() {
  let rooms = roomData;
  let bookings = bookingData;

  bookings = bookings.map((book, index) => {
    let today = new Date();
    today.setDate(
      today.getDate() + 2 * index + (Math.floor(Math.random() * 10) % 2) + 1
    );
    book.from_date = helper.formatDate(today);
    today.setDate(today.getDate() + (Math.floor(Math.random() * 10) % 5) + 1);
    book.to_date = helper.formatDate(today);
    return book;
  });

  let viewStartDate = helper.formatDate(new Date());

  let dataCallback = (data) => {
    console.log("Exported Booking Data :: ", data);
  };

  return (
    <div className="App">
      <Calendar
        rooms={rooms}
        bookings={bookings}
        bookingDataCallback={dataCallback}
        viewStartDate={viewStartDate}
      />
    </div>
  );
}

export default App;
