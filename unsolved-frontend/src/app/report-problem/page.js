"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import HeadingOfPage from "@/components/report-problem/HeadingOfPage";
import ReportProgressBar from "@/components/report-problem/ReportProgressBar";
import TitleBoxDetail from "@/components/report-problem/TitleBoxDetail";
import DescriptionBoxDetail from "@/components/report-problem/DescriptionBoxDetail";
import TagBoxDetail from "@/components/report-problem/TagBoxDetail";
import SeverityBoxDetail from "@/components/report-problem/SeverityBoxDetail";
import ReviewDetails from "@/components/report-problem/ReviewDetails";

export default function Page() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [severity, setSeverity] = useState("");
  const [location, setLocation] = useState("");

const handleSubmitProblem = async () => {
  // 1) Submit to your API here if needed
  // await fetch("/api/problems", { ... });

  // 2) Success toast with green tick + two lines
  toast.success(
    <div>
      <p className="text-sm font-semibold">Problem Submitted</p>
      <p className="text-xs">Will be reviewed and notified to you.</p>
    </div>,
    {
      duration: 5000,

      style: {
        maxWidth: "360px",   // controls width
        padding: "10px 10px" // controls internal spacing
      },
    }
  );

  // 3) Redirect to dashboard after a short delay
  setTimeout(() => {
    router.push("/dashboard");
  }, 800);
};


  const isLastStep = currentStep === 5;

  const handleNextClick = () => {
    if (isLastStep) {
      handleSubmitProblem();
    } else {
      setCurrentStep((s) => Math.min(5, s + 1));
    }
  };

  return (
    <div>
      <HeadingOfPage />

      <ReportProgressBar currentStep={currentStep} />

      {currentStep === 1 && (
        <TitleBoxDetail title={title} onChange={setTitle} />
      )}

      {currentStep === 2 && (
        <DescriptionBoxDetail
          description={description}
          onChange={setDescription}
        />
      )}

      {currentStep === 3 && (
        <TagBoxDetail selectedTags={tags} onChange={setTags} />
      )}

      {currentStep === 4 && (
        <SeverityBoxDetail severity={severity} onChange={setSeverity} />
      )}

      {currentStep === 5 && (
        <ReviewDetails
          title={title}
          description={description}
          location={location}
          tags={tags}
          severity={severity}
        />
      )}

      <div className="mt-6 flex justify-between max-w-4xl mx-auto">
        <button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          className="px-4 py-2 text-sm border rounded-lg disabled:opacity-40"
        >
          Back
        </button>

        <button
          onClick={handleNextClick}
          className="px-4 py-2 text-sm bg-teal-500 text-white rounded-lg disabled:opacity-40"
        >
          {isLastStep ? "Submit problem" : "Next"}
        </button>
      </div>
    </div>
  );
}
