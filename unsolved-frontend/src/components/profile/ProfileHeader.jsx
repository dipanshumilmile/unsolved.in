"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, MapPin, Briefcase } from "lucide-react";
import { updateUser } from "@/lib/fakeAuth";

export default function ProfileHeader({ user }) {
  const [localPhoto, setLocalPhoto] = useState(user?.photo || "");
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      // Save to local state so UI updates instantly
      setLocalPhoto(dataUrl);
      // Persist to localStorage (fake DB)
      try {
        updateUser({ photo: dataUrl });
      } catch (err) {
        console.error("Failed to save photo", err);
      }
    };
    reader.readAsDataURL(file);
  };

  const professionLabel = (() => {
    if (!user) return "";
    if (user.category === "student") return user.profession || "B.Tech";
    return user.profession || "Professional";
  })();

  const locationLabel = (user?.city || user?.state)? `${user?.city || ""}${user?.city && user?.state ? ", " : ""}${user?.state || ""}`: "Location not set";

  return (
    <section className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="relative flex items-center justify-center">
          <div className="h-24 w-24 overflow-hidden rounded-full border border-slate-200 bg-slate-100 md:h-28 md:w-28">
            {/* Next/Image supports data URLs; fallback to default if none */}
            <Image
              src={localPhoto || "/images/image.png"}
              alt={user?.name || "Profile"}
              width={112}
              height={112}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Camera upload button */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-white shadow-md ring-4 ring-white"
            title="Upload profile photo (optional)"
          >
            <Camera className="h-4 w-4" />
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>

        {/* Main info */}
        <div className="flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                {user?.name || "User Name"}
              </h1>

              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{professionLabel}</span>
                </span>

                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{locationLabel}</span>
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-sm text-slate-600">
                {user?.bio?.length ? user.bio : "No bio yet — add a short intro to let people know who you are."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.location.href = "/profile/edit" } // or push via router if you build edit page
              className="mt-2 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
