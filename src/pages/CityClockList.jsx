import React from "react";

const cities = [
  { name: "Los Angeles", utc: "-8", time: "02:30 AM" },
  { name: "Denver", utc: "-7", time: "03:30 AM" },
  { name: "Chicago", utc: "-6", time: "04:30 AM" },
];

const CityClockList = () => {
  return (
    <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-between h-screen p-6">
      <div className="flex justify-end space-x-2 mb-4">
        <button className="bg-black text-white px-3 py-1 rounded">12h</button>
        <button className="bg-white text-black px-3 py-1 rounded">24h</button>
      </div>

      <div className="flex-1 space-y-4">
        {cities.map((c, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md">
            <div>
              <p className="text-xs text-gray-500">UTC{c.utc}</p>
              <p className="font-bold text-lg">{c.name}</p>
            </div>
            <div className="text-2xl font-mono">{c.time}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl overflow-hidden h-48 relative">
        <img
          src="/images/sample.jpg"
          alt="city"
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg">+</button>
      </div>
    </div>
  );
};

export default CityClockList;
