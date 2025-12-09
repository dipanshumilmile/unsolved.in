export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-xs text-slate-500 md:px-6 md:py-10">
        <div className="grid gap-8 md:grid-cols-[1.5fr,repeat(4,minmax(0,1fr))]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-sm font-bold text-white">
                U
              </div>
              <span className="text-sm font-semibold text-slate-900">
                Unsolved<span className="text-cyan-500">.in</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-xs text-slate-500">
              Connecting communities with problem solvers. Report issues, form
              teams, and build solutions together.
            </p>
          </div>

          {/* Columns */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Platform
            </h4>
            <div className="flex flex-col gap-1">
              <a href="#how-it-works" className="hover:text-slate-700">
                How it Works
              </a>
              <a href="#hero" className="hover:text-slate-700">
                Discover Problems
              </a>
              <a href="#report" className="hover:text-slate-700">
                Report a Problem
              </a>
              <a href="#" className="hover:text-slate-700">
                For Students
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Resources
            </h4>
            <div className="flex flex-col gap-1">
              <a href="#" className="hover:text-slate-700">
                Documentation
              </a>
              <a href="#" className="hover:text-slate-700">
                API
              </a>
              <a href="#" className="hover:text-slate-700">
                Community
              </a>
              <a href="#" className="hover:text-slate-700">
                Blog
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Company
            </h4>
            <div className="flex flex-col gap-1">
              <a href="#" className="hover:text-slate-700">
                About Us
              </a>
              <a href="#" className="hover:text-slate-700">
                Contact
              </a>
              <a href="#" className="hover:text-slate-700">
                Careers
              </a>
              <a href="#" className="hover:text-slate-700">
                Press
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Legal
            </h4>
            <div className="flex flex-col gap-1">
              <a href="#" className="hover:text-slate-700">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-700">
                Terms of Service
              </a>
              <a href="#" className="hover:text-slate-700">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-3 text-[11px] text-slate-400">
          © {new Date().getFullYear()} Unsolved.in · Built by the community.
        </div>
      </div>
    </footer>
  );
}
