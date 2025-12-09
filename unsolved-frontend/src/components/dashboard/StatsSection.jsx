// StatsSection.jsx
import React from "react";
import StatsCard from "./StatsCard";
import NotepadTextIcon from "@/components/icons/NotepadTextIcon";
import UsersIcon from "../icons/UsersIcon";
import BookmarkIcon from "../icons/BookmarkIcon";
import Tickmark from "../icons/Tickmark";

const StatsSection = () => {

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <StatsCard title="Problems Reported" value="3" icon={NotepadTextIcon} />
      <StatsCard title="Teams Joined" value="2" icon ={UsersIcon} />
      <StatsCard title="Saved Problems" value="8" icon={BookmarkIcon}/>
      <StatsCard title="Solutions Submitted" value="1" icon={Tickmark}/>
    </div>
  );
};

export default StatsSection;
