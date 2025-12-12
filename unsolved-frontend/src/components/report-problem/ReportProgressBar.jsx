// // ReportProgressBar.jsx
// import React from 'react';
// import {Tags} from 'lucide-react'
// import NotepadTextIcon from '../icons/NotepadTextIcon';
// import {TriangleAlert} from 'lucide-react'
// import Tickmark from '../icons/Tickmark';

// const steps = [
//   { id: 1, label: 'Title', icon: <NotepadTextIcon className='w-4 h-4'/> },
//   { id: 2, label: 'Description', icon: <NotepadTextIcon className='w-4 h-4'/> },
//   { id: 3, label: 'Tags', icon: <Tags className='w-4 h-4' /> },
//   { id: 4, label: 'Severity', icon: <TriangleAlert className='h-4 w-4'/> },
//   { id: 5, label: 'Review', icon: <Tickmark className='h-4 w-4 text-green-500'/>  },
// ];

// export default function ReportProgressBar({ currentStep = 1 }) {
//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl px-4">
//         <ul className="relative flex flex-row items-center justify-between">
//           {steps.map((step, index) => {
//             const isCompleted = step.id < currentStep;
//             const isActive = step.id === currentStep;

//             return (
//               <li
//                 key={step.id}
//                 className="flex items-center flex-1 min-w-0 py-3"
//               >
//                 {/* badge + text */}
//                 <div className="flex items-center gap-2">
//                   <span
//                     className={[
//                       'flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium',
//                       isActive
//                         ? 'bg-blue-600 text-white'
//                         : isCompleted
//                         ? 'bg-emerald-500 text-white'
//                         : 'bg-gray-200 text-gray-700',
//                     ].join(' ')}
//                   >
//                     {step.id}
//                   </span>

//                   <span className="flex items-center gap-1 text-sm text-gray-800 whitespace-nowrap">
//                     <span>{step.icon}</span>
//                     <span>{step.label}</span>
//                   </span>
//                 </div>

//                 {/* connector */}
//                 {index < steps.length - 1 && (
//                   <div className="flex-1 flex justify-center">
//                     <div
//                       className={[
//                         'h-px w-10 bg-gray-200',
//                         isCompleted && 'bg-emerald-500',
//                       ].join(' ')}
//                     />
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }
// ReportProgressBar.jsx
import React from 'react';
import {Tags} from 'lucide-react'
import NotepadTextIcon from '../icons/NotepadTextIcon';
import {TriangleAlert} from 'lucide-react'
import Tickmark from '../icons/Tickmark';
import LocationBoxDetail from './LocationBoxDetail';
import { MapPin } from 'lucide-react';

const steps = [
  { id: 1, label: 'Title', icon: <NotepadTextIcon className='w-4 h-4'/> },
  { id: 2, label: 'Description', icon: <NotepadTextIcon className='w-4 h-4' /> },
  { id: 3, label: 'Location', icon: <MapPin className='w-4 h-4'/> },
  { id: 4, label: 'Tags', icon: <Tags className='w-4 h-4' /> },
  { id: 5, label: 'Severity', icon: <TriangleAlert className='h-4 w-4'/> },
  { id: 6, label: 'Review', icon: <Tickmark className='h-4 w-4 text-green-500'/>  },
];

export default function ReportProgressBar({ currentStep = 1 }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl px-4">
        <ul className="relative flex flex-row items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <li
                key={step.id}
                className="flex items-center flex-1 min-w-0 py-3"
              >
                {/* badge + text */}
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      'flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium',
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-200 text-gray-700',
                    ].join(' ')}
                  >
                    {step.id}
                  </span>

                  <span className="flex items-center gap-1 text-sm text-gray-800 whitespace-nowrap">
                    <span>{step.icon}</span>
                    <span>{step.label}</span>
                  </span>
                </div>

                {/* connector */}
                {index < steps.length - 1 && (
                  <div className="flex-1 flex justify-center">
                    <div
                      className={[
                        'h-px w-10 bg-gray-200',
                        isCompleted && 'bg-emerald-500',
                      ].join(' ')}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
