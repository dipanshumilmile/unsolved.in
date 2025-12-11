"use client";

export default function CompleteProgress({ progress }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-sm font-medium text-slate-700">
        Profile Completion: {progress}%
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-cyan-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
