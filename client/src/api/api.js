import { toast } from "react-hot-toast";
class Api {
  constructor() {
    this.endpoint = "https://weather-app-401721.uc.r.appspot.com/weather";
  }
  async sendLocation(data) {
    try {
      const raw = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to indicate JSON data
        },
        body: JSON.stringify(data),
      });
      const res = await raw.json();
      return res;
    } catch (err) {
      return toast.error(
        "Either server is not running or request entity too large :: LIMIT is 1 KB"
      );
    }
  }
}

export default Api;
