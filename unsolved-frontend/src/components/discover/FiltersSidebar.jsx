"use client";

const STATUS_OPTIONS = [
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "SOLVED", label: "Solved" },
];

export default function FiltersSidebar({ filters, onChange }) {
  const handleStatusToggle = (status) => {
    const current = filters.statuses || [];

    const next = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];

    onChange({
      ...filters,
      statuses: next,
    });
  };

  const selectedStatuses = filters.statuses || [];

  return (
    <aside className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:w-64">
      <h2 className="mb-4 text-sm font-semibold text-gray-800">Filters</h2>

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">
          Status
        </p>

        <div className="space-y-2">
          {STATUS_OPTIONS.map((status) => (
            <label
              key={status.value}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status.value)}
                onChange={() => handleStatusToggle(status.value)}
                className="h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
              />

              <span className="text-sm text-gray-700">{status.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
