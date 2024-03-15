import React, { useState } from "react";
import Weather from "./api/api";
import "./App.css";
import Left from "./sections/left/Left";
import Right from "./sections/right/Right";
import { toast } from "react-hot-toast";

function App() {
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [result, setResult] = useState({});
  const [locationName, setLocationName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const locationInfo = validateLocation(location);

    if (locationInfo) {
      const { location } = locationInfo;
      const data = { location };
      if (country !== undefined && country !== "") {
        data.country = country;
      }
      setIsLoading(true);
      const res = await new Weather().sendLocation(data);
      if (res.success) {
        setResult(res);
        toast.success(res.message);
        setLocationName(location);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(res.message);
      }
    }
  };

  const validateLocation = (loc) => {
    const commaCount = (loc.match(/,/g) || []).length;
    const trimmedLocation = loc.trim();

    if (trimmedLocation === "") {
      toast.error("Location cannot be empty");
      return null;
    }

    if (commaCount <= 1 && trimmedLocation.length <= 100) {
      return { location: trimmedLocation };
    }

    toast.error("Invalid location format");
    return null;
  };

  return (
    <div className="App">
      <div className="left-container">
        <Left
          setLocation={setLocation}
          location={location}
          handleSubmit={handleSubmit}
          setCountry={setCountry}
          country={country}
          result={result}
          locationName={locationName}
          isLoading={isLoading}
        />
      </div>
      <div className="right-container">
        <Right result={result} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
