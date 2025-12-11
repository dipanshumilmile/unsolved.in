// src/components/dashboard/(components)/SolutionsSection.jsx
"use client";

import React from "react";
import Tickmark from "../icons/Tickmark";
import GithubIcon from "../icons/GithubIcon";
import { SquareArrowOutUpRight } from 'lucide-react';
import {Paperclip} from 'lucide-react'


export default function SolutionsSection({ solutions }) {
  if (!solutions || solutions.length === 0) {
    return null; // or show "You haven't submitted solutions yet"
  }

  const solution = solutions[0]; // assuming one per problem for now

  return (
    <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
      <Tickmark className="w-5 h-5 text-green-500" />
      <h2 className="text-md font-semibold text-slate-900">
        Your Solutions
      </h2>
</div>


      <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
        {/* Header: title + status */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {solution.title}
            </h3>
            <p className="text-xs text-gray-600">
              {solution.subtitle}
            </p>
          </div>

          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700">
            {solution.status}
          </span>
        </div>

        {/* Links row */}
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <button className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs shadow-sm">
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-5 h-5"/>
                <div className="flex flex-col">
                  <span className="font-medium">{solution.githubLabel}</span>
                  <span className="text-[11px] text-gray-500">
                {solution.githubUrl}
              </span>
                </div>
              </div>
            </div>
            <SquareArrowOutUpRight className="w-4 h-4" />
          </button>

          <button className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs shadow-sm">
            <div className="flex flex-col text-left">
              <div className="flex gap-2 items-center">
              <SquareArrowOutUpRight className="w-5 h-5 text-green-500"/>
              <div className="flex flex-col">
                <span className="font-medium">{solution.demoLabel}</span>
              <span className="text-[11px] text-gray-500">
                {solution.demoUrl}
              </span>
              </div>
            </div>
            </div>
            <SquareArrowOutUpRight className="w-4 h-4"/>
          </button>
        </div>

        {/* Attachments */}
        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-slate-800">
            Attachments
          </p>
          <div className="flex flex-wrap gap-2">
            {solution.attachments.map((file) => (
              <button
                key={file.name}
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm shadow-sm"
              >
                {/* file icon placeholder */}
                <Paperclip className="w-4 h-4"/>
                <span>{file.name}</span>
                <span className="text-gray-400">({file.size})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Team row */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-gray-300" />
            <div>
              <p>{solution.teamName}</p>
              <p className="text-[11px] text-gray-500">
                {solution.teamMembersCount} member
              </p>
            </div>
          </div>
          <span className="text-[11px]">{solution.submittedAt}</span>
        </div>

        {/* Review comments */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold text-slate-800">
            Review Comments
          </p>
          <div className="flex items-start gap-2 rounded-xl bg-gray-100 p-3 text-xs shadow-sm">
            <div className="h-7 w-7 rounded-full bg-gray-300" />
            <div className="flex-1">
              <p className="font-medium">{solution.reviewerName}</p>
              <p className="text-gray-600">{solution.reviewComment}</p>
            </div>
            <span className="text-[11px] text-gray-400">
              {solution.reviewTimeAgo}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
