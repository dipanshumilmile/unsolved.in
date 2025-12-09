const stats = [
  { label: "Problems Reported", value: "2,847" },
  { label: "Active Teams", value: "892" },
  { label: "Solutions Submitted", value: "456" },
  { label: "Community Members", value: "12K+" },
];

export default function StatsStrip() {
  return (
    <section className="mt-10 grid gap-6 border-t border-slate-100/70 pt-6 text-center text-sm text-slate-600 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-xl font-semibold text-slate-900 md:text-2xl">
            {s.value}
          </div>
          <div className="mt-1 text-xs text-slate-500">{s.label}</div>
        </div>
      ))}
    </section>
  );
}
