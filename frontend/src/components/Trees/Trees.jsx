import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tree from "./Tree";
import { treeThunk } from "@/redux/treeSlice/TreeSlice";
const Trees = () => {
  const dispatch = useDispatch();
  const [trees , setTrees] = useState([])

useEffect(()=>{
  dispatch(treeThunk())
} , [dispatch])
const Alltrees = useSelector(state=>state.treeReducer?.trees?.data?.trees)
console.log(Alltrees);

if (status === "LOADING") {
    return <h1>Loading...</h1>;
  }

  if (status === "ERROR") {
    return <h1>Error fetching trees data</h1>;
  }

  return (
   <div className="mx-auto  max-w-7xl  grid grid-cols-3 gap-4 p-6 lg:px-8">
      {Alltrees?.map((tree) => (
        <Tree key={tree._id} tree={tree} />
      ))}
    </div> 
  );
};

export default Trees;



