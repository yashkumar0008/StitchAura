import { useEffect, useState } from "react";
import axios from "axios";

interface ShowCityProps {
  value: string;
  onChange: (city: string) => void;
}

export default function ShowCity({ value, onChange }: ShowCityProps) {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCities() {

      let token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:2007/tailor/distinct-city",
        {},
        {
          headers: { 'authorization': `Bearer ${token}` }
        }
      );
      setCities(res.data);
    }
    fetchCities();
  }, []);

  return (
    <div className="w-full">
      {/* LABEL */}
      <label className="block text-sm text-slate-300 mb-2">
        Select City
      </label>

      {/* SELECT */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          bg-slate-800
          border border-slate-700
          px-4 py-3
          text-white
          focus:outline-none
          focus:border-indigo-500
          transition
        "
      >
        <option value="">-- Select City --</option>

        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}