"use client";

export default function ProfileSkills({ user }) {
  // If user is NOT a student → do NOT show skills
  if (user.category !== "student") return null;

  const skills = user.skills || [];

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
      <p className="mb-2 text-xs font-semibold text-slate-700">Skills</p>

      {skills.length === 0 ? (
        <p className="text-sm text-slate-500">No skills added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-medium text-indigo-700"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
