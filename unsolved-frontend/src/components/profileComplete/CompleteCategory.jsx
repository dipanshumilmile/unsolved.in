"use client";

export default function CompleteCategory({ category, setCategory }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-slate-800">
        I am a...
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => setCategory("student")}
          className={`w-full rounded-xl border p-3 text-sm font-medium ${
            category === "student"
              ? "border-cyan-500 bg-cyan-50 text-cyan-700"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          🎓 Student
        </button>

        <button
          onClick={() => setCategory("professional")}
          className={`w-full rounded-xl border p-3 text-sm font-medium ${
            category === "professional"
              ? "border-cyan-500 bg-cyan-50 text-cyan-700"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          💼 Professional
        </button>
      </div>
    </section>
  );
}
