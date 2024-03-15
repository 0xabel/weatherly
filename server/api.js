import { config } from "dotenv";
config();
import express from "express";
import redis from "redis";
import cors from "cors";
import Weather from "./weather.js";
import Location from "./checkLocation.js";
import { limit } from "./middleware.js";

const app = express();
const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Middlewares
app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({ limit: "1kb", extended: true }));
app.use(
  cors({
    origin: "*", // replace with your origin
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(limit);

client
  .connect()
  .then(() => {
    console.log("Succesfully connected to redis instance");
  })
  .catch((err) => {
    console.log(
      `Exception caught while connecting to redis :: Error :: ${err.message}`
    );
  });

app.post("/weather", async (req, res) => {
  const { location, country } = req.body;

  if (!location) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid location" });
  }

  const trimmedLocation = location.trim();

  if (
    trimmedLocation.length > 150 ||
    (trimmedLocation.match(/,/g) || []).length > 1
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid location format" });
  }

  const locationObject = {
    location: trimmedLocation,
  };

  if (country !== undefined) {
    const trimmedCountry = country.trim();
    if (trimmedCountry) {
      locationObject.country = trimmedCountry;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid country" });
    }
  }

  if (Object.keys(locationObject).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No data provided" });
  }
  // Caching
  try {
    const cacheResults = await client.get(JSON.stringify(locationObject));

    if (cacheResults) {
      const results = JSON.parse(cacheResults);
      res.status(200).json({
        success: true,
        fromCache: true,
        message: "Succesfully retrieved current weather data",
        data: results,
      });
    } else {
      const foundLocation = await Location.checkLocation(locationObject);
      if (!foundLocation) {
        return res.status(400).json({
          success: false,
          message: "Invalid location : validated using a trusted API ",
        });
      }
      const weather = new Weather();
      const response = await weather.getCurrent(foundLocation);
      if (response) {
        await client.set(
          JSON.stringify(locationObject),
          JSON.stringify(response),
          {
            EX: 3600,
            NX: true,
          }
        );
        res.status(200).json({
          success: true,
          message: "Successfully fetched current weather data",
          data: response,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Caught an error trying to fetch data from OpenWeatherMap's API",
    });
  }
});

app.get("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Resource not found",
  });
});

const PORT = process.env.PORT || 5000;
try {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
} catch (err) {
  console.log(err.message);
}
