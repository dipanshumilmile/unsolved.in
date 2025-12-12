"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

export default function CompletePhoto({ photo, setPhoto }) {
  const fileRef = useRef();

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center gap-6">
      <div className="relative">
        <div className="h-20 w-20 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
          {photo ? (
            <Image src={photo} alt="Profile" width={80} height={80} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
              No Photo
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-white shadow-md ring-4 ring-white"
        >
          <Camera className="h-4 w-4" />
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        className="hidden"
        onChange={handleFile}
      />

      <p className="text-sm text-slate-600">
        Upload a profile photo (optional)
      </p>
    </section>
  );
}
