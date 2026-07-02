"use client";

import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const UserProfileHeader = () => {
  const router = useRouter();
  const [user, setUser] = useState(null); // prevent SSR mismatch
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();

      console.log(currentUser);

      setUser(currentUser);
      console.log("Header User:", currentUser);
      setIsLoaded(true);
    }

    loadUser();
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
    user?.role === "STUDENT"
      ? `${user?.PROFESSIONAL || "B.Tech"} student`
      : user?.PROFESSIONAL || "Professional";

  const bio =
    user?.bio ||
    "No bio yet — add a short intro to let people know who you are.";


  

  return (
    <div className="w-full bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between">
        {/* Profile Photo & Name */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 border border-slate-200">
            <User className="h-8 w-8 text-slate-500" />
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
