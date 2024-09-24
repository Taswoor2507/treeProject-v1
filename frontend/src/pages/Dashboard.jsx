import DashboardCard from "@/components/dashboardCards/dashboardCard";
import { useEffect, useState } from "react";
import AllTabs from "@/components/tabs/Tabs";
const Dashboard = () => {

  return (
    <div className="mx-auto flex flex-col max-w-7xl  p-6 lg:px-8 gap-10">
      <div>
        <DashboardCard />
      </div>
      <div>
        <AllTabs />
      </div>
    </div>
  );
};

export default Dashboard;
