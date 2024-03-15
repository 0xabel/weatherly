export const currentDate = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const today = new Date();
  const day = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  // Pad the day with a leading zero if it's a single digit
  const formattedDay = day < 10 ? `0${day}` : day;

  const formattedDate = `${month}-${formattedDay}-${year}`;
  return formattedDate;
};
