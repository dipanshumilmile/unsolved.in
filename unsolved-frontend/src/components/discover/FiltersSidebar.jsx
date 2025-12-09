// src/components/discover/FiltersSidebar.jsx
"use client";

const STATUS_OPTIONS = ["Open", "In Progress", "Claimed", "Solved"];
const SEVERITY_OPTIONS = ["Low", "Medium", "High", "Critical"];

export default function FiltersSidebar({ filters, onChange }) {
  const handleStatusChange = (status) => {
    onChange({ ...filters, status });
  };

  const handleSeverityChange = (severity) => {
    onChange({ ...filters, severity });
  };

  return (
    <aside className="w-64 shrink-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-700">Filters</h2>

      <div className="mb-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Status
        </p>
        <div className="space-y-1 text-sm">
          {STATUS_OPTIONS.map((status) => (
            <label
              key={status}
              className="flex cursor-pointer items-center gap-2 text-gray-700"
            >
              <input
                type="radio"
                name="status"
                value={status}
                checked={filters.status === status}
                onChange={() => handleStatusChange(status)}
                className="h-3.5 w-3.5 text-sky-500 focus:ring-sky-500"
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Severity
        </p>
        <div className="space-y-1 text-sm">
          {SEVERITY_OPTIONS.map((severity) => (
            <label
              key={severity}
              className="flex cursor-pointer items-center gap-2 text-gray-700"
            >
              <input
                type="radio"
                name="severity"
                value={severity}
                checked={filters.severity === severity}
                onChange={() => handleSeverityChange(severity)}
                className="h-3.5 w-3.5 text-sky-500 focus:ring-sky-500"
              />
              {severity}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
