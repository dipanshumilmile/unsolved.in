// src/components/dashboard/TeamCard.jsx
"use client";

import React from "react";

function StatusPill({ status }) {
  const isActive = status === "active";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${
        isActive
          ? "bg-cyan-50 text-cyan-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function TeamCard({ team }) {
  return (
    <article className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
      {/* Left side: name, description, avatars */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-slate-900">
            {team.name}
          </h3>
          <StatusPill status={team.status} />
        </div>

        <p className="text-xs text-gray-600">
          {team.description}
        </p>

        {/* Avatars */}
        <div className="flex items-center gap-1 mt-1">
          {team.members?.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-[10px] font-medium text-gray-700 -ml-1 first:ml-0"
            >
              {/* later replace with actual profile images */}
              {m.initials}
            </div>
          ))}
        </div>
      </div>

      {/* Right side: View team button */}
      <button className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-gray-50">
        View Team
        <span>→</span>
      </button>
    </article>
  );
}
