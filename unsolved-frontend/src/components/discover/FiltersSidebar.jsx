"use client";

const STATUS_OPTIONS = ["Open", "In Progress", "Claimed", "Solved"];
const SEVERITY_OPTIONS = ["Low", "Medium", "High", "Critical"];

export default function FiltersSidebar({ filters, onChange }) {
  const handleStatusToggle = (status) => {
    const current = filters.statuses || [];
    const exists = current.includes(status);
    const next = exists
      ? current.filter((s) => s !== status)
      : [...current, status];
    onChange({ ...filters, statuses: next });
  };

  const handleSeverityToggle = (severity) => {
    const current = filters.severities || [];
    const exists = current.includes(severity);
    const next = exists
      ? current.filter((s) => s !== severity)
      : [...current, severity];
    onChange({ ...filters, severities: next });
  };

  const selectedStatuses = filters.statuses || [];
  const selectedSeverities = filters.severities || [];

  return (
    <aside className="w-64 shrink-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-700">Filters</h2>

      {/* Status */}
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
                type="checkbox"
                name="status"
                value={status}
                checked={selectedStatuses.includes(status)}
                onChange={() => handleStatusToggle(status)}
                className="h-3.5 w-3.5 text-sky-500 focus:ring-sky-500"
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      {/* Severity */}
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
                type="checkbox"
                name="severity"
                value={severity}
                checked={selectedSeverities.includes(severity)}
                onChange={() => handleSeverityToggle(severity)}
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
