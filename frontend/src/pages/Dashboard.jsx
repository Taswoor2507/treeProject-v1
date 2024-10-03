import DashboardCard from "@/components/dashboardCards/dashboardCard";
import { useEffect, useState } from "react";
import AllTabs from "@/components/tabs/Tabs";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
const navigate = useNavigate()
  return (
    <div className="mx-auto flex flex-col max-w-7xl  p-6 lg:px-8 gap-10">
      <div>
        <button className=" mb-3 bg-green-600  px-6 py-2 text-white" onClick={()=>{navigate("/add-tree")}}>Add new tree</button>
        <DashboardCard />
      </div>
      <div>
        <AllTabs />
      </div>
    </div>
  );
};

export default Dashboard;
