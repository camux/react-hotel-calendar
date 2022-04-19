import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import { Popup } from "semantic-ui-react";

import { ItemTypes } from "./Constant";
import CalendarContext from "./CalendarContext";
import colorsStatus from "./colorsStatus";
import "./Booking.css";
import helper from "helpers/BookingHelper";

function Booking(props) {
  // load default context
  const context = useContext(CalendarContext);
  const { book } = props;

  // enable dragging of component
  const [{ isDragging }, drag] = useDrag({
    item: { singleBooking: book },
    type: ItemTypes.BOOKING,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  console.log(" isDragging ? ...", isDragging);

  // get inner content of the booking
  const getContent = () => {
    let title;
    let guests = book.guests;
    if (guests.length > 0) {
      title = guests[0].name;
      if (guests.length > 1) {
        title = `${title} (${guests.length})`;
      }
    }
    return (
      <p className="booking-content" key={book.id}>
        {title}
      </p>
    );
  };

  // get title attribute of the booking
  const getPopupContent = () => {
    const { guest_name, accomodation, from_date, to_date, channel } = book;
    let title = (
      <div className="popup-div-content">
        <p className="popup-div-content-acco">{accomodation}</p>
        <p className="popup-div-content-guest">{guest_name}</p>
        <p className="popup-div-content-from-date">Desde : {from_date}</p>
        <p className="popup-div-content-to-date">Hasta: {to_date}</p>
        <p className="popup-div-content-channel">Canal: {channel}</p>
      </div>
    );
    return title;
  };

  // calculate number of days for booking
  const booking_days = helper.durationOfDays(book.to_date, book.from_date);

  if (booking_days > 0) {
    let style = {
      width: booking_days * 100 + "%",
      backgroundColor: colorsStatus[book.status],
    };
    return (
      <div
        onClick={(event) => {
          context.actionOpenPopup(book);
          event.stopPropagation();
          event.preventDefault();
        }}
        ref={drag}
        className="div-booking"
        style={style}
      >
        <Popup
          key={book.id}
          header={book.room}
          content={getPopupContent()}
          trigger={getContent()}
        />
      </div>
    );
  } else {
    return <></>;
  }
}

export default Booking;
