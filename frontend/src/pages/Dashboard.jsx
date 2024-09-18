import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequestThunk } from "@/redux/userSLice/UserSlice";
import DashboardCard from "@/components/dashboardCards/dashboardCard";
import AllTabs from "@/components/tabs/Tabs";
const Dashboard = () => {
  // const trees = useSelector(
  //   (state) => state.treeReducer?.trees?.data?.totalTrees
  // );
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(userRequestThunk());
  // }, []);
  // const users = useSelector(
  //   (state) => state.userReducer?.users?.data?.totalUsers
  // );
  // console.log(users);
  // console.log(trees)
  // const user = useSelector((state) => {console.log(state)})
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
