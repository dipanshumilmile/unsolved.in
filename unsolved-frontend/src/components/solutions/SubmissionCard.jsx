import Link from "next/link";

export default function SubmissionCard({
  solution,
  showDelete = false,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {solution.problemTitle}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Status:
            <span
              className={`ml-2 font-medium ${
                solution.status === "ACCEPTED"
                  ? "text-green-600"
                  : solution.status === "REJECTED"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {solution.status}
            </span>
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4">
        <p className="text-sm text-slate-700">
          {solution.summary}
        </p>
      </div>

      {/* Links */}
      <div className="mt-4 space-y-2 text-sm">
        {solution.repoUrl && (
          <div>
            <span className="font-medium">Repository:</span>{" "}
            <a
              href={solution.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sky-600 hover:underline"
            >
              View Repository
            </a>
          </div>
        )}

        {solution.demoUrl && (
          <div>
            <span className="font-medium">Demo:</span>{" "}
            <a
              href={solution.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sky-600 hover:underline"
            >
              View Demo
            </a>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex gap-3">

        <Link
          href={`/problems/${solution.problemId}`}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
        >
          View Problem
        </Link>

        {showDelete &&
          solution.status !== "ACCEPTED" && (
            <button
              onClick={() => onDelete(solution.id)}
              className="rounded-full bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
            >
              Delete
            </button>
          )}
      </div>
    </div>
  );
}