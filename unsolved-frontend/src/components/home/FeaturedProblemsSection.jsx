const problems = [
  {
    id: 1,
    severity: "high",
    status: "open",
    statusColor: "bg-emerald-50 text-emerald-700",
    title: "Overflowing drain near Market Street causing flooding",
    description:
      "Recurring flooding affects 200+ households during monsoon.",
    location: "Market Street, Andheri West",
    tags: ["drainage", "waste-management", "infrastructure", "+1"],
    votes: 142,
    comments: 1,
    teams: 0,
    image:
      "https://images.unsplash.com/photo-1502301197179-65228ab57f78?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    severity: "critical",
    status: "in-progress",
    statusColor: "bg-violet-50 text-violet-700",
    title: "Lack of pedestrian crossings on busy NH-48 stretch",
    description:
      "Dangerous highway section with 3 fatalities reported last year.",
    location: "NH-48, Cyber City, Gurugram",
    tags: ["road-safety", "pedestrian", "infrastructure", "+1"],
    votes: 287,
    comments: 0,
    teams: 0,
    image:
      "https://images.unsplash.com/photo-1534448311378-1e193fb2570e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function FeaturedProblemsSection() {
  return (
    <section className="border-b border-slate-100 bg-slate-50/60">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-medium text-cyan-700">
              Featured
            </span>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-[1.4rem]">
              Problems that need your help
            </h2>
          </div>
          <button className="text-xs font-medium text-cyan-700 hover:text-cyan-800">
            View all →
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {problems.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="h-40 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        p.severity === "critical"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.severity}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${p.statusColor}`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <span>over 1 year ago</span>
                </div>

                <h3 className="text-sm font-semibold text-slate-900">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500">{p.description}</p>

                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <span>📍</span>
                  <span>{p.location}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-2 flex items-center gap-4 border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                  <span>⬆ {p.votes}</span>
                  <span>💬 {p.comments}</span>
                  <span>👥 {p.teams}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
