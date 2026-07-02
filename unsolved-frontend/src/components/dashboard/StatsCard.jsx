import React from "react";
import Link from "next/link";

const StatsCard = ({ title, value, icon: Icon, href }) => {
  const content = (
    <div
      className={`bg-white rounded-xl shadow-sm p-4 flex gap-6 items-center w-full transition-all duration-200 ${
        href
          ? "cursor-pointer hover:shadow-md hover:-translate-y-1"
          : ""
      }`}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {Icon && (
          <Icon className="w-full h-full p-2 object-contain text-gray-700" />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">{value}</h2>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export default StatsCard;