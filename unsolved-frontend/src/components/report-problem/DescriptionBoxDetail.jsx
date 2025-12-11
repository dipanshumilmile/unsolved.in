import React from "react";

export default function DescriptionBoxDetail({
  description,
  onChange,
  minLength = 40,
  maxLength = 1000,
}) {
  const length = description?.length || 0;

  return (
    <section className="mt-6">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-5 max-w-4xl mx-auto">
        <h2 className="text-base font-semibold text-slate-900">
          Describe the problem in detail
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Include what, where, when, and how it affects the community
        </p>

        <div className="mt-4">
          <textarea
            rows={6}
            value={description}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe the problem, its impact, and any relevant details..."
            maxLength={maxLength}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60
                       px-4 py-3 text-sm text-slate-900
                       placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent
                       transition resize-y"
          />
        </div>

        <div className="mt-2 flex justify-end text-xs text-slate-400">
          {length} characters (min {minLength})
        </div>
      </div>
    </section>
  );
}
