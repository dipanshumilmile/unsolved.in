const steps = [
  {
    number: 1,
    title: "Report a Problem",
    description:
      "Spotted something that needs fixing? Share it with your community in minutes.",
    icon: "💡",
    color: "from-cyan-100 to-sky-50",
  },
  {
    number: 2,
    title: "Form a Team",
    description:
      "Students and volunteers discover problems and form teams to solve them.",
    icon: "👥",
    color: "from-violet-100 to-indigo-50",
  },
  {
    number: 3,
    title: "Submit Solutions",
    description:
      "Teams build and submit solutions. Best ones get implemented with community support.",
    icon: "🚀",
    color: "from-amber-100 to-orange-50",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[20px] font-medium text-slate-600">
            How It Works
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.7rem]">
            From problem to solution in three steps
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-slate-500 md:text-sm">
            Our platform connects communities with problem-solvers. Here&apos;s how
            it works.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60 p-4 shadow-sm"
            >
              <div className="absolute -left-4 -top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-xs font-semibold text-white shadow shadow-cyan-400/60">
                {step.number}
              </div>

              <div
                className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-lg`}
              >
                {step.icon}
              </div>

              <h3 className="text-sm font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 md:text-[13px]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
