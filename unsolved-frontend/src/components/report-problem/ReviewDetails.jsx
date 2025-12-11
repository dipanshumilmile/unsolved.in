import React from "react";

export default function ReviewDetails({
  title,
  description,
  location,
  tags,
  severity,
}) {
  return (
    <section className="mt-6">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-5 max-w-4xl mx-auto">
        <h2 className="text-base font-semibold text-slate-900">
          Review your submission
        </h2>

        <div className="mt-4 space-y-4 text-sm">
          {/* Title */}
          <div>
            <div className="text-xs font-semibold text-slate-400">Title</div>
            <div className="mt-1 text-slate-800 whitespace-pre-line">
              {title || "—"}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="text-xs font-semibold text-slate-400">
              Description
            </div>
            <div className="mt-1 text-slate-800 whitespace-pre-line">
              {description || "—"}
            </div>
          </div>

          {/* Location (optional display) */}
          {location && (
            <div>
              <div className="text-xs font-semibold text-slate-400">
                Location
              </div>
              <div className="mt-1 text-slate-800 whitespace-pre-line">
                {location}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <div className="text-xs font-semibold text-slate-400">Tags</div>
            <div className="mt-1 flex flex-wrap gap-2">
              {tags && tags.length > 0 ? (
                tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {tag.replace("-", " ")}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 text-xs">None</span>
              )}
            </div>
          </div>

          {/* Severity */}
          <div>
            <div className="text-xs font-semibold text-slate-400">
              Severity
            </div>
            <div className="mt-1">
              {severity ? (
                <span className="inline-flex px-2 py-0.5 text-[11px] rounded-full bg-red-50 text-red-600 border border-red-200">
                  {severity}
                </span>
              ) : (
                <span className="text-slate-400 text-xs">Not set</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

