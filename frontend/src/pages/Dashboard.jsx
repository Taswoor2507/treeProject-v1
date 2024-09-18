import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequestThunk } from "@/redux/userSLice/UserSlice";
const Dashboard = () => {
  const trees = useSelector(
    (state) => state.treeReducer?.trees?.data?.totalTrees
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRequestThunk());
  }, []);
  const users = useSelector(
    (state) => state.userReducer?.users?.data?.totalUsers
  );
  console.log(users);
  // console.log(trees)
  // const user = useSelector((state) => {console.log(state)})
  return (
    <div className="flex gap-4"> 
      <div className="w-[200px] h-[200px] flex justify-center items-center flex-col bg-slate-400 rounded-full">
        <h1 className="text-3xl">Total Trees</h1>
        <p className="text-4xl">{trees ? trees : "0"}</p>
      </div>

      <div className="w-[200px] h-[200px] flex justify-center items-center flex-col bg-slate-400 rounded-full">
        <h1 className="text-3xl">Total Users</h1>
        <p className="text-4xl">{users ? users : "0"}</p>
      </div>
    </div>
  );
};

export default Dashboard;
