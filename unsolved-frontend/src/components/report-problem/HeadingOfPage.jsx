import React from "react";

export default function HeadingOfPage() {
  return (
    <header className="px-4 py-6 bg-slate-50 border-b border-slate-200">
      {/* Centered block containing button + text */}
      <div
        className="mx-auto flex flex-col gap-4 items-start"
        style={{ maxWidth: "800px" }}
      >
        {/* Back button with border + rounded */}
        <button
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 hover:border-slate-400 transition"
        >
          <span className="text-lg leading-none">←</span>
          <span>Back</span>
        </button>

        {/* Heading + subtitle */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Report a Problem
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Help your community by reporting issues that need attention
          </p>
        </div>
      </div>
    </header>
  );
}
