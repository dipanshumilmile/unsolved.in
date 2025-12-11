// src/data/problems.js
import { ALL_TAGS } from './tag.js';

const problemsData = [
  {
    id: 1,
    status: "Open",
    severity: "High",
    timeAgo: "over 1 year ago",
    title: "Overflowing drain near Market Street causing flooding",
    description:
      "Recurring flooding affects 200+ households during monsoon.",
    location: "Market Street, Andheri West",
    tags: [ALL_TAGS[3], ALL_TAGS[12], ALL_TAGS[1], ALL_TAGS[10]], // infrastructure, waste-management, education, government-services
    votes: 142,
    comments: 1,
    author: "Priya Sharma",
    authorInitials: "PS",
  },
  {
    id: 2,
    status: "Open",
    severity: "Medium",
    timeAgo: "11 months ago",
    title: "Street dogs menace in residential colony",
    description:
      "Rising street dog population causing safety concerns for children and elderly.",
    location: "Green Valley Colony, Hyderabad",
    tags: [ALL_TAGS[5], ALL_TAGS[4], ALL_TAGS[14]], // environment, public-safety, community-development
    votes: 56,
    comments: 0,
    author: "Priya Sharma",
    authorInitials: "PS",
  },
  {
    id: 3,
    status: "In Progress",
    severity: "High",
    timeAgo: "8 months ago",
    title: "Pothole-ridden main road near city hospital",
    description:
      "Large potholes slowing traffic and causing frequent two-wheeler accidents.",
    location: "Civil Hospital Road, Pune",
    tags: [ALL_TAGS[3], ALL_TAGS[4], ALL_TAGS[10]], // infrastructure, public-safety, government-services
    votes: 89,
    comments: 5,
    author: "Rohan Mehta",
    authorInitials: "RM",
  },
  {
    id: 4,
    status: "Open",
    severity: "Low",
    timeAgo: "6 months ago",
    title: "Broken street lights in park",
    description:
      "Several lights not working, making the park unsafe after sunset.",
    location: "City Central Park, Bengaluru",
    tags: [ALL_TAGS[3], ALL_TAGS[4], ALL_TAGS[10]], // infrastructure, public-safety, government-services
    votes: 24,
    comments: 2,
    author: "Ananya Rao",
    authorInitials: "AR",
  },
  {
    id: 5,
    status: "Claimed",
    severity: "Critical",
    timeAgo: "3 months ago",
    title: "Contaminated drinking water in apartment complex",
    description:
      "Residents reporting foul smell and discoloration in tap water supply.",
    location: "Sunrise Residency, Chennai",
    tags: [ALL_TAGS[0], ALL_TAGS[6], ALL_TAGS[10]], // healthcare, water-sanitation, government-services
    votes: 167,
    comments: 14,
    author: "Vikram Singh",
    authorInitials: "VS",
  },
  {
    id: 6,
    status: "Open",
    severity: "Medium",
    timeAgo: "2 months ago",
    title: "Garbage dumping on empty plot",
    description:
      "Local vendors and residents using empty plot as unofficial dumping ground.",
    location: "Sector 21, Noida",
    tags: [ALL_TAGS[12], ALL_TAGS[5], ALL_TAGS[10]], // waste-management, environment, government-services
    votes: 73,
    comments: 3,
    author: "Neha Gupta",
    authorInitials: "NG",
  },
  {
    id: 7,
    status: "Solved",
    severity: "High",
    timeAgo: "2 weeks ago",
    title: "Frequent power cuts during evening peak hours",
    description:
      "Area used to experience power outages daily between 7–9 PM, now resolved.",
    location: "Lake View Apartments, Kolkata",
    tags: [ALL_TAGS[7], ALL_TAGS[10], ALL_TAGS[3]], // energy-electricity, government-services, infrastructure
    votes: 95,
    comments: 7,
    author: "Arjun Das",
    authorInitials: "AD",
  },
];

export default problemsData;
