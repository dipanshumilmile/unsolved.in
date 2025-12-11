import React from "react";

const SEVERITY_LEVELS = [
  {
    id: "low",
    label: "Low",
    description: "Minor inconvenience, can wait",
  },
  {
    id: "medium",
    label: "Medium",
    description: "Affects daily life, should be addressed",
  },
  {
    id: "high",
    label: "High",
    description: "Urgent issue affecting many people",
  },
  {
    id: "critical",
    label: "Critical",
    description: "Emergency, immediate action needed",
  },
];

export default function SeverityBoxDetail({ severity, onChange }) {
  return (
    <section className="mt-6">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-5 max-w-4xl mx-auto">
        <h2 className="text-base font-semibold text-slate-900">
          How severe is this problem?
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          This helps prioritize issues for teams
        </p>

        <div className="mt-4 space-y-3">
          {SEVERITY_LEVELS.map((level) => {
            const isSelected = severity === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => onChange(level.id)}
                className={[
                  "w-full flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition",
                  isSelected
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 bg-white hover:bg-slate-50",
                ].join(" ")}
              >
                {/* custom radio circle */}
                <span
                  className={[
                    "mt-1 flex h-5 w-5 items-center justify-center rounded-full border",
                    isSelected
                      ? "border-teal-500"
                      : "border-slate-300",
                  ].join(" ")}
                >
                  {isSelected && (
                    <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                  )}
                </span>

                <div>
                  <div className="text-sm font-medium text-slate-900">
                    {level.label}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {level.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
