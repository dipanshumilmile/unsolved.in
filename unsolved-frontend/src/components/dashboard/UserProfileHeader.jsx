"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/fakeAuth";

const UserProfileHeader = () => {
  const router = useRouter();
  const [user, setUser] = useState(null); // prevent SSR mismatch
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    setIsLoaded(true);
  }, []);

  // ✨ Prevent hydration mismatch by rendering SAME HTML on server & first client paint
  if (!isLoaded) {
    return (
      <div className="w-full bg-white rounded-xl p-5 shadow-sm">
        <div className="h-16 bg-gray-100 animate-pulse rounded-xl" />
      </div>
    );
  }

  const displayName = user?.name || "Welcome";
  const subtitle =
    user?.category === "student"
      ? `${user?.profession || "B.Tech"} student`
      : user?.profession || "Professional";

  const bio =
    user?.bio ||
    "No bio yet — add a short intro to let people know who you are.";

  const photo = user?.photo || "/images/image.png";

  return (
    <div className="w-full bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between">
        {/* Profile Photo & Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={photo}
              alt="Profile"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Welcome back, {displayName}!
            </h2>
            <p className="text-sm text-gray-600">
              {subtitle} — {bio}
            </p>
          </div>
        </div>

        {/* Button */}
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
