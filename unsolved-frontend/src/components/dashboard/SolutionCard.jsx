"use client";


export default function SolutionCard({ solution, onAccept }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{solution.studentName}</h3>

          <p className="mt-1 text-sm text-gray-500">
            {solution.createdAt
              ? new Date(solution.createdAt).toLocaleString()
              : ""}
          </p>
        </div>

        {solution.status === "ACCEPTED" ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            ✓ Accepted
          </span>
        ) : (
          <button
            onClick={() => onAccept(solution.id)}
            className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            Accept Solution
          </button>
        )}
      </div>

      {/* Summary */}

      <div className="mt-5">
        <h4 className="font-medium text-gray-800">Summary</h4>

        <p className="mt-2 whitespace-pre-wrap text-gray-600">
          {solution.summary}
        </p>
      </div>

      {/* Links */}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Repository</p>

          <a
            href={solution.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block break-all text-sm text-blue-600 hover:underline"
          >
            {solution.repoUrl}
          </a>
        </div>

        <div className="rounded-lg border p-3">
          <p className="text-sm font-medium">Demo</p>

          <a
            href={solution.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block break-all text-sm text-blue-600 hover:underline"
          >
            {solution.demoUrl}
          </a>
        </div>
      </div>
    </div>
  );
}
