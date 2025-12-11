import React from "react";
import { ALL_TAGS } from "@/data/tag"; // adjust path if needed

export default function TagBoxDetail({ selectedTags, onChange }) {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 8) {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <section className="mt-6">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-5 max-w-4xl mx-auto">
        <h2 className="text-base font-semibold text-slate-900">
          Add relevant tags
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Select 1–8 tags that describe this problem
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {ALL_TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={[
                  "px-4 py-1.5 text-xs rounded-full border transition",
                  isSelected
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100",
                ].join(" ")}
              >
                {tag.replace("-", " ")}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-xs text-slate-500">
          Selected: {selectedTags.length}/8
        </div>
      </div>
    </section>
  );
}
