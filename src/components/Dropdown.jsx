import React from "react";

function Dropdown({ title, options, func }) {
  return (
    <div className="flex items-center">
      <select
        name="format"
        id="format"
        defaultValue="0"
        onChange={func}
        className="rounded-2xl px-4 py-2 text-white 
                   bg-black/40 backdrop-blur-xl 
                   border border-white/10 shadow-lg
                   focus:ring-2 focus:ring-purple-500 focus:outline-none"
      >
        <option
          value="0"
          disabled
          className="text-gray-400 font-medium italic"
        >
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o} className="bg-black text-white">
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
