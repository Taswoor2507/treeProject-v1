import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTreesRequest } from "@/redux/treeSlice/treeSlice";
import Tree from "./Tree";
const Trees = () => {
  const dispatch = useDispatch();

  // Fetch the trees data from Redux store using useSelector
  const { trees, status } = useSelector((state) => state.treeReducer);
console.log(trees)
  useEffect(() => {
    dispatch(getTreesRequest()); // Fetch trees on component mount
  }, [dispatch]);

  const allTrees = trees?.data?.trees
  // Conditional rendering based on the status
  if (status === "LOADING") {
    return <h1>Loading...</h1>;
  }

  if (status === "ERROR") {
    return <h1>Error fetching trees data</h1>;
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {allTrees?.map((tree) => (
       <Tree key={tree._id} tree={tree}/>
))}
    </div>
  );
};

export default Trees;

