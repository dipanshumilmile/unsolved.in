// UserProfileHeader.jsx
import React from "react";
import Image from "next/image";

const UserProfileHeader = () => {
  return (
    <div className="w-full bg-white rounded-xl p-5 shadow-sm">

        <div className="flex justify-between">
          {/* Profile Photo & Name + Description */}
          <div className="flex items-center gap-4">
            {/* Profile Image Placeholder */}
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            <Image
                src="/images/image.png"
                alt="Profile"
                width={64}
                height={64}
                className="w-full h-full object-cover"
            />
        </div>

            <div>
              <h2 className="text-xl font-semibold">Welcome back, Arjun!</h2>
              <p className="text-sm text-gray-600">
                Engineering student at IIT Bombay, interested in civic tech
              </p>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-md text-sm">
              + Report Problem
            </button>
            
          </div>
      </div>

    </div>
  );
};

export default UserProfileHeader;
