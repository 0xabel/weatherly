export const getTimeAndDay = (timezone) => {
  const localTime = new Date().getTime();
  const localOffset = new Date().getTimezoneOffset() * 60000;
  const currentUtcTime = localOffset + localTime;
  const cityOffset = currentUtcTime + 1000 * timezone;
  const cityTime = new Date(cityOffset);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[cityTime.getDay()];

  const hours = cityTime.getHours();
  const minutes = cityTime.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

  return `${dayOfWeek}, ${formattedTime}`;
};
