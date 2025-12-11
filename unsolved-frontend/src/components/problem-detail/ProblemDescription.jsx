"use client";

export default function ProblemDescription({ problem }) {
  return (
    <section className="rounded-3xl border border-slate-100 p-6 shadow-sm w-[100vh] bg-gray-50">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        Description
      </h2>
      <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
        {problem.longDescription ||
          problem.description ||
          "No additional description provided."}
      </p>
    </section>
  );
}
