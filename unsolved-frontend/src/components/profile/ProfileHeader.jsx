"use client";

import { MapPin, Briefcase, UserRound } from "lucide-react";

export default function ProfileHeader({ user }) {
  

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
        updateUser({ photo: dataUrl }, user.role);
      } catch (err) {
        console.error("Failed to save photo", err);
      }
    };
    reader.readAsDataURL(file);
  };

  const professionLabel = (() => {
  if (!user) return "";

  if (user.role === "STUDENT") {
    return user.degree || "Student";
  }

  if (user.role === "PROFESSIONAL") {
    return user.profession || "Professional";
  }

  return "";
})();

  const locationLabel = (user?.city || user?.state)? `${user?.city || ""}${user?.city && user?.state ? ", " : ""}${user?.state || ""}`: "Location not set";

  return (
    <section className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-100 md:h-28 md:w-28">
            <UserRound className="h-12 w-12 text-slate-400" />
          </div>
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
                {user?.bio?.length
                  ? user.bio
                  : "No bio yet — add a short intro to let people know who you are."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => (window.location.href = "/profile/edit")} // or push via router if you build edit page
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
