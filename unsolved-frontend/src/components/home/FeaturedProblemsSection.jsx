import ProblemCard from "@/components/discover/ProblemCard";
import problemsData from "@/data/problems.js"; // full list

export default function FeaturedProblemsSection() {
  const featured = problemsData.slice(0, 3); // top 3 only

  return (
    <section className="border-b border-slate-100 bg-slate-50/60">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-medium text-cyan-700">
              Featured
            </span>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-[1.4rem]">
              Problems that need your help
            </h2>
          </div>
          
            <a href="/discover">View all →</a>
          
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3  flex flex-col justify-between
        rounded-2xl border border-gray-100 bg-white
        shadow-sm hover:shadow-md hover:-translate-y-0.5
        transition-shadow transition-transform duration-150 ">
          {featured.map((p) => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
