const data = [
  {
    id: 1,
    room_id: 2,
    room: "HAB. 204",
    guest_name: "JHON SMITH",
    from_date: "2022-04-16",
    to_date: "2022-04-18",
    accomodation: "DOBLE",
    objective: "business",
    // unit: 2,
    channel: "direct",
    status: "check_in",
    invoice_state: "posted",
    adult_count: 2,
    child_count: 0,
    guests: [
      {
        name: "MR. SMITH",
        age: 43,
      },
      {
        name: "MRS. SMITH",
        age: 45,
      },
    ],
  },
  {
    id: 2,
    room_id: 4,
    room: "HAB. 206",
    guest_name: "SARAH PARKER",
    from_date: "2022-04-19",
    to_date: "2022-04-29",
    accomodation: "DOBLE LUXURY",
    objective: "tourism",
    unit: 2,
    channel: "expedia",
    status: "none",
    invoice_state: null,
    adult_count: 2,
    child_count: 1,
    guests: [
      {
        name: "MR. PARKER",
        age: 30,
      },
      {
        name: "MRS. PARKER",
        age: 25,
      },
      {
        name: "JONAS PARKER",
        age: 5,
      },
    ],
  },
  {
    id: 3,
    room_id: 5,
    room: "HAB. 207",
    guest_name: "CHRIS MEYER",
    from_date: "2022-04-19",
    to_date: "2022-04-22",
    accomodation: "SINGLE STANDARD",
    objective: "tourism",
    unit: 2,
    channel: "booking",
    status: "check_out",
    invoice_state: "posted",
    adult_count: 1,
    child_count: 0,
    guests: [
      {
        name: "CHRIS MEYER",
        age: 35,
      },
    ],
  },
];

export default data;
