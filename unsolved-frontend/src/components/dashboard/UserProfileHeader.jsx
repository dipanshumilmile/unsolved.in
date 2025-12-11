// src/components/UserProfileHeader.jsx
"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/fakeAuth";

const UserProfileHeader = () => {
  const router = useRouter();
  const user = getCurrentUser();

  const displayName = user?.name || "Welcome";
  const subtitle = user?.category === "student"
    ? `${user?.profession || "B.Tech"} student`
    : user?.profession || "Professional";
  const bio = user?.bio || "No bio yet — add a short intro to let people know who you are.";
  const photo = user?.photo || "/images/image.png";

  return (
    <div className="w-full bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between">
        {/* Profile Photo & Name + Description */}
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {/* Using <img> fallback if Image complains with data URLs */}
            <Image
              src={photo}
              alt="Profile"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Welcome back, {displayName}!</h2>
            <p className="text-sm text-gray-600">
              {subtitle} — {bio}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-md text-sm"
            onClick={() => router.push("/report-problem")}
          >
            + Report Problem
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
