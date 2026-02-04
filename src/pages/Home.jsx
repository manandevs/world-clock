import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Globe, { countries } from "../components/Globe"; // Import your countries array
import { useClock } from "../hooks/useClock";

const Home = () => {
  const [is24h, setIs24h] = useState(false);
  const { time, date } = useClock(is24h);

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const [weather, setWeather] = useState({
    temp: null,
    description: "",
    wind: null,
    windDir: null,
    city: selectedCountry.name,
    lat: selectedCountry.lat,
    lon: selectedCountry.lng,
  });

  // Update weather when selectedCountry changes
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedCountry.lat}&longitude=${selectedCountry.lng}&current_weather=true&timezone=auto`,
        );
        const data = await res.json();
        const current = data.current_weather;

        setWeather({
          temp: current.temperature,
          wind: current.windspeed,
          windDir: current.winddirection,
          description: `Wind: ${current.windspeed} km/h, Dir: ${current.winddirection}°`,
          city: selectedCountry.name,
          lat: selectedCountry.lat,
          lon: selectedCountry.lng,
        });
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    };

    fetchWeather();

    // refresh every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedCountry]);

  return (
    <div className="w-full min-h-screen bg-amber-100">
      <Navbar is24h={is24h} setIs24h={setIs24h} />

      <div className="timer flex justify-between items-center px-4 md:px-6 lg:px-8">
        <p className=" font-nokie text-4xl text-center">⏱ Live Time</p>
        {/* Country Selector */}
        <div className="flex flex-col items-center space-y-2">
          <label className="font-nokie text-xl">
            Select Country for Weather
          </label>
          <select
            value={selectedCountry.name}
            onChange={(e) =>
              setSelectedCountry(
                countries.find((c) => c.name === e.target.value),
              )
            }
            className="font-nokie text-xl p-1.5 rounded-lg border border-gray-300"
          >
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full flex justify-between items-start p-4 md:px-6 lg:px-8 pt-10 leading-[0.9]">
          <p className="font-nokie text-5xl md:text-6xl lg:text-7xl max-w-3xl">
            {date}
          </p>

          <div className="font-nokie text-right">
            <p className="text-2xl">Partly Cloudy</p>
            <p className="text-4xl md:text-7xl">{time}</p>
            <span className="text-5xl">
              {weather.temp ? weather.temp : "--"}° C
            </span>
          </div>
        </div>

        <Globe />
      </div>

      {/* Weather Info */}
      <div className="wather flex flex-wrap justify-center gap-4 mt-6 pb-10">
        {/* Weather Card */}
        <div className="bg-yellow-200 p-6 rounded-2xl shadow-lg min-w-[220px] text-center font-nokie">
          <h2 className="text-xl font-bold mb-2">City</h2>
          <p className="text-2xl">{weather.city}</p>
        </div>

        {/* Weather Description */}
        <div className="bg-blue-200 p-6 rounded-2xl shadow-lg min-w-[220px] text-center font-nokie">
          <h2 className="text-xl font-bold mb-2">Weather</h2>
          <p className="text-2xl">
            {weather.description}, {weather.temp ? weather.temp : "--"}° C
          </p>
        </div>

        {/* Wind Speed */}
        <div className="bg-green-200 p-6 rounded-2xl shadow-lg min-w-[220px] text-center font-nokie">
          <h2 className="text-xl font-bold mb-2">Wind Speed</h2>
          <p className="text-2xl">{weather.wind ? weather.wind : "--"} km/h</p>
        </div>

        {/* Wind Direction */}
        <div className="bg-pink-200 p-6 rounded-2xl shadow-lg min-w-[220px] text-center font-nokie">
          <h2 className="text-xl font-bold mb-2">Wind Direction</h2>
          <p className="text-2xl">
            {weather.windDir ? weather.windDir : "--"}°
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
