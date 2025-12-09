// import React from 'react'

// export default function HeadingOfPage() {
//   return (
//     <div>HeadingOfPage</div>
//   )
// }
// import React from 'react';

import React from 'react';

export default function HeadingOfPage() {
  return (
    <header className="flex flex-col gap-3 px-4 py-4 bg-slate-50 border-b border-slate-200">
      <button
        className="self-start inline-flex items-center gap-2 px-4 py-1.5 
                   text-sm font-medium text-slate-700 
                   border border-slate-300 rounded-lg 
                   bg-white hover:bg-slate-50 
                   hover:border-slate-400
                   transition"
      >
        <span className="text-lg leading-none">←</span>
        <span>Back</span>
      </button>

      <div className="flex flex-col pl-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          Report a Problem
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Help your community by reporting issues that need attention
        </p>
      </div>
    </header>
  );
}

