import React from "react";

import Calendar from "./components/Calendar";
import helper from "./helpers/BookingHelper";
import "./App.css";

import bookingData from "./dataBookings";
import roomData from "./dataRooms";

function App() {
  let viewStartDate = helper.formatDate(new Date());

  let dataCallback = (data) => {
    console.log("Exported Booking Data :: ", data);
  };

  return (
    <div className="App">
      <Calendar
        rooms={roomData}
        bookings={bookingData}
        bookingDataCallback={dataCallback}
        viewStartDate={viewStartDate}
      />
    </div>
  );
}

export default App;
