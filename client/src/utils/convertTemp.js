export const kelvinToCelsius = (kelvin) => {
  return kelvin - 273.15;
};

export const kelvinToFahrenheit = (kelvin) => {
  const celsius = kelvinToCelsius(kelvin);
  return celsius * 1.8 + 32;
};
