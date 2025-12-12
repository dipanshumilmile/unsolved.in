"use client";

export default function CompleteSkills({ skills, setSkills }) {
  const skillList = [
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Electronics",
    "ML/AI",
    "Blockchain",
    "Civil Engineering",
    "Data Science",
    "UI/UX",
    "Public Safety",
  ];

  function toggleSkill(skill) {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-slate-800">Skills</p>

      <div className="flex flex-wrap gap-2">
        {skillList.map((skill) => (
          <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            className={`rounded-full px-3 py-1 text-[11px] font-medium ${
              skills.includes(skill)
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>
    </section>
  );
}
