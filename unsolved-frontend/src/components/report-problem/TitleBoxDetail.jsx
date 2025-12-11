import React from "react";

export default function TitleBoxDetail({ title, onChange, maxLength = 150 }) {
  const remaining = maxLength - (title?.length || 0);

  return (
    <section className="mt-6">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-5 max-w-4xl mx-auto">
        <h2 className="text-base font-semibold text-slate-900">
          Give your problem a clear title
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Be specific and descriptive. Example: &quot;Broken streetlight at MG Road junction&quot;
        </p>

        <div className="mt-4 flex justify-center">
          <input
            type="text"
            value={title}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter a descriptive title..."
            maxLength={maxLength}
            className="w-full max-w-3xl rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
          />
        </div>

        <div className="mt-2 flex justify-end">
          <span className="text-xs text-slate-400">
            {title?.length || 0}/{maxLength}
          </span>
        </div>
      </div>
    </section>
  );
}

