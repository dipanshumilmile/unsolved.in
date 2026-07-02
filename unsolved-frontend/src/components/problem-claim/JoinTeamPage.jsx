<section className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-3xl">
    👥
  </div>

  <h2 className="mt-5 text-2xl font-semibold text-slate-900">
    Team Collaboration is Coming Soon
  </h2>

  <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
    We're building team collaboration so you can work together on community
    problems. Soon you'll be able to browse teams, send join requests,
    collaborate with other students, and manage projects together.
  </p>

  <div className="mx-auto mt-8 max-w-md rounded-2xl bg-slate-50 p-5 text-left">
    <h3 className="mb-3 text-sm font-semibold text-slate-800">
      Planned Features
    </h3>

    <ul className="space-y-2 text-sm text-slate-600">
      <li>✅ Browse existing teams</li>
      <li>✅ Request to join teams</li>
      <li>✅ Team discussions</li>
      <li>✅ Shared project workspace</li>
      <li>✅ Progress tracking</li>
    </ul>
  </div>

  <div className="mt-8">
    <Link
      href={`/problems/${problem.id}/claim/solo`}
      className="inline-flex items-center rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-600"
    >
      Work Solo Instead →
    </Link>
  </div>
</section>;
