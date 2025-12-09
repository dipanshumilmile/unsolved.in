// ProblemFilters.jsx
import React, { useState } from "react";

const tabs = ["My Submissions", "My Teams", "Saved"];

const ProblemFilters = () => {
  const [active, setActive] = useState("My Submissions");

  return (
    <div className="mt-6 flex gap-5 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`pb-2 text-sm font-medium ${
            active === tab
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProblemFilters;
