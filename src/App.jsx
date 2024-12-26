import React, { useState } from "react";
import "./app.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeather = async () => {
    if (!city) {
      toast.error("Please enter a city name.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        city: data.name,
        country: data.sys.country,
        condition: data.weather[0].main.toLowerCase(), // e.g., "rain", "clouds"
      });
    } catch (err) {
      setWeather(null);
      toast.error(err.message);
    }
  };

  return (
    <div className={`weather-app ${weather?.condition}`}>
      <ToastContainer />
      <h1>Weather App</h1>

      {/* Input Section */}
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />
        <button onClick={fetchWeather} className="fetch-button">
          Get Weather
        </button>
      </div>

      {/* Weather Display */}
      {weather && (
        <div className="weather-info">
          <img src={weather.icon} alt={weather.description} className="weather-icon" />
          <div className="temperature">{Math.round(weather.temp)}&deg;C</div>
          <div className="location">
            {weather.city}, {weather.country}
          </div>
          <div className="description">{weather.description}</div>
        </div>
      )}
    </div>
  );
};

export default App;
