"use client";
import { useRouter } from "next/navigation";
export default function CallToActionSection() {
  const router = useRouter();
  return (
    <section className="bg-gradient-to-r from-sky-500 to-cyan-500">
      <div className="mx-auto max-w-5xl px-4 py-10 text-center text-white md:px-6 md:py-12">
        <h2 className="text-2xl font-semibold tracking-tight md:text-[1.7rem]">
          Ready to make a difference?
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-sky-100 md:text-sm">
          Whether you&apos;re reporting a problem or looking to solve one, every
          action brings us closer to better communities.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-sky-700 shadow-sm hover:bg-slate-50">
            Report a Problem
          </button>
          <button 
          className=" rounded-full border border-sky-100/70 bg-sky-500/20 px-5 py-2 text-xs font-semibold text-white hover:bg-sky-500/30"
          onClick={() => router.push("/discover")}>

            Find a Problem to Solve
          </button>
        </div>
      </div>
    </section>
  );
}
