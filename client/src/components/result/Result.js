import React, { useState } from "react";
import "./Result.css";
import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/convertTemp";
import { capitalizeLetter } from "../../utils/capitalizeLetter";
import { currentDate } from "../../utils/date";
import { getTimeAndDay } from "../../utils/dayAndTime";
import { IoMdSunny } from /* Clear Sky */ "react-icons/io";
import { IoThunderstormOutline /* Thunderstorm */ } from "react-icons/io5";
import { LuCloudSun /* Few Clouds*/ } from "react-icons/lu";
import {
  BsClouds,
  BsFillCloudsFill,
  BsFillCloudyFill,
  BsFillCloudRainFill,
  BsCloudSnow,
  BsFillCloudHaze2Fill,
  BsThreeDots,
} from /* 
  Scattered Clouds
  Broken Clouds
  Overcast Clouds 
  Moderate Rain
  Moderate Snow

*/ "react-icons/bs";
import { BiCloudLightRain } from "react-icons/bi";
import { GiHeavyRain, GiSnowing } from /* 
  Heavy Rain, 
  Heavy Snow 
  */ "react-icons/gi";
import { CiCloudDrizzle /* Drizzle */ } from "react-icons/ci";
import { FaCloudShowersHeavy, FaBan /* Rain Shower*/ } from "react-icons/fa";
import { PiCloudSnowLight /* Light Snow */ } from "react-icons/pi";
import {
  TbSnowflake,
  /* Snow Shower */
} from "react-icons/tb";

const weatherConditions = [
  { id: 800, icon: IoMdSunny },
  { id: 801, icon: LuCloudSun },
  { id: 802, icon: BsClouds },
  { id: 803, icon: BsFillCloudsFill },
  { id: 804, icon: BsFillCloudyFill },
  { id: 500, icon: BiCloudLightRain },
  { id: 501, icon: BsFillCloudRainFill },
  { id: 502, icon: GiHeavyRain },
  { id: 520, icon: CiCloudDrizzle },
  { id: 521, icon: FaCloudShowersHeavy },
  { id: 600, icon: PiCloudSnowLight },
  { id: 601, icon: BsCloudSnow },
  { id: 602, icon: GiSnowing },
  { id: 620, icon: TbSnowflake },
  { id: 200, icon: IoThunderstormOutline },
  { id: 721, icon: BsFillCloudHaze2Fill },
];

function Result({ result, locationName, isLoading }) {
  const [temperatureUnit, setTemperatureUnit] = useState("C");

  const handleToggleToCelsius = () => {
    setTemperatureUnit("C");
  };

  const handleToggleToFahrenheit = () => {
    setTemperatureUnit("F");
  };

  let temperature, weatherCondition, Icon;

  if (result && result.data && result.data.main) {
    temperature =
      temperatureUnit === "C"
        ? kelvinToCelsius(result.data.main.temp)
        : kelvinToFahrenheit(result.data.main.temp);
    weatherCondition = result.data.weather?.[0]?.id
      ? weatherConditions.find(
          (obj) =>
            obj.id === (result.data.weather[0].id || result.data.weather[1].id)
        )
      : null;
    Icon = weatherCondition.icon;
  }
  return (
    <div className="result-container">
      {isLoading ? (
        <div className="loader">
          <BsThreeDots color="#64ffda" size={125} />
          <h3>Fetching data, please wait</h3>
        </div>
      ) : result && result.data && result.data.main ? (
        <div className="result">
          <div className="weather-icon">
            {" "}
            <Icon
              size={window.innerWidth >= 1600 ? 300 : 200}
              color="#64ffda"
            />
          </div>
          <div className="tab">
            <span onClick={handleToggleToCelsius}>Celsius</span>
            <span onClick={handleToggleToFahrenheit}>Fahrenheit</span>
          </div>
          <div className="result-text">
            <div>
              <h1>
                {Math.ceil(temperature)}°{temperatureUnit}
              </h1>
              <h3>{capitalizeLetter(result.data.weather[0].description)}</h3>
            </div>
            <div className="line"></div>
          </div>
          <div className="result-date">
            <h2>{currentDate()}</h2>
            <h4>{getTimeAndDay(result.data.timezone)}</h4>
            <h2 style={{ maxWidth: "auto", wordWrap: "break-word" }}>
              {locationName}
            </h2>
          </div>
        </div>
      ) : (
        <div className="loader">
          <FaBan size={200} color="#64ffda" />
          <h2>No data available</h2>
          <h3>Try entering a location</h3>
          <span>Example: Arlington, Texas</span>
        </div>
      )}
    </div>
  );
}

export default Result;
