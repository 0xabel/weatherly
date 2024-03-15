import React from "react";
import { kelvinToFahrenheit } from "../../utils/convertTemp";
import Card from "../../components/card/Card";
import { BsThreeDots } from "react-icons/bs";
import "./Right.css";
function Right({ result, isLoading }) {
  const rightText = [
    "Temperature",
    "Feel Like",
    "Temperature Min",
    "Temperature Max",
    "Pressure",
    "Humidity",
    "Sea Level",
    "Ground Level",
  ];

  let main;

  if (result && result.data && result.data.main) {
    main = Object.values(result.data.main).map((value, i) => {
      if (i < 4) {
        return {
          v: Math.ceil(kelvinToFahrenheit(value)),
          text: rightText[i],
          measurement: "°F",
        };
      } else {
        return { v: value, text: rightText[i], measurement: " MB" };
      }
    });
  }
  return (
    <div className="right">
      <h1>Data</h1>
      <div className={`cards ${main && main.length <= 6 ? "less-margin" : ""}`}>
        {isLoading ? (
          <div className="center right-loader">
            <BsThreeDots color="#64ffda" size={125} />
            <h3>Fetching data, please wait</h3>
          </div>
        ) : main ? (
          main.map((x, i) => <Card key={i} data={x} />)
        ) : (
          <div className="center">
            <h1>No Data</h1>
          </div>
        )}
      </div>
      <div>
        <span style={{ color: "white" }}>
          Data provided by{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "red", textDecoration: "none", cursor: "pointer" }}
          >
            OpenWeatherMap's
          </a>{" "}
          API
        </span>
      </div>
    </div>
  );
}

export default Right;
