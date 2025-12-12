"use client";

export default function LocationBoxDetail({
  city,
  state,
  onCityChange,
  onStateChange,
}) {
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <label className="text-sm font-medium text-slate-700 mb-2 block">
        Problem Location
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          placeholder="City"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
        />

        <input
          placeholder="State"
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Please provide the city and state where the issue exists.
      </p>
    </div>
  );
}
