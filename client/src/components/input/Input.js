import React from "react";
import "./Input.css";
import countryCodes from "../../data/countryCode";

function Input({ setLocation, location, handleSubmit, setCountry, country }) {
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          className="location"
          type="text"
          placeholder="Enter a location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <select
          name="Country Code"
          id="country-code"
          className="country-code"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        >
          {countryCodes.map((code, index) => {
            return (
              <option key={index} value={code}>
                {code}
              </option>
            );
          })}
        </select>
        <button className="button">Get Weather</button>
      </form>
    </div>
  );
}

export default Input;
