import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TimezoneDisplay = ({ timezone, city }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const getLocalTime = (date, timezoneOffset) => {
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * timezoneOffset);
  };

  const localTime = getLocalTime(time, timezone.offset);
  const hours = String(localTime.getHours()).padStart(2, "0");
  const minutes = String(localTime.getMinutes()).padStart(2, "0");
  const ampm = localTime.getHours() >= 12 ? "pm" : "am";

  return (
    <div className="flex justify-between items-center w-full border-y-8 py-8 my-8 border-gray-200">
      <div className="flex flex-col text-left">
        <span className="text-xl lg:text-4xl">{timezone.name}</span>
        <span className="text-lg lg:text-6xl font-medium">{city}</span>
      </div>
      <div className="flex items-end text-right">
        <span className="font-nokie text-4xl md:text-9xl leading-none">
          {hours}:{minutes}
        </span>
        <span className="text-sm md:text-9xl ml-2 mb-1">{ampm}</span>
        <div className="w-2 h-2 rounded-full bg-gray-900 ml-2 mb-2"></div>
      </div>
    </div>
  );
};

const WorldClock = () => {
  const timezones = [
    { name: "UTC-8", offset: -8 },
    { name: "UTC-7", offset: -7 },
    { name: "UTC-6", offset: -6 },
    { name: "UTC-5", offset: -5 },
  ];

  const cities = ["Los Angeles", "Denver", "Chicago", "New York"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-300 to-amber-100 flex flex-col justify-center items-center p-4 md:px-6 lg:px-8">
      <div className="w-full flex justify-between items-center">
        <svg
          width="50"
          height="50"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg" // Added xmlns for SVG
        >
          <circle cx="10" cy="10" r="8" fill="#000000" />
          <circle cx="30" cy="10" r="8" fill="#000000" />
          <circle cx="10" cy="30" r="8" fill="#000000" />
          <circle cx="30" cy="30" r="8" fill="#000000" />
        </svg>

        <div className="hidden lg:flex justify-center items-center gap-6 font-nokie tracking-wider text-3xl">
          <Link to="/">Home</Link>
          <Link to="/digital-clock">Digital Clock</Link>
        </div>
      </div>
      <div className="w-full">
        {cities.map((city, index) => (
          <TimezoneDisplay key={city} timezone={timezones[index]} city={city} />
        ))}
      </div>
    </div>
  );
};

export default WorldClock;
