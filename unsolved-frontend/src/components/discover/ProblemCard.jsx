// src/components/discover/ProblemCard.jsx
"use client";

function Pill({ label, color = "gray" }) {
  const colorMap = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-emerald-50 text-emerald-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorMap[color]}`}
    >
      {label}
    </span>
  );
}

export default function ProblemCard({ problem }) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <header className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Pill label={problem.status} color="green" />
          <Pill
            label={problem.severity}
            color={
              problem.severity === "High"
                ? "red"
                : problem.severity === "Medium"
                ? "yellow"
                : "gray"
            }
          />
        </div>
        <span className="text-xs text-gray-400">{problem.timeAgo}</span>
      </header>

      <div className="mb-3">
        <h3 className="mb-1 text-sm font-semibold text-sky-700">
          {problem.title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {problem.description}
        </p>
      </div>

      <div className="mb-3 flex items-center gap-1 text-xs text-gray-500">
        <span className="text-lg">📍</span>
        <span>{problem.location}</span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <footer className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>⬆ {problem.votes}</span>
          <span>💬 {problem.comments}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px]">
            {problem.authorInitials}
          </span>
          <span>{problem.author}</span>
        </div>
      </footer>
    </article>
  );
}
