import got from "got";

class Weather {
  async getCurrent(locationQuery) {
    try {
      const res = await got(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          locationQuery
        )}&appid=${process.env.WEATHER_API_KEY}`
      ).json();
      return res;
    } catch (err) {
      return null;
    }
  }
}

export default Weather;
