"use client";

export default function CompleteLocation({ city, state, setCity, setState }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-slate-800">Location</p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          placeholder="City"
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          placeholder="State"
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
    </section>
  );
}
