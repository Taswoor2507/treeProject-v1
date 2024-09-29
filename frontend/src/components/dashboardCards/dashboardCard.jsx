import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { commentsThunk } from "@/redux/commentSlice/CommentSlice";
import { Laptop, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { treeThunk } from "@/redux/treeSlice/TreeSlice";
import { userThunk } from "@/redux/userSlice/UserSlice";

export default function DashboardCard() {
  const [comments, setComment] = useState([]);
  const [trees, setTrees] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  // Fetch comments and trees when the component mounts
  useEffect(() => {
    dispatch(commentsThunk());
    dispatch(treeThunk());
    dispatch(userThunk())
  }, [dispatch]);

  // Get the comments and trees data from the Redux store
  const data = useSelector((state) => state.commentReducer?.comments?.data?.comments);
  const treesData = useSelector((state) => state.treeReducer?.trees?.data?.trees || []); // Correct access to trees data
  const AllusersData  = useSelector((state)=>state.userReducer?.users?.data); // Correct access to users data
  const usersData = AllusersData?.users || [];
  console.log("me" , usersData)
  // Update the local `comments` state when the Redux comments data changes
  useEffect(() => {
    if (data) {
      setComment(data);
    }
  }, [data]);

  // Update the local `trees` state when the Redux trees data changes
  useEffect(() => {
    if(treesData){
      setTrees(treesData); // Directly updating state with treesData
    }
  }, [treesData]);

  useEffect(()=>{
    if(usersData){
      setUsers(usersData)
    }
  }, [usersData])

  // console.log("Comments:", comments);
  console.log("Trees:", trees);
  // console.log("users " , users?.data?.users?.length);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Users</CardTitle>
          <Laptop className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users?.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Trees</CardTitle>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{trees.length}</div> {/* Display trees count */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comments</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{comments.length}</div> {/* Display comments count */}
        </CardContent>
      </Card>
    </div>
  );
}
