//"use client";

import * as React from "react";

//import WelcomeBanner from "@/components/dashboard/welcome-message";
//import { getServerUser } from "@/actions/auth";
//import DashboardDetails from "@/components/dashboard/dashboard-details";

export default async function Dashboard() {
  //const [searchQuery, setSearchQuery] = React.useState("");
  //const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
/*   const user = await getServerUser();
  if (!user) return null; */
  return (
    <div className="flex-1 space-y-4 p-4">
    {/*   <WelcomeBanner
        userSchool={user?.schoolName ?? ""}
        userName={user?.name}
        userRole={user?.role}
      /> */}
     {/*  <DashboardDetails /> */}
      {/* 
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      */}
    </div>
  );
}

/* function Sun({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
} */
