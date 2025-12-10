// SidePanel.jsx
import React from "react";
import Notification from "../icons/Notification";
import UpwardArrow from "../icons/UpwardArrow";
const SidePanel = () => {
  return (
    <div className="flex flex-col gap-5">

      {/* Notifications Box */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Notification className="h-4 w-4" />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <span className="text-xs text-white bg-purple-500 rounded-full px-2 py-0.5">
            2 new
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-3">

          <div className="bg-blue-50 rounded-md p-2 text-sm">
            {/* Icon Placeholder */}
            Your problem got 10 new upvotes!
            <p className="text-xs text-gray-600">over 1 year ago</p>
          </div>

          <div className="bg-blue-50 rounded-md p-2 text-sm">
            {/* Icon Placeholder */}
            New comment on your problem
            <p className="text-xs text-gray-600">over 1 year ago</p>
          </div>

          <p className="text-sm text-gray-600 pl-1">Team join request</p>
        </div>

        <button className="mt-3 text-sm text-teal-600">
          View all notifications
        </button>
      </div>

      {/* Impact Box */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <UpwardArrow className="h-5 w-5"/>
          <h3 className="font-semibold mb-2">Your Impact</h3>
        </div>
        <div className="text-sm text-gray-700 flex flex-col gap-1">
          <p>Total upvotes received <b>234</b></p>
          <p>Problems solved <b>1</b></p>
          <p>Comments posted <b>12</b></p>
        </div>
      </div>

    </div>
  );
};

export default SidePanel;
