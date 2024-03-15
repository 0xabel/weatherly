import React from "react";
import "./Left.css";
import Input from "../../components/input/Input";
import Result from "../../components/result/Result";

function Left({
  setLocation,
  location,
  handleSubmit,
  setCountry,
  country,
  result,
  locationName,
  isLoading,
}) {
  return (
    <div className="left">
      <Input
        setLocation={setLocation}
        location={location}
        handleSubmit={handleSubmit}
        setCountry={setCountry}
        countryCode={country}
      />
      <Result
        result={result}
        location={location}
        locationName={locationName}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Left;
