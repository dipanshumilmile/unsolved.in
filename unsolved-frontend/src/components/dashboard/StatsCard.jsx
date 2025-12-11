// StatsCard.jsx
import React from "react";

const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex gap-6 items-center w-full">

      {/* Icon Container */}
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {Icon && <Icon className="w-full h-full p-2 object-contain text-gray-700" />}
      </div>

      {/* Text Info */}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">{value}</h2>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>

    </div>
  );
};

export default StatsCard;
