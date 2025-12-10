// src/data/teams.js

const teamsData = [
  {
    id: 1,
    name: "Green Guardians",
    description: "A team of environmental enthusiasts working on park restoration",
    status: "active", // "active" | "forming"
    members: [
      { id: "m1", initials: "AB" },
      { id: "m2", initials: "CD" },
    ],
  },
  {
    id: 2,
    name: "Drain Solvers",
    description: "Engineering students building a smart drainage monitoring solution",
    status: "forming",
    members: [
      { id: "m3", initials: "RM" },
    ],
  },
  {
    id: 3,
    name: "Flood Watch",
    description: "Community volunteers focused on flood prevention and awareness",
    status: "active",
    members: [
      { id: "m4", initials: "EF" },
      { id: "m5", initials: "GH" },
    ],
  },
];

export default teamsData;
