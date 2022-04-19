import React, { useContext } from "react";
import { useDrop } from "react-dnd";

import { ItemTypes } from "./Constant";
import CalendarContext from "./CalendarContext";

/**
 * small grid box which forms from combination of rows(room) and columns(date)
 * @param {*} props
 */
function RoomDate(props) {
  // load default context
  const context = useContext(CalendarContext);
  const { day, room, cellWidth, children } = props;

  // enable drop
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BOOKING,

    drop: (singleBookingDraggableItem) => {
      context.actionMoveBooking(
        singleBookingDraggableItem.singleBooking,
        room.id,
        day
      );
      // context.actionOpenPopup(singleBookingDraggableItem.singleBooking);
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  console.log(" Is over ?", isOver);

  const clickHandler = (event) => {
    context.actionOpenPopup({
      room_id: room.id,
      from_date: day,
      to_date: day,
    });
  };

  return (
    <td
      ref={drop}
      key={day.getTime()}
      style={{ width: cellWidth + "px" }}
      onClick={clickHandler}
    >
      {children}
    </td>
  );
}
export default RoomDate;
