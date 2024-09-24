import axiosInstance from "@/axiosCofig/axiosInstance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardCard() {
  const [users , setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0)
  const [trees , setTrees] = useState([])
  const [comments , setComments] = useState([])
  const fetchUsers = async()=>{
    try {
    const allUsers =await axiosInstance.get("http://localhost:4040/api/users/all" ,{} ,   { withCredentials: true }) // Include cookies in the request)
    const response = await allUsers.data;
    console.log(response)
    setUsers(response);
  } catch (error) {
    console.log(error)
  }
}

const fetchTrees =async function(){
  try {
    const allTrees = await axiosInstance.get("/trees/all" ,{} ,   { withCredentials: true }) // Include cookies in the request)
    const response = await allTrees.data;
    console.log(response)
    setTrees(response);
  } catch (error) {
    console.log(error)
  }
}

const fetchComments = async function(){
  try {
    const allComments = await axiosInstance.get("/comments/all" ,{} ,   { withCredentials: true }) // Include cookies in the request)
    const response = await allComments.data;
    console.log(response)
    setComments(response);
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  fetchUsers()
  fetchTrees()
  fetchComments()
}, [])
console.log(users)
console.log(trees)
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Users </CardTitle>
          <Laptop className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users?.data?.totalUsers}</div>
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
          <div className="text-2xl font-bold">{trees?.data?.totalTrees}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comments</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{comments?.data?.totalComments}</div>
        </CardContent>
      </Card>
    </div>
  );
}
