const tabs = [
  { label: "My Submissions", value: "my-submissions" },
  { label: "My Teams", value: "my-teams" },
  { label: "Saved", value: "saved" },
];

export default function ProblemFilters({ active, onChange }) {
  return (
    <div className="mt-6 flex gap-5 border-b border-gray-200">
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`pb-2 text-sm font-medium ${
            active === value
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
