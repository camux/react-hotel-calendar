import React from "react";
import date from "date-and-time";

import Booking from "./Booking";
import RoomDate from "./RoomDate";
import "./Room.css";

function Room(props) {
  const { dates, bookings, room, cellWidth } = props;

  let daysTd = dates.map((day, index) => {
    // get all booking for current day
    let bookingsDay = bookings.filter((booking) => {
      let from_date = new Date(booking.from_date);
      from_date = date.addDays(from_date, 1);
      return from_date.toDateString() === day.toDateString() &&
        booking.room_id === room.id
        ? true
        : false;
    });

    // get all booking jsx code for current day
    const bookingsTarget = bookingsDay.map((booking) => {
      return <Booking book={booking} key={booking.id} />;
    });

    return (
      <RoomDate key={index} day={day} room={room} cellWidth={cellWidth}>
        {bookingsTarget}
      </RoomDate>
    );
  });

  return (
    <tr key={room.id}>
      <td>
        <div className="room-td-div">
          <span className="room-td-span">{room.title}</span>
        </div>
      </td>
      {daysTd}
    </tr>
  );
}

export default Room;
