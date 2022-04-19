export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getMonthName = function (rawDate) {
  return monthNames[rawDate.getMonth()];
};

export const getShortMonthName = function (rawDate) {
  return getMonthName(rawDate).substr(0, 3);
};
