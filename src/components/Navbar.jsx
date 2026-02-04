import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ is24h, setIs24h }) => {
  return (
    <nav className="w-full min-h-30 bg-gradient-to-b from-amber-300 to-amber-100 flex justify-between items-center p-4 md:px-6 lg:px-8">
      <svg width="50" height="50" viewBox="0 0 40 40" xmlns="http://www.w3.org">
        <circle cx="10" cy="10" r="8" fill="#000000" />
        <circle cx="30" cy="10" r="8" fill="#000000" />
        <circle cx="10" cy="30" r="8" fill="#000000" />
        <circle cx="30" cy="30" r="8" fill="#000000" />
      </svg>

      <div className="hidden lg:flex justify-center items-center gap-6 font-nokie tracking-wider">
        <Link to="/">Home</Link>
        <Link to="/digital-clock">Digital Clock</Link>
        <Link to="/city-clocks">City Clocks</Link>
      </div>

      <div className="grid grid-cols-2 rounded-2xl overflow-hidden text-3xl font-nokie bg-amber-300 p-1 shadow">
        <button
          onClick={() => setIs24h(false)}
          className={`px-4 py-3 font-bold cursor-pointer rounded-2xl ${
            !is24h ? "bg-black text-white" : "bg-amber-300 text-black"
          }`}
        >
          12h
        </button>

        <button
          onClick={() => setIs24h(true)}
          className={`px-4 py-3 font-bold cursor-pointer rounded-2xl ${
            is24h ? "bg-black text-white" : "bg-amber-300 text-black"
          }`}
        >
          24h
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
